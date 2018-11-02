using System.ComponentModel.DataAnnotations;

namespace SolutionDesigner.Models
{
    public class GridsterItem
    {
        [Key]
        public int id { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int rows { get; set; }
        public int cols { get; set; }
        public bool dragEnabled { get; set; }
        public bool resizeEnabled { get; set; }
        public bool compactEnabled { get; set; }
        public int maxItemRows { get; set; }
        public int minItemRows { get; set; }
        public int maxItemCols { get; set; }
        public int minItemCols { get; set; }
        public int minItemArea { get; set; }
        public int maxItemArea { get; set; }
    }
}