using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionDesigner.Migrations
{
    public partial class addreferences : Migration
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
                    itemGroup = table.Column<string>(nullable: true),
                    x = table.Column<int>(nullable: false),
                    y = table.Column<int>(nullable: false),
                    cols = table.Column<int>(nullable: false),
                    rows = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    serializedChartOptions = table.Column<string>(nullable: true)
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
                    ChartDashboardItemId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Column", x => x.id);
                    table.ForeignKey(
                        name: "FK_Column_DashboardItem_ChartDashboardItemId",
                        column: x => x.ChartDashboardItemId,
                        principalTable: "DashboardItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TextElement",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Color = table.Column<string>(nullable: true),
                    Fontfamily = table.Column<string>(nullable: true),
                    Size = table.Column<double>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    DashboarItemdRef = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextElement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TextElement_DashboardItem_Id",
                        column: x => x.Id,
                        principalTable: "DashboardItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Column_ChartDashboardItemId",
                table: "Column",
                column: "ChartDashboardItemId");

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
                name: "TextElement");

            migrationBuilder.DropTable(
                name: "DashboardItem");
        }
    }
}
