export interface ChartGroup {
  name: string;
  charts: Chart[];
}

export interface Chart {
  name: string;
  selector: string;
  inputFormat: string;
  options: string[];
  defaults?: Defaults;
}

export interface Defaults {
  yAxisLabel?: string;
  xAxisLabel?: string;
  linearScale?: boolean;
  cAxisLabel?: string;
  width?: number;
  height?: number;
}
