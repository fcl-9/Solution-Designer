using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionDesigner.Migrations
{
    public partial class dividingdashboarditem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Column_DashboardItem_DashboardItemId",
                table: "Column");

            migrationBuilder.RenameColumn(
                name: "DashboardItemId",
                table: "Column",
                newName: "ChartDashboardItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Column_DashboardItemId",
                table: "Column",
                newName: "IX_Column_ChartDashboardItemId");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "DashboardItem",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "itemGroup",
                table: "DashboardItem",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TextOptionsId",
                table: "DashboardItem",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TextElement",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Color = table.Column<string>(nullable: true),
                    Fontfamily = table.Column<string>(nullable: true),
                    Size = table.Column<double>(nullable: false),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextElement", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Column_DashboardItem_ChartDashboardItemId",
                table: "Column");

            migrationBuilder.DropForeignKey(
                name: "FK_DashboardItem_TextElement_TextOptionsId",
                table: "DashboardItem");

            migrationBuilder.DropTable(
                name: "TextElement");

            migrationBuilder.DropIndex(
                name: "IX_DashboardItem_TextOptionsId",
                table: "DashboardItem");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "DashboardItem");

            migrationBuilder.DropColumn(
                name: "itemGroup",
                table: "DashboardItem");

            migrationBuilder.DropColumn(
                name: "TextOptionsId",
                table: "DashboardItem");

            migrationBuilder.RenameColumn(
                name: "ChartDashboardItemId",
                table: "Column",
                newName: "DashboardItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Column_ChartDashboardItemId",
                table: "Column",
                newName: "IX_Column_DashboardItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Column_DashboardItem_DashboardItemId",
                table: "Column",
                column: "DashboardItemId",
                principalTable: "DashboardItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
