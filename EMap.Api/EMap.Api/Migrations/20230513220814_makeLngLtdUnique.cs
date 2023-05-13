using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMap.Api.Migrations
{
    /// <inheritdoc />
    public partial class makeLngLtdUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Markers_Latitude",
                table: "Markers",
                column: "Latitude",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Markers_Longitude",
                table: "Markers",
                column: "Longitude",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Markers_Latitude",
                table: "Markers");

            migrationBuilder.DropIndex(
                name: "IX_Markers_Longitude",
                table: "Markers");
        }
    }
}
