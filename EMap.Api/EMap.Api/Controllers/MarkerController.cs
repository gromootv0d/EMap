using EMap.Api.Models;
using EMap.Api.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMap.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MarkerController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        private readonly ILogger<MarkerController> _logger;

        public MarkerController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/markers
        [HttpGet]
        public async Task<IEnumerable<Marker>> GetMarkers()
        {
            _logger.LogInformation("get markers");
            return await _dbContext.Markers.ToListAsync();
        }

        // POST api/markers
        [HttpPost]
        public async Task<IActionResult> PostMarker([FromBody] Marker marker)
        {
            _logger.LogInformation("post markers");

            if (marker == null)
            {
                return BadRequest("Invalid marker data.");
            }

            _dbContext.Markers.Add(marker);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
