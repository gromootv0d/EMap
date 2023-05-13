using System.ComponentModel.DataAnnotations;

namespace EMap.Api.Models.Database
{
    public class Marker
    {
        [Key]
        public int Id { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Description { get; set; }
    }
}
