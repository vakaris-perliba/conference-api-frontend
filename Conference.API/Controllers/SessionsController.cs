using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conference.API.Data;
using Conference.Model;

namespace Conference.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class SessionsController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly ILogger<SessionsController> _logger;

    public SessionsController(ApplicationDbContext db, ILogger<SessionsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Get all sessions
    /// </summary>
    /// <returns>List of all conference sessions</returns>
    [HttpGet]
    [ProducesResponseType(typeof(List<SessionResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SessionResponse>>> GetAllSessions()
    {
        var sessions = await _db.Sessions.AsNoTracking()
            .Include(s => s.Track)
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Speaker)
            .Select(m => m.MapSessionResponse())
            .ToListAsync();

        return Ok(sessions);
    }

    /// <summary>
    /// Get session by ID
    /// </summary>
    /// <param name="id">Session ID</param>
    /// <returns>Session details</returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(SessionResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SessionResponse>> GetSessionById(int id)
    {
        var session = await _db.Sessions.AsNoTracking()
            .Include(s => s.Track)
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Speaker)
            .SingleOrDefaultAsync(s => s.Id == id);

        if (session is null)
        {
            return NotFound();
        }

        return Ok(session.MapSessionResponse());
    }

    /// <summary>
    /// Create a new session
    /// </summary>
    /// <param name="input">Session data</param>
    /// <returns>Created session</returns>
    [HttpPost]
    [ProducesResponseType(typeof(SessionResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<SessionResponse>> CreateSession([FromBody] Conference.Model.Session input)
    {
        var session = new Data.Session
        {
            Title = input.Title,
            StartTime = input.StartTime,
            EndTime = input.EndTime,
            Abstract = input.Abstract,
            TrackId = input.TrackId
        };

        _db.Sessions.Add(session);
        await _db.SaveChangesAsync();

        var response = session.MapSessionResponse();
        return CreatedAtAction(nameof(GetSessionById), new { id = session.Id }, response);
    }

    /// <summary>
    /// Update an existing session
    /// </summary>
    /// <param name="id">Session ID</param>
    /// <param name="input">Updated session data</param>
    /// <returns>No content</returns>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateSession(int id, [FromBody] Conference.Model.Session input)
    {
        var session = await _db.Sessions.FindAsync(id);

        if (session is null)
        {
            return NotFound();
        }

        session.Title = input.Title;
        session.Abstract = input.Abstract;
        session.StartTime = input.StartTime;
        session.EndTime = input.EndTime;
        session.TrackId = input.TrackId;

        await _db.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Delete a session
    /// </summary>
    /// <param name="id">Session ID</param>
    /// <returns>No content</returns>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteSession(int id)
    {
        var session = await _db.Sessions.FindAsync(id);

        if (session is null)
        {
            return NotFound();
        }

        _db.Sessions.Remove(session);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Upload session data from a file
    /// </summary>
    /// <returns>No content</returns>
    [HttpPost("upload")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> UploadSessions()
    {
        if (await _db.Sessions.AnyAsync())
        {
            return Conflict(new { message = "Sessions already uploaded" });
        }

        var loader = new TechoramaDataLoader();
        await loader.LoadDataAsync(Request.Body, _db);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
