import { SingleSeries } from "./single-series";
import { BaseChart } from "./base-chart";
import { Column } from "src/app/column";

// tslint:disable-next-line:no-empty-interface
export interface GaugeChart extends BaseChart {
    data: Array<SingleSeries>;
    options: GaugeChartOptions;

}

export interface GaugeChartOptions {
    animations: boolean;
    showLegend: boolean;
    legendTitle: string;
    legendPosition: string;
    colorScheme: Array<string>;
    min: number;
    max: number;
    largeSegments: number;
    smallSegments: number;
    units: string;
    angleSpan: number;
    startAngle: number;
    showAxis: boolean;
    margin: boolean;
    tooltipDisabled: boolean;
    roundDomains: boolean;
    gaugeValue: Column;
}
