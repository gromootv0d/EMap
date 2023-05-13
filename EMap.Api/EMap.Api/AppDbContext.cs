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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Marker>()
                .HasIndex(m => m.Longitude)
                .IsUnique();

            modelBuilder.Entity<Marker>()
                .HasIndex(m => m.Latitude)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }

    }
}
