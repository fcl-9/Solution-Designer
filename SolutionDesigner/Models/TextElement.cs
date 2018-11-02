using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SolutionDesigner.Models
{
    public class TextElement
    {
        public int Id { get; set; }
        public string Color { get; set; }
        public string Fontfamily { get; set; }
        public double Size { get; set; }
        public string Text { get; set; }
        public int DashboarItemdRef { get; set; }
        public virtual TextDashoardItem TextDashboardItem { get; set; }

    }
}