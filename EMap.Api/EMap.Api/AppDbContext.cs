using EMap.Api.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace EMap.Api
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Marker> Markers { get; set; }
    }
}
