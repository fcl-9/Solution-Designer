import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Location } from "@angular/common";
import chartGroups from "../configuration-panel/chartTypes";
import { Chart } from "./model";
import { ConnectBridgeDataRequesterService } from "../services/connect-bridge-data-requester.service";
import { ExecuteResponse } from "../service-models/execute-query-response";
import {
  HttpResponse,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { Column } from "../column";
import { DataParserService } from "../services/data-parser.service";
import { GaugeChart } from "./models/gauge-chart";
import { BaseChart } from "./models/base-chart";
import { PowerApp } from "../power-app/models/power-app";
import { LineChart } from "./models/line-chart";
import { PowerAppComponent } from "../power-app/power-app.component";
import { TextElement } from "../text-element";
import fontGroups from "./fontFamilyTypes";
import { DashboardStateStorageService } from "../services/dashboard-state-storage.service";
import { Image } from "../image";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-configuration-panel",
  templateUrl: "./configuration-panel.component.html",
  styleUrls: ["./configuration-panel.component.scss"]
})
export class ConfigurationPanelComponent implements OnInit {
  chartType: string;
  chartGroups = chartGroups;
  fontGroups = fontGroups;
  chart: Chart;
  realTimeData = false;
  countries: any[];
  single: any[];
  multi: any[];
  fiscalYearReport: any[];
  dateData: any[];
  dateDataWithRange: any[];
  calendarData: any[];
  statusData: any[];
  sparklineData: any[];
  timelineFilterBarData: any[];
  graph: { links: any[]; nodes: any[] };
  bubble: any;
  linearScale: false;
  range: false;

  fitContainer: false;

  scheme = "#000000";

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = "Legend";
  legendPosition = "right";
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel: string;
  xColumn: Column;
  showYAxisLabel = true;
  yColumn: Column;
  yAxisLabel: string;
  showGridLines = true;
  innerPadding = "10%";
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges = true;
  animations = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  showDataLabel = false;

  // curves = {
  //   Basis: shape.curveBasis,
  //   "Basis Closed": shape.curveBasisClosed,
  //   Bundle: shape.curveBundle.beta(1),
  //   Cardinal: shape.curveCardinal,
  //   "Cardinal Closed": shape.curveCardinalClosed,
  //   "Catmull Rom": shape.curveCatmullRom,
  //   "Catmull Rom Closed": shape.curveCatmullRomClosed,
  //   Linear: shape.curveLinear,
  //   "Linear Closed": shape.curveLinearClosed,
  //   "Monotone X": shape.curveMonotoneX,
  //   "Monotone Y": shape.curveMonotoneY,
  //   Natural: shape.curveNatural,
  //   Step: shape.curveStep,
  //   "Step After": shape.curveStepAfter,
  //   "Step Before": shape.curveStepBefore,
  //   default: shape.curveLinear
  // };

  // // line interpolation
  // curveType: string = "Linear";
  // curve: any = this.curves[this.curveType];
  // interpolationTypes = [
  //   "Basis",
  //   "Bundle",
  //   "Cardinal",
  //   "Catmull Rom",
  //   "Linear",
  //   "Monotone X",
  //   "Monotone Y",
  //   "Natural",
  //   "Step",
  //   "Step After",
  //   "Step Before"
  // ];

  // closedCurveType: string = "Linear Closed";
  // closedCurve: any = this.curves[this.closedCurveType];
  // closedInterpolationTypes = [
  //   "Basis Closed",
  //   "Cardinal Closed",
  //   "Catmull Rom Closed",
  //   "Linear Closed"
  // ];

  // colorScheme: any = {
  //   domain: [this.scheme]
  // };
  schemeType: "ordinal";
  selectedColorScheme: string;
  rangeFillOpacity = 0.15;

  // Override colors for certain values
  // customColors: any[] = [
  //   {
  //     name: 'Germany',
  //     value: '#0000ff'
  //   }
  // ];

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;

  // line, area
  autoScale = true;
  timeline = false;

  // margin
  margin: false;
  marginTop: 40;
  marginRight: 40;
  marginBottom: 40;
  marginLeft: 40;

  // gauge
  gaugeMin: 0;
  gaugeMax: 100;
  gaugeLargeSegments: 10;
  gaugeSmallSegments: 5;
  gaugeTextValue: "";
  gaugeUnits: "alerts";
  gaugeAngleSpan: 240;
  gaugeStartAngle: -120;
  gaugeShowAxis: true;
  gaugeValue: Column; // linear gauge value
  gaugePreviousValue: 70;

  // heatmap
  heatmapMin: 0;
  heatmapMax: 50000;

  // Combo Chart
  barChart: any[];
  lineChartSeries: any[];
  lineChartScheme = {
    name: "coolthree",
    selectable: true,
    group: "Ordinal",
    domain: ["#01579b", "#7aa3e5", "#a8385d", "#00bfa5"]
  };

  comboBarScheme = {
    name: "singleLightBlue",
    selectable: true,
    group: "Ordinal",
    domain: ["#01579b"]
  };

  showRightYAxisLabel: true;
  yAxisLabelRight: "Utilization";

  // Returns the newly created chart
  @Output()
  newChartCreated = new EventEmitter<BaseChart>();
  @Output()
  newAppCreated = new EventEmitter<PowerApp>();
  @Output()
  newTextCreated = new EventEmitter<TextElement>();
  @Output()
  logoCreated = new EventEmitter<Image>();

  // Controls the Steps
  dataVisible = false;
  optionVisible = false;
  addChartVisible = false;

  fontsize = 8;
  color = "#000000";
  text: string;
  fontfamily = "\"Times New Roman\", Times, serif";
  textAlign = "left";
  // Query to be executed for the selected chart.
  queryToExecute: string;
  columns: Array<Column>;

  apps: Array<PowerApp> = [
    { name: "PLC Operation and Monitoring", selector: "power-app" }
  ];
  selectedApp: PowerApp;
  appType: any;

  private refUpdalodedFile: File;

  private _queryResult: ExecuteResponse;

  constructor(
    private location: Location,
    private connectBridgeService: ConnectBridgeDataRequesterService,
    private dataParser: DataParserService,
    private dashboardService: DashboardStateStorageService,
    private httpRequest: HttpClient
  ) {}

  ngOnInit() {}

  selectChart(chartSelector) {
    this.chartType = chartSelector = chartSelector.replace("/", "");
    // this.location.replaceState(this.chartType);

    for (const group of this.chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartSelector);
      if (this.chart) {
        break;
      }
    }
    Object.assign(this, this.chart.defaults);
    this.dataVisible = true;
  }

  /**
   * Adds a new chart to the grid.
   */
  add_chart_click() {
    console.log(this.chart);
    if (this.chart.selector === "line-chart") {
      if (!this.xAxisLabel) {
        this.xAxisLabel = this.xColumn.name;
        this.yAxisLabel = this.yColumn.name;
      }
      let lineChart: LineChart = {
        chartType: this.chart.selector,
        options: {
          animations: this.animations,
          schemeType: this.schemeType,
          scheme: {domain: [this.scheme]},
          showXAxis: this.showXAxis,
          showYAxis: this.showYAxis,
          gradient: this.gradient,
          showLegend: this.showLegend,
          legendTitle: this.legendTitle,
          showXAxisLabel: this.showXAxisLabel,
          xAxisLabel: this.xAxisLabel,
          showYAxisLabel: this.showYAxisLabel,
          yAxisLabel: this.yAxisLabel,
          autoScale: this.autoScale,
          timeline: this.timeline,
          showGridLines: this.showGridLines,
          rangeFillOpacity: this.rangeFillOpacity,
          roundDomains: this.roundDomains,
          tooltipDisabled: this.tooltipDisabled,
          xScaleMin: this.xScaleMin,
          xScaleMax: this.xScaleMax,
          yScaleMin: this.yScaleMin,
          yScaleMax: this.yScaleMax,
          xColumn: this.xColumn,
          yColumn: this.yColumn,
        },
        data: this.dataParser.multiSeriesPaser(
          this._queryResult,
          this.xColumn,
          this.yColumn
        ),
        associatedQuery: this.queryToExecute
      };
      this.newChartCreated.emit(lineChart);
    }
    if (this.chart.selector === "gauge") {
      let gauge: GaugeChart = {
        chartType: this.chart.selector,
        options: {
          showLegend: this.showLegend,
          legendTitle: this.legendTitle,
          legendPosition: this.legendPosition,
          scheme: {domain: [this.scheme]},
          min: this.gaugeMin,
          max: this.gaugeMax,
          largeSegments: this.gaugeLargeSegments,
          smallSegments: this.gaugeSmallSegments,
          units: this.gaugeUnits,
          angleSpan: this.gaugeAngleSpan,
          startAngle: this.gaugeStartAngle,
          showAxis: this.showXAxis,
          margin: this.margin,
          tooltipDisabled: this.tooltipDisabled,
          animations: this.animations,
          roundDomains: this.roundDomains,
          gaugeValue: this.gaugeValue
        },
        data: this.dataParser.singleSeriesParser(
          this._queryResult,
          this.gaugeValue
        ),
        associatedQuery: this.queryToExecute
      };
      this.newChartCreated.emit(gauge);
    } else {
      console.log("Unsuported Chart");
    }
  }

  /**
   * Adds a new app to gridster
   */
  onAppButtonClick() {
    const appToAdd = this.apps.find(app => app.selector === this.appType);
    this.newAppCreated.emit(appToAdd);
  }

  /***
   * Creates a new Text Elment that shall be added to the GUI.
   */
  onTextAddClick() {
    const newTextElement: TextElement = {
      color: this.color,
      size: this.fontsize,
      text: this.text,
      fontfamily: this.fontfamily,
      textAlign: this.textAlign
    };
    this.newTextCreated.emit(newTextElement);
  }

  /**
   * Gets data from the Connect Bridge Server. (Event Associated with a button)
   */
  getConnectBridgeData() {
    this.connectBridgeService.executeQuery(this.queryToExecute).subscribe(
      (result: ExecuteResponse) => {
        if (!result.IsSuccess) {
          console.log(
            "It was not possible to fetch data from Connect Bridge. Error: " +
              result.ErrorMessage
          );
          return;
        }
        this.columns = [];
        result.ColumnMetaData.forEach(column => {
          this.columns.push({
            name: column.ItemName,
            type: column.Type,
            offset: column.Offset
          });
        });
        this.optionVisible = true;
        this._queryResult = result;
      },
      (error: HttpErrorResponse) => {
        console.log(
          "An error occured during the query execution. Error: " + error.message
        );
      }
    );
  }

  /**
   * Uploads a file into the server.
   */
  onUploadLogo() {
    const data = new FormData();
    data.append("image", this.refUpdalodedFile);
    this.httpRequest
      .delete("https://localhost:5001/dashboard/image/")
      .subscribe(
        (file: Image) => {
          this.httpRequest
            .post("https://localhost:5001/dashboard/image/", data)
            .subscribe(
              (myFile: Image) => {
                this.logoCreated.emit(myFile);
                console.log("The image was saved in the database.");
              },
              (error: HttpErrorResponse) => {
                console.log(
                  "There was an error uploading the image into the website. Error: " +
                    error.message
                );
              }
            );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "There was an error uploading the image into the website. Error: " +
              error.message
          );
        }
      );
  }

  /**
   * When receives a new file.
   */
  onFileChange(event) {
    this.refUpdalodedFile = (event.target as HTMLInputElement).files[0];
  }
}
