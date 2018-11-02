import { MultiSeries } from "./multi-series";
import { BaseChart } from "./base-chart";
import { Column } from "src/app/column";

export interface LineChart extends BaseChart  {
        data: Array<any>;
        options: LineChartOptions;
        xColumn: Column;
        yColumn: Column;
}

export interface LineChartOptions {
    animations: boolean;
    schemeType: string;
    showXAxis: boolean;
    showYAxis: boolean;
    gradient: boolean;
    showLegend: boolean;
    legendTitle: string;
    showXAxisLabel: any;
    xAxisLabel: any;
    showYAxisLabel: any;
    yAxisLabel: any;
    autoScale: any;
    timeline: any;
    showGridLines: boolean;
    rangeFillOpacity: number;
    roundDomains: boolean;
    tooltipDisabled: boolean;
    xScaleMin: any;
    xScaleMax: any;
    yScaleMin: number;
    yScaleMax: number;
}
