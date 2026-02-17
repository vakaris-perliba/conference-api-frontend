using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conference.API.Data;
using Conference.Model;

namespace Conference.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class SearchController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly ILogger<SearchController> _logger;

    public SearchController(ApplicationDbContext db, ILogger<SearchController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Search sessions and speakers
    /// </summary>
    /// <param name="term">Search term</param>
    /// <returns>Search results containing matching sessions and speakers</returns>
    [HttpGet("{term}")]
    [ProducesResponseType(typeof(List<SearchResult>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<SearchResult>>> SearchConference(string term)
    {
        var sessionResults = await _db.Sessions.AsNoTracking()
            .Include(s => s.Track)
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Speaker)
            .Where(s =>
                s.Title!.Contains(term) ||
                s.Track!.Name!.Contains(term))
            .ToListAsync();

        var speakerResults = await _db.Speakers.AsNoTracking()
            .Include(s => s.SessionSpeakers)
            .ThenInclude(ss => ss.Session)
            .Where(s =>
                s.Name!.Contains(term) ||
                s.Bio!.Contains(term) ||
                s.WebSite!.Contains(term))
            .ToListAsync();

        var results = sessionResults.Select(s => new SearchResult
        {
            Type = SearchResultType.Session,
            Session = s.MapSessionResponse()
        })
        .Concat(speakerResults.Select(s => new SearchResult
        {
            Type = SearchResultType.Speaker,
            Speaker = s.MapSpeakerResponse()
        }))
        .ToList();

        return Ok(results);
    }
}
