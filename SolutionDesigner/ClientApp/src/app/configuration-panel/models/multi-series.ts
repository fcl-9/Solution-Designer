import { SingleSeries } from "./single-series";

export interface MultiSeries {
    name: string;
    series: Array<SingleSeries>;
}
