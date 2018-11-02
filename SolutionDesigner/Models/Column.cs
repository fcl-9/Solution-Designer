using System.ComponentModel.DataAnnotations;

namespace SolutionDesigner.Models
{
    public class Column
    {
        [Key]
        public int id { get; set; }
        public int type { get; set; }
        public string name { get; set; }
        public int offset { get; set; }

        public virtual ChartDashboardItem ChartDashboardItem { get; set; }
    }
}