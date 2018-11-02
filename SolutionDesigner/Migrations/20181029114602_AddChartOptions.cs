using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionDesigner.Migrations
{
    public partial class AddChartOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "serializedChartOptions",
                table: "DashboardItem",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "serializedChartOptions",
                table: "DashboardItem");
        }
    }
}
