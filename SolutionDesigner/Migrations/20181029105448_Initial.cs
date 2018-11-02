using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionDesigner.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DashboardItem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    itemType = table.Column<string>(nullable: true),
                    x = table.Column<int>(nullable: false),
                    y = table.Column<int>(nullable: false),
                    cols = table.Column<int>(nullable: false),
                    rows = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DashboardItem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Column",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    type = table.Column<int>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    offset = table.Column<int>(nullable: false),
                    DashboardItemId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Column", x => x.id);
                    table.ForeignKey(
                        name: "FK_Column_DashboardItem_DashboardItemId",
                        column: x => x.DashboardItemId,
                        principalTable: "DashboardItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Query",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    guiItemName = table.Column<string>(nullable: true),
                    query = table.Column<string>(nullable: true),
                    DashboardItemId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Query", x => x.id);
                    table.ForeignKey(
                        name: "FK_Query_DashboardItem_DashboardItemId",
                        column: x => x.DashboardItemId,
                        principalTable: "DashboardItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Column_DashboardItemId",
                table: "Column",
                column: "DashboardItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Query_DashboardItemId",
                table: "Query",
                column: "DashboardItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Column");

            migrationBuilder.DropTable(
                name: "Query");

            migrationBuilder.DropTable(
                name: "DashboardItem");
        }
    }
}
