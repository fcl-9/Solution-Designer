import { GridsterItem } from "angular-gridster2";
import { LineChartOptions } from "./configuration-panel/models/line-chart";
import { GaugeChartOptions } from "./configuration-panel/models/gauge-chart";
import { Column } from "./column";
import { TextElement } from "./text-element";

export interface DashboardItem extends GridsterItem {
  id: number;
  itemType: string;
  itemGroup: string;
  queries: Array<Query>;
//   cols: number;
//   rows: number;
//   x: number;
//   y: number;
}

export interface ChartDashboardItem extends DashboardItem {
    data: Array<any> | any;
    chartOptions: LineChartOptions | GaugeChartOptions;
    columns: Array<Column>;
}

// tslint:disable-next-line:no-empty-interface
export interface AppDashboardItem extends DashboardItem {
}

export interface TextDashboardItem extends DashboardItem {
  textOptions: TextElement;
}

export interface Query {
    guiItemName: string;
    query: string;
}
