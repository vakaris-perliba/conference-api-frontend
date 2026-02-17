using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conference.API.Data;
using Conference.Model;

namespace Conference.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AttendeesController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly ILogger<AttendeesController> _logger;

    public AttendeesController(ApplicationDbContext db, ILogger<AttendeesController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Get attendee by username
    /// </summary>
    /// <param name="username">Attendee username</param>
    /// <returns>Attendee details with registered sessions</returns>
    [HttpGet("{username}")]
    [ProducesResponseType(typeof(AttendeeResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AttendeeResponse>> GetAttendee(string username)
    {
        var attendee = await _db.Attendees.AsNoTracking()
            .Include(a => a.SessionsAttendees)
            .ThenInclude(sa => sa.Session)
            .SingleOrDefaultAsync(a => a.UserName == username);

        if (attendee is null)
        {
            return NotFound();
        }

        return Ok(attendee.MapAttendeeResponse());
    }

    /// <summary>
    /// Get sessions for an attendee
    /// </summary>
    /// <param name="username">Attendee username</param>
    /// <returns>List of sessions the attendee is registered for</returns>
    [HttpGet("{username}/sessions")]
    [ProducesResponseType(typeof(List<SessionResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<SessionResponse>>> GetAttendeeSessions(string username)
    {
        var sessions = await _db.Sessions.AsNoTracking()
            .Include(s => s.Track)
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Speaker)
            .Where(s => s.SessionAttendees.Any(sa => sa.Attendee.UserName == username))
            .Select(m => m.MapSessionResponse())
            .ToListAsync();

        return Ok(sessions);
    }

    /// <summary>
    /// Create a new attendee
    /// </summary>
    /// <param name="input">Attendee data</param>
    /// <returns>Created attendee</returns>
    [HttpPost]
    [ProducesResponseType(typeof(AttendeeResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AttendeeResponse>> CreateAttendee([FromBody] Conference.Model.Attendee input)
    {
        var existingAttendee = await _db.Attendees
            .Where(a => a.UserName == input.UserName)
            .FirstOrDefaultAsync();

        if (existingAttendee is not null)
        {
            return Conflict(new { message = "Attendee with this username already exists" });
        }

        var attendee = new Data.Attendee
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            UserName = input.UserName,
            EmailAddress = input.EmailAddress
        };

        _db.Attendees.Add(attendee);
        await _db.SaveChangesAsync();

        var result = attendee.MapAttendeeResponse();
        return CreatedAtAction(nameof(GetAttendee), new { username = attendee.UserName }, result);
    }

    /// <summary>
    /// Add attendee to a session
    /// </summary>
    /// <param name="username">Attendee username</param>
    /// <param name="sessionId">Session ID</param>
    /// <returns>Updated attendee</returns>
    [HttpPost("{username}/sessions/{sessionId:int}")]
    [ProducesResponseType(typeof(AttendeeResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AttendeeResponse>> AddAttendeeToSession(string username, int sessionId)
    {
        var attendee = await _db.Attendees
            .Include(a => a.SessionsAttendees)
            .ThenInclude(sa => sa.Session)
            .SingleOrDefaultAsync(a => a.UserName == username);

        if (attendee is null)
        {
            return NotFound(new { message = "Attendee not found", attendee = username });
        }

        var session = await _db.Sessions.FindAsync(sessionId);

        if (session is null)
        {
            return NotFound(new { message = "Session not found", session = sessionId });
        }

        // Check if already registered
        if (attendee.SessionsAttendees.Any(sa => sa.SessionId == sessionId))
        {
            return Conflict(new { message = "Attendee is already registered for this session" });
        }

        attendee.SessionsAttendees.Add(new SessionAttendee
        {
            AttendeeId = attendee.Id,
            SessionId = sessionId
        });

        await _db.SaveChangesAsync();

        var result = attendee.MapAttendeeResponse();
        return CreatedAtAction(nameof(GetAttendee), new { username = result.UserName }, result);
    }

    /// <summary>
    /// Remove attendee from a session
    /// </summary>
    /// <param name="username">Attendee username</param>
    /// <param name="sessionId">Session ID</param>
    /// <returns>No content</returns>
    [HttpDelete("{username}/sessions/{sessionId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveAttendeeFromSession(string username, int sessionId)
    {
        var attendee = await _db.Attendees
            .Include(a => a.SessionsAttendees)
            .SingleOrDefaultAsync(a => a.UserName == username);

        if (attendee is null)
        {
            return NotFound(new { message = "Attendee not found" });
        }

        var session = await _db.Sessions.FindAsync(sessionId);

        if (session is null)
        {
            return NotFound(new { message = "Session not found" });
        }

        var sessionAttendee = attendee.SessionsAttendees
            .FirstOrDefault(sa => sa.SessionId == sessionId);

        if (sessionAttendee is not null)
        {
            attendee.SessionsAttendees.Remove(sessionAttendee);
            await _db.SaveChangesAsync();
        }

        return NoContent();
    }
}
