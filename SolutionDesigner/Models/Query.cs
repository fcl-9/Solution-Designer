using System.ComponentModel.DataAnnotations;

namespace SolutionDesigner.Models
{
    public class Query
    {
        [Key]
        public int id { get; set; }
        public string guiItemName { get; set; }
        public string query { get; set; }
        public virtual DashboardItem DashboardItem { get; set; }

    }
}