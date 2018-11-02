using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SolutionDesigner.Models
{
    public class DashboardItem
    {
        [Key]
        public int? Id { get; set; }
        public string itemType { get; set; }
        public string itemGroup { get; set; }
        public List<Query> queries { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int cols { get; set; }
        public int rows { get; set; }
    }
}


