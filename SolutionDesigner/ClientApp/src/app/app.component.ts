import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ComponentFactoryResolver,
  ViewChild
} from "@angular/core";
import { ConnectBridgeDataRequesterService } from "./services/connect-bridge-data-requester.service";
import { Observable } from "rxjs";
import { CreateConnectionResponse } from "./service-models/create-connection-response";
import {
  HttpErrorResponse,
  HttpRequest,
  HttpClient
} from "@angular/common/http";
import { Logs } from "selenium-webdriver";
import { ExecuteResponse } from "./service-models/execute-query-response";
import {
  FormGroup,
  FormBuilder,
  Validators,
  SelectMultipleControlValueAccessor
} from "@angular/forms";
import { MultiSeries } from "./configuration-panel/models/multi-series";
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { LineChart } from "./configuration-panel/models/line-chart";
import {
  ChartDashboardItem,
  AppDashboardItem,
  TextDashboardItem
} from "./dashboard-item";
import { BaseChart } from "./configuration-panel/models/base-chart";
import { GaugeChart } from "./configuration-panel/models/gauge-chart";
import { PowerApp } from "./power-app/models/power-app";
import { DataParserService } from "./services/data-parser.service";
import { DashboardItem } from "./dashboard-item";
import { DashboardStateStorageService } from "./services/dashboard-state-storage.service";
import { TextElement } from "./text-element";
import { DashboardChartStorageService } from "./services/dashboard-chart-storage.service";
import { DashboardAppStorageService } from "./services/dashboard-app-storage.service";
import { DashboardComponentStorageService } from "./services/dashboard-component-storage.service";
import { thresholdFreedmanDiaconis } from "d3";
import { Image } from "./image";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  queryExecutor: FormGroup;
  queryExecutionResultParsed: Array<MultiSeries>;
  options: GridsterConfig;

  // Specifies the type of the item that will be created.
  itemType: string;

  // Dashboard information holders.
  chartDashboard: Array<ChartDashboardItem> = [];
  appDashboard: Array<AppDashboardItem> = [];
  textComponentDashboard: Array<TextDashboardItem> = [];

  dashboardLogo: Image;

  private _refreshCharts: any;

  /**
   * Opens a new connection with connect bridge platform. This connection uses the web service driver.
   * @param cbRequestService The service used to execute the calls on the connect bridhe server.
   */
  constructor(
    private cbRequestService: ConnectBridgeDataRequesterService,
    private formBuilder: FormBuilder,
    private dataParser: DataParserService,
    private dashboardChartsStorage: DashboardChartStorageService,
    private dashboardAppStorage: DashboardAppStorageService,
    private dasboardComponentStorage: DashboardComponentStorageService,
    private httpRequest: HttpClient
  ) {}

  ngOnInit(): void {
    this.queryExecutor = this.formBuilder.group({
      query: ["", Validators.required]
    });
    this.options = {
      itemChangeCallback: this.itemChange.bind(this),
      itemResizeCallback: this.itemResize.bind(this),
      gridType: "fixed",
       fixedColWidth: 15,
       fixedRowHeight: 15,
       minRows: 500,
       maxRows: 1000,
       minCols: 500,
       maxCols: 1000,
       maxItemCols: 1000,
       maxItemRows: 1000,
      margin: 0,
      setGridSize: false,
      // displayGrid: "none",
      draggable: { enabled: true },
      resizable: { enabled: true }
    };
    this.loadLogo();
    this.loadDashboardItems();
    this._refreshCharts = setInterval(this.updateCharts.bind(this), 10000);
  }

  itemChange(item, itemComponent) {
    if (item["itemGroup"] === "app") {
      this.dashboardAppStorage.updateItem(item).subscribe(
        (dashboardItem: AppDashboardItem) => {
          console.log(
            "New Item position was stored for dashboard item with Id: " +
              dashboardItem.id +
              " ."
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to store the new dimensions for the item. Error: " +
              error.message
          );
        }
      );
    } else if (item["itemGroup"] === "component") {
      this.dasboardComponentStorage.updateItem(item).subscribe(
        (dashboardItem: TextDashboardItem) => {
          console.log(
            "New Item position was stored for dashboard item with Id: " +
              dashboardItem.id +
              " ."
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to store the new dimensions for the item. Error: " +
              error.message
          );
        }
      );
    } else if (item["itemGroup"] === "chart") {
      this.dashboardChartsStorage.updateItem(item).subscribe(
        (dashboardItem: ChartDashboardItem) => {
          console.log(
            "New Item position was stored for dashboard item with Id: " +
              dashboardItem.id +
              " ."
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to store the new dimensions for the item. Error: " +
              error.message
          );
        }
      );
    } else {
      throw new Error("It was not possible to update the component position.");
    }
  }

  itemResize(item, itemComponent) {
    if (item["itemGroup"] === "app" || item["itemGroup"] === "component") {
      return;
    }
    const gridItemToRefresh = this.chartDashboard.find(
      gridItem => gridItem.id === item.id
    );
    if (gridItemToRefresh === undefined) {
      return;
    }
    if (
      (<ChartDashboardItem>gridItemToRefresh).data === undefined ||
      (<ChartDashboardItem>gridItemToRefresh).data === null
    ) {
      const func = count => {
        if (count === 5) {
          this.loadChartData(gridItemToRefresh);
          func(count + 1);
        }
      };
      setTimeout(func.bind(0), 1000);
      if (
        (<ChartDashboardItem>gridItemToRefresh).data === undefined ||
        (<ChartDashboardItem>gridItemToRefresh).data === null
      ) {
        console.log("It was not possible to get the data for the chart.");
        return;
      }
    }
    // let iteration = 0;
    // while (((<ChartDashboardItem>gridItemToRefresh).data === undefined || (<ChartDashboardItem>gridItemToRefresh).data === null)) {
    //   this.loadChartData(gridItemToRefresh);
    //   console.log("Trying to get data for the chart. Retry: " + iteration);
    //   if (iteration >= 2) {
    //     console.log("It was not possible to get the data for the chart.");
    //     return;
    //   }
    //   iteration++;
    //   waits(1);
    // }
    (<ChartDashboardItem>gridItemToRefresh).data = [
      ...(<ChartDashboardItem>gridItemToRefresh).data
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  /**
   *Handles the creation of a new charts.
   * @param event The event that was generated by the new item when it was created in another component.
   */
  onNewChartCreation(event: BaseChart) {
    let dashItem: DashboardItem = null;
    if (event.chartType === "line-chart") {
      const castedChart = event as LineChart;
      const newDashboardItem: ChartDashboardItem = {
        data: castedChart.data,
        itemType: castedChart.chartType,
        itemGroup: "chart",
        cols: 10,
        rows: 7,
        y: 0,
        x: 0,
        chartOptions: castedChart.options,
        queries: [{ guiItemName: null, query: event.associatedQuery }],
        columns: [castedChart.xColumn, castedChart.yColumn],
        id: null
      };
      console.log(castedChart);
      dashItem = newDashboardItem;
    } else if (event.chartType === "gauge") {
      const castedChart = event as GaugeChart;
      const newDashboardItem: ChartDashboardItem = {
        data: castedChart.data,
        itemType: castedChart.chartType,
        itemGroup: "chart",
        cols: 10,
        rows: 7,
        y: 0,
        x: 0,
        chartOptions: castedChart.options,
        queries: [{ guiItemName: null, query: event.associatedQuery }],
        columns: [castedChart.options.gaugeValue],
        id: null
      };
      dashItem = newDashboardItem;
    } else {
      throw new Error("Unsupported Chart");
    }
    this.dashboardChartsStorage.insertItem(dashItem).subscribe(
      (dashboardItem: ChartDashboardItem) => {
        dashItem.id = dashboardItem.id;
        this.chartDashboard.push(dashboardItem);
        console.log(
          "The new chart with id: " + dashboardItem.id + " was created."
        );
      },
      (error: HttpErrorResponse) => {
        console.log(
          "It was not possible to add the selected chart into the dashboard. Error: " +
            error.message
        );
      }
    );
  }

  // /***
  //  * Creates a new app to be add into the dashboard.
  //  */
  onNewAppCreation(event: PowerApp) {
    if (event.selector === "power-app") {
      const app: AppDashboardItem = {
        itemType: event.selector,
        itemGroup: "app",
        cols: 10,
        rows: 7,
        y: 0,
        x: 0,
        queries: [],
        id: null
      };
      this.dashboardAppStorage.insertItem(app).subscribe(
        (dashboardItem: DashboardItem) => {
          app.id = dashboardItem.id;
          this.appDashboard.push(app);
          console.log(
            "The item with id: " + dashboardItem.id + " was created."
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "The database service is not running. It was not possible to add the new dashboarditem. Error: " +
              error.message
          );
        }
      );
    } else {
      throw new Error("Unrecognized App");
    }
  }

  /**
   * Creates a new text element for new text creation.
   * @param $event Gets the metadata to create a new text element.
   */
  onNewTextCreation(event: TextElement) {
    const dashItem: TextDashboardItem = {
      id: null,
      itemType: "text",
      itemGroup: "component",
      queries: null,
      textOptions: event,
      cols: 10,
      rows: 7,
      y: 0,
      x: 0
    };
    this.dasboardComponentStorage.insertItem(dashItem).subscribe(
      (dashboardItem: TextDashboardItem) => {
        dashItem.id = dashboardItem.id;
        this.textComponentDashboard.push(dashItem);
        console.log("The item with id: " + dashboardItem.id + " was created.");
      },
      (error: HttpErrorResponse) => {
        console.log(
          "The database service is not running. It was not possible to add the new dashboarditem. Error: " +
            error.message
        );
      }
    );
  }

  /**
   * Removes a dashboard item from the dashboard.
   */
  removeItem($event, dashboardItem: DashboardItem) {
    $event.preventDefault();
    $event.stopPropagation();
    if (dashboardItem.itemGroup === "app") {
      this.dashboardAppStorage.deleteItem(dashboardItem).subscribe(
        (di: AppDashboardItem) => {
          this.appDashboard.splice(
            this.appDashboard.indexOf(dashboardItem as AppDashboardItem),
            1
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to remove the dashboarditem. Error: " +
              error.message
          );
        }
      );
    } else if (dashboardItem.itemGroup === "chart") {
      this.dashboardChartsStorage.deleteItem(dashboardItem).subscribe(
        (di: ChartDashboardItem) => {
          this.chartDashboard.splice(
            this.chartDashboard.indexOf(dashboardItem as ChartDashboardItem),
            1
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to remove the dashboarditem. Error: " +
              error.message
          );
        }
      );
    } else if (dashboardItem.itemGroup === "component") {
      this.dasboardComponentStorage.deleteItem(dashboardItem).subscribe(
        (di: TextDashboardItem) => {
          this.textComponentDashboard.splice(
            this.textComponentDashboard.indexOf(
              dashboardItem as TextDashboardItem
            ),
            1
          );
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to remove the dashboarditem. Error: " +
              error.message
          );
        }
      );
    } else {
      throw new Error("The dashboard item could not be deleted.");
    }
  }

  /**
   * Automatically Requests Connect Bridge New Data To Refresh the Dashboard Values.
   */
  updateCharts() {
    for (let index = 0; index < this.chartDashboard.length; index++) {
      this.cbRequestService
        .executeQuery(this.chartDashboard[index].queries[0].query)
        .subscribe(
          (response: ExecuteResponse) => {
            if (!response.IsSuccess) {
              console.log(
                "It was not possible to fetch data from Connect Bridge. Error: " +
                  response.ErrorMessage
              );
              return;
            }
            if (this.chartDashboard[index].itemType === "line-chart") {
              this.chartDashboard[
                index
              ].data = this.dataParser.multiSeriesPaser(
                response,
                this.chartDashboard[index].columns[0],
                this.chartDashboard[index].columns[1]
              );
            } else if (this.chartDashboard[index].itemType === "gauge") {
              this.chartDashboard[
                index
              ].data = this.dataParser.singleSeriesParser(
                response,
                this.chartDashboard[index].columns[0]
              );
            }
          },
          (error: HttpErrorResponse) => {
            console.log(
              "It was not possible to update get data to update the chart. Error: " +
                error.message
            );
          }
        );
    }
    return;
  }

  /**
   * Formats the value present by the gauge charts.
   * @param value the value to be parsed
   */
  valueFormatting(value: number): string {
    if (value === null) {
      return;
    }
    return `${Number(value)
      .toPrecision(2)
      .toLocaleString()}`;
  }

  /**
   * Loads any items stored in the database.
   */
  loadDashboardItems() {
    // Loads Charts
    this.dashboardChartsStorage.selectAll().subscribe(
      (dashboardItems: Array<ChartDashboardItem>) => {
        if (dashboardItems.length === 0) {
          console.log("There are no charts to load.");
          return;
        }
        this.chartDashboard = dashboardItems;
        console.log("All charts were loaded.");
      },
      (error: HttpErrorResponse) => {
        console.log(
          "It was not possible to load the charts. Error: " + error.message
        );
      }
    );
    // Loads data for each one of the charts.
    for (let i = 0; i < this.chartDashboard.length; i++) {
      this.loadChartData(this.chartDashboard[i]);
    }

    // Loads TextComponents
    this.dasboardComponentStorage.selectAll().subscribe(
      (dashboardItems: Array<TextDashboardItem>) => {
        if (dashboardItems.length === 0) {
          console.log("There are no components to load.");
          return;
        }
        this.textComponentDashboard = dashboardItems;
        console.log("All components were loaded.");
      },
      (error: HttpErrorResponse) => {
        console.log(
          "It was not possible to load the components. Error: " + error.message
        );
      }
    );

    // Loads Apps
    this.dashboardAppStorage.selectAll().subscribe(
      (dashboardItems: Array<AppDashboardItem>) => {
        if (dashboardItems.length === 0) {
          console.log("There are no charts to load.");
          return;
        }
        this.appDashboard = dashboardItems;
        console.log("All charts were loaded.");
      },
      (error: HttpErrorResponse) => {
        console.log(
          "It was not possible to load the charts. Error: " + error.message
        );
      }
    );
  }

  /**
   * Loads data for a scpecific chart.
   * @param dashboardItem Chart to which data will be loaded
   */
  loadChartData(dashboardItem: ChartDashboardItem) {
    this.cbRequestService
      .executeQuery(dashboardItem.queries[0].query)
      .subscribe(
        (response: ExecuteResponse) => {
          if (!response.IsSuccess) {
            console.log(
              "It was not possible to fetch data from Connect Bridge. Error: " +
                response.ErrorMessage
            );
            return;
          }
          if (dashboardItem.itemType === "line-chart") {
            dashboardItem.data = this.dataParser.multiSeriesPaser(
              response,
              dashboardItem.columns[0],
              dashboardItem.columns[1]
            );
          } else if (dashboardItem.itemType === "gauge") {
            dashboardItem.data = this.dataParser.singleSeriesParser(
              response,
              dashboardItem.columns[0]
            );
          }
        },
        (error: HttpErrorResponse) => {
          console.log(
            "It was not possible to update get data to update the chart. Error: " +
              error.message
          );
        }
      );
  }

  /**
   *  Clears the event that is associated with the automatic refresh
   *  */
  ngOnDestroy() {
    clearInterval(this._refreshCharts);
  }

  onNewLogoCreated(event) {
    this.dashboardLogo = event;
  }

  loadLogo() {
    this.httpRequest.get("https://localhost:5001/dashboard/image/").subscribe(
      (file: Image[]) => {
        console.log(file);
        this.dashboardLogo = file[0];
      },
      (error: HttpErrorResponse) => {
        console.log(
          "It was not possible to retrieve the image from the database. Error: " +
            error.message
        );
      }
    );
  }
}
