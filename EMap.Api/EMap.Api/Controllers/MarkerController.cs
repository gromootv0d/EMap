using EMap.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMap.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MarkerController : ControllerBase
    {
        private static List<Marker> markers = new List<Marker>();

        private readonly ILogger<MarkerController> _logger;

        public MarkerController(ILogger<MarkerController> logger)
        {
            _logger = logger;
        }

        // GET api/markers
        [HttpGet]
        public IEnumerable<Marker> GetMarkers()
        {
            return markers;
        }

        // POST api/markers
        [HttpPost]
        public IActionResult PostMarker([FromBody] Marker marker)
        {
            if (marker == null)
            {
                return BadRequest("Invalid marker data.");
            }

            markers.Add(marker);
            return Ok();
        }
    }
}
