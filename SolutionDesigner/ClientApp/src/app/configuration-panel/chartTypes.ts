import { ChartGroup } from "./model";

const chartGroups: Array<ChartGroup> = [
  // {
  //   name: "Bar Charts",
  //   charts: [
  //     {
  //       name: "Vertical Bar Chart",
  //       selector: "bar-vertical",
  //       inputFormat: "singleSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled",
  //         "roundEdges",
  //         "yScaleMax",
  //         "showDataLabel"
  //       ]
  //     },
  //     {
  //       name: "Horizontal Bar Chart",
  //       selector: "bar-horizontal",
  //       inputFormat: "singleSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled",
  //         "roundEdges",
  //         "xScaleMax",
  //         "showDataLabel"
  //       ],
  //       defaults: {
  //         yAxisLabel: "Country",
  //         xAxisLabel: "GDP Per Capita"
  //       }
  //     },
  //     {
  //       name: "Grouped Vertical Bar Chart",
  //       selector: "bar-vertical-2d",
  //       inputFormat: "multiSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "groupPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled",
  //         "roundEdges",
  //         "yScaleMax",
  //         "showDataLabel"
  //       ]
  //     },
  //     {
  //       name: "Grouped Horizontal Bar Chart",
  //       selector: "bar-horizontal-2d",
  //       inputFormat: "multiSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "groupPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled",
  //         "roundEdges",
  //         "xScaleMax",
  //         "showDataLabel"
  //       ],
  //       defaults: {
  //         yAxisLabel: "Country",
  //         xAxisLabel: "GDP Per Capita"
  //       }
  //     },
  //     {
  //       name: "Stacked Vertical Bar Chart",
  //       selector: "bar-vertical-stacked",
  //       inputFormat: "multiSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled",
  //         "yScaleMax",
  //         "showDataLabel"
  //       ]
  //     },
  //     {
  //       name: "Stacked Horizontal Bar Chart",
  //       selector: "bar-horizontal-stacked",
  //       inputFormat: "multiSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled",
  //         "xScaleMax",
  //         "showDataLabel"
  //       ],
  //       defaults: {
  //         yAxisLabel: "Country",
  //         xAxisLabel: "GDP Per Capita"
  //       }
  //     },
  //     {
  //       name: "Normalized Vertical Bar Chart",
  //       selector: "bar-vertical-normalized",
  //       inputFormat: "multiSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled"
  //       ],
  //       defaults: {
  //         yAxisLabel: "Normalized GDP Per Capita",
  //         xAxisLabel: "Country"
  //       }
  //     },
  //     {
  //       name: "Normalized Horizontal Bar Chart",
  //       selector: "bar-horizontal-normalized",
  //       inputFormat: "multiSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "schemeType",
  //         "showXAxis",
  //         "showYAxis",
  //         "gradient",
  //         "barPadding",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "showXAxisLabel",
  //         "xAxisLabel",
  //         "showYAxisLabel",
  //         "yAxisLabel",
  //         "showGridLines",
  //         "roundDomains",
  //         "tooltipDisabled"
  //       ],
  //       defaults: {
  //         yAxisLabel: "Country",
  //         xAxisLabel: "Normalized GDP Per Capita"
  //       }
  //     }
  //   ]
  // },
  // {
  //   name: "Pie Charts",
  //   charts: [
  //     {
  //       name: "Pie Chart",
  //       selector: "pie-chart",
  //       inputFormat: "singleSeries",
  //       options: [
  //         "animations",
  //         "colorScheme",
  //         "gradient",
  //         "showLegend",
  //         "legendTitle",
  //         "legendPosition",
  //         "doughnut",
  //         "arcWidth",
  //         "explodeSlices",
  //         "showLabels",
  //         "tooltipDisabled"
  //       ]
  //     },
  //     {
  //       name: "Advanced Pie Chart",
  //       selector: "advanced-pie-chart",
  //       inputFormat: "singleSeries",
  //       options: ["animations", "colorScheme", "gradient", "tooltipDisabled"]
  //     },
  //     {
  //       name: "Pie Grid",
  //       selector: "pie-grid",
  //       inputFormat: "singleSeries",
  //       options: ["animations", "colorScheme", "tooltipDisabled"]
  //     }
  //   ]
  // },
  {
    name: "Line/Area Charts",
    charts: [
      {
        name: "Line Chart",
        selector: "line-chart",
        inputFormat: "multiSeries",
        options: [
          "animations",
          "colorScheme",
          "schemeType",
          "showXAxis",
          "showYAxis",
          "gradient",
          "showLegend",
          "legendTitle",
          "legendPosition",
          "showXAxisLabel",
          "xAxisLabel",
          "showYAxisLabel",
          "yAxisLabel",
          "autoScale",
          "timeline",
          "showGridLines",
          "curve",
          "rangeFillOpacity",
          "roundDomains",
          "tooltipDisabled",
          "showRefLines",
          "referenceLines",
          "showRefLabels",
          "xScaleMin",
          "xScaleMax",
          "yScaleMin",
          "yScaleMax",
          "xColumn",
          "yColumn"
        ],
        defaults: {
          yAxisLabel: "GDP Per Capita",
          xAxisLabel: "Census Date",
          linearScale: true
        }
      },
      // {
      //   name: "Polar Chart",
      //   selector: "polar-chart",
      //   inputFormat: "multiSeries",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "schemeType",
      //     "showXAxis",
      //     "showYAxis",
      //     "gradient",
      //     "showLegend",
      //     "legendTitle",
      //     "legendPosition",
      //     "showXAxisLabel",
      //     "xAxisLabel",
      //     "showYAxisLabel",
      //     "yAxisLabel",
      //     "autoScale",
      //     "showGridLines",
      //     "curveClosed",
      //     "roundDomains",
      //     "tooltipDisabled"
      //   ],
      //   defaults: {
      //     yAxisLabel: "GDP Per Capita",
      //     xAxisLabel: "Census Date",
      //     linearScale: true
      //   }
      // },
      // {
      //   name: "Area Chart",
      //   selector: "area-chart",
      //   inputFormat: "multiSeries",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "schemeType",
      //     "showXAxis",
      //     "showYAxis",
      //     "gradient",
      //     "showLegend",
      //     "legendTitle",
      //     "legendPosition",
      //     "showXAxisLabel",
      //     "xAxisLabel",
      //     "showYAxisLabel",
      //     "yAxisLabel",
      //     "autoScale",
      //     "timeline",
      //     "showGridLines",
      //     "curve",
      //     "roundDomains",
      //     "tooltipDisabled",
      //     "xScaleMin",
      //     "xScaleMax",
      //     "yScaleMin",
      //     "yScaleMax"
      //   ],
      //   defaults: {
      //     yAxisLabel: "GDP Per Capita",
      //     xAxisLabel: "Census Date",
      //     linearScale: true
      //   }
      // },
      // {
      //   name: "Stacked Area Chart",
      //   selector: "area-chart-stacked",
      //   inputFormat: "multiSeries",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "schemeType",
      //     "showXAxis",
      //     "showYAxis",
      //     "gradient",
      //     "showLegend",
      //     "legendTitle",
      //     "legendPosition",
      //     "showXAxisLabel",
      //     "xAxisLabel",
      //     "showYAxisLabel",
      //     "yAxisLabel",
      //     "autoScale",
      //     "timeline",
      //     "showGridLines",
      //     "curve",
      //     "roundDomains",
      //     "tooltipDisabled",
      //     "xScaleMin",
      //     "xScaleMax",
      //     "yScaleMin",
      //     "yScaleMax"
      //   ],
      //   defaults: {
      //     yAxisLabel: "GDP Per Capita",
      //     xAxisLabel: "Census Date",
      //     linearScale: true
      //   }
      // },
      // {
      //   name: "Normalized Area Chart",
      //   selector: "area-chart-normalized",
      //   inputFormat: "multiSeries",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "schemeType",
      //     "showXAxis",
      //     "showYAxis",
      //     "gradient",
      //     "showLegend",
      //     "legendTitle",
      //     "legendPosition",
      //     "showXAxisLabel",
      //     "xAxisLabel",
      //     "showYAxisLabel",
      //     "yAxisLabel",
      //     "autoScale",
      //     "timeline",
      //     "showGridLines",
      //     "curve",
      //     "roundDomains",
      //     "tooltipDisabled"
      //   ],
      //   defaults: {
      //     yAxisLabel: "Normalized GDP Per Capita",
      //     xAxisLabel: "Census Date",
      //     linearScale: true
      //   }
      // }
    ]
  },
  {
    name: "Other Charts",
    charts: [
      // {
      //   name: "Bubble Chart",
      //   selector: "bubble-chart",
      //   inputFormat: "bubble",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "schemeType",
      //     "showXAxis",
      //     "showYAxis",
      //     "showLegend",
      //     "legendTitle",
      //     "legendPosition",
      //     "showXAxisLabel",
      //     "xAxisLabel",
      //     "showYAxisLabel",
      //     "yAxisLabel",
      //     "showGridLines",
      //     "roundDomains",
      //     "autoScale",
      //     "minRadius",
      //     "maxRadius",
      //     "tooltipDisabled",
      //     "xScaleMin",
      //     "xScaleMax",
      //     "yScaleMin",
      //     "yScaleMax"
      //   ],
      //   defaults: {
      //     xAxisLabel: "Census Date",
      //     yAxisLabel: "Life expectancy [years]"
      //   }
      // },
      // {
      //   name: "Force Directed Graph",
      //   selector: "force-directed-graph",
      //   inputFormat: "graph",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "showLegend",
      //     "legendTitle",
      //     "legendPosition",
      //     "tooltipDisabled"
      //   ]
      // },
      // {
      //   name: "Heat Map",
      //   selector: "heat-map",
      //   inputFormat: "multiSeries",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "showXAxis",
      //     "showYAxis",
      //     "gradient",
      //     "showLegend",
      //     "showXAxisLabel",
      //     "xAxisLabel",
      //     "showYAxisLabel",
      //     "yAxisLabel",
      //     "innerPadding",
      //     "tooltipDisabled",
      //     "min",
      //     "max"
      //   ],
      //   defaults: {
      //     yAxisLabel: "Census Date",
      //     cAxisLabel: "Country"
      //   }
      // },
      // {
      //   name: "Tree Map",
      //   selector: "tree-map",
      //   inputFormat: "singleSeries",
      //   options: ["animations", "colorScheme", "tooltipDisabled", "gradient"]
      // },
      // {
      //   name: "Number Cards",
      //   selector: "number-card",
      //   inputFormat: "singleSeries",
      //   options: ["animations", "colorScheme"]
      // },
      {
        name: "Gauge",
        selector: "gauge",
        inputFormat: "singleSeries",
        options: [
          "showLegend",
          "legendTitle",
          "legendPosition",
          "colorScheme",
          "min",
          "max",
          "largeSegments",
          "smallSegments",
          "units",
          "angleSpan",
          "startAngle",
          "showAxis",
          "margin",
          "tooltipDisabled",
          "animations",
          "gaugeValue"
        ]
      }// ,
      // {
      //   name: "Linear Gauge",
      //   selector: "linear-gauge",
      //   inputFormat: "single",
      //   options: [
      //     "animations",
      //     "colorScheme",
      //     "value",
      //     "previousValue",
      //     "min",
      //     "max",
      //     "units"
      //   ]
      // }
    ]
  }
];

export default chartGroups;
