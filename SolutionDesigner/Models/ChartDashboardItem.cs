using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SolutionDesigner.Models
{
    public class ChartDashboardItem: DashboardItem
    {
        //public GridsterItem itemPosition { get; set; }
        [NotMapped]
        public object chartOptions { get; set; }

        public string serializedChartOptions
        {
            get { return JsonConvert.SerializeObject(chartOptions); }
            set
            {
                try
                {
                    chartOptions = JObject.Parse(value);
                }
                catch (Exception e)
                {
                    Debug.Write(e.Message);
                    chartOptions = null;
                }
            }
        }

        public List<Column> columns { get; set; }

    }
}