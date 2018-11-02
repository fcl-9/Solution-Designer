using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionDesigner.Migrations
{
    public partial class SupportCacadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Query_DashboardItem_DashboardItemId",
                table: "Query");

            migrationBuilder.AddForeignKey(
                name: "FK_Query_DashboardItem_DashboardItemId",
                table: "Query",
                column: "DashboardItemId",
                principalTable: "DashboardItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Query_DashboardItem_DashboardItemId",
                table: "Query");

            migrationBuilder.AddForeignKey(
                name: "FK_Query_DashboardItem_DashboardItemId",
                table: "Query",
                column: "DashboardItemId",
                principalTable: "DashboardItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
