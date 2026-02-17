using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conference.API.Data;
using Conference.Model;

namespace Conference.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class SpeakersController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly ILogger<SpeakersController> _logger;

    public SpeakersController(ApplicationDbContext db, ILogger<SpeakersController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Get all speakers
    /// </summary>
    /// <returns>List of all speakers with their sessions</returns>
    [HttpGet]
    [ProducesResponseType(typeof(List<SpeakerResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SpeakerResponse>>> GetAllSpeakers()
    {
        var speakers = await _db.Speakers.AsNoTracking()
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Session)
            .Select(s => s.MapSpeakerResponse())
            .ToListAsync();

        return Ok(speakers);
    }

    /// <summary>
    /// Get speaker by ID
    /// </summary>
    /// <param name="id">Speaker ID</param>
    /// <returns>Speaker details with their sessions</returns>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(SpeakerResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SpeakerResponse>> GetSpeakerById(int id)
    {
        var speaker = await _db.Speakers.AsNoTracking()
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Session)
            .SingleOrDefaultAsync(s => s.Id == id);

        if (speaker is null)
        {
            return NotFound();
        }

        return Ok(speaker.MapSpeakerResponse());
    }
}
