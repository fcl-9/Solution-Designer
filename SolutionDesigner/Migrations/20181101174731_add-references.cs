using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionDesigner.Migrations
{
    public partial class addreferences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Column_DashboardItem_ChartDashboardItemId",
                table: "Column");

            migrationBuilder.DropForeignKey(
                name: "FK_DashboardItem_TextElement_TextOptionsId",
                table: "DashboardItem");

            migrationBuilder.DropIndex(
                name: "IX_DashboardItem_TextOptionsId",
                table: "DashboardItem");

            migrationBuilder.DropColumn(
                name: "TextOptionsId",
                table: "DashboardItem");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "TextElement",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Column_DashboardItem_ChartDashboardItemId",
                table: "Column",
                column: "ChartDashboardItemId",
                principalTable: "DashboardItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TextElement_DashboardItem_Id",
                table: "TextElement",
                column: "Id",
                principalTable: "DashboardItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Column_DashboardItem_ChartDashboardItemId",
                table: "Column");

            migrationBuilder.DropForeignKey(
                name: "FK_TextElement_DashboardItem_Id",
                table: "TextElement");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "TextElement",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "TextOptionsId",
                table: "DashboardItem",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DashboardItem_TextOptionsId",
                table: "DashboardItem",
                column: "TextOptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Column_DashboardItem_ChartDashboardItemId",
                table: "Column",
                column: "ChartDashboardItemId",
                principalTable: "DashboardItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DashboardItem_TextElement_TextOptionsId",
                table: "DashboardItem",
                column: "TextOptionsId",
                principalTable: "TextElement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
