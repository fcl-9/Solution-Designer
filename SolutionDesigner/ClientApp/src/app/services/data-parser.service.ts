import { Injectable } from "@angular/core";
import { ExecuteResponse } from "../service-models/execute-query-response";
import { Column } from "../column";
import { MultiSeries } from "../configuration-panel/models/multi-series";
import { SingleSeries } from "../configuration-panel/models/single-series";

@Injectable({
  providedIn: "root"
})
export class DataParserService {
  constructor() {}

  multiSeriesPaser(
    result: ExecuteResponse,
    xAxisLabel: Column,
    yAxisLabel: Column
  ): Array<MultiSeries> {
    const parsedData = [{ name: "", series: [] }];
    if (xAxisLabel.type === 14) {
      result.Row.forEach(row =>
        parsedData[0].series.push({
          name: this.convertToDateTime(row[xAxisLabel.offset]),
          value: row[yAxisLabel.offset]
        })
      );
    } else if (yAxisLabel.type === 14) {
      result.Row.forEach(row =>
        parsedData[0].series.push({
          name: row[xAxisLabel.offset],
          value: this.convertToDateTime(row[yAxisLabel.offset])
        })
      );
    } else {
      result.Row.forEach(row =>
        parsedData[0].series.push({
          name: row[xAxisLabel.offset],
          value: row[yAxisLabel.offset]
        })
      );
    }
    return parsedData;
  }

  singleSeriesParser(
    result: ExecuteResponse,
    selectedColumn: Column
  ): Array<SingleSeries> {
    console.log("Column DataType " + selectedColumn.type);
    const singleSeries: Array<SingleSeries> = [];
    // if (selectedColumn.type >= 0 && selectedColumn.type <= 10) {
    result.Row.forEach(row =>
      singleSeries.push({
        name: "",
        value:
          this.checkIfNumber(row[selectedColumn.offset]) === true
            ? Number(row[selectedColumn.offset])
            : row[selectedColumn.offset]
      })
    );
    return singleSeries;
  }

  private convertToDateTime(row): Date {
    return new Date(
      row["Year"],
      row["Month"],
      row["Day"],
      row["Hour"],
      row["Minute"],
      row["Second"]
    );
  }

  private checkIfNumber(value: any): boolean {
    const parsedNumber = Number(value);
    return isNaN(parsedNumber);
  }
}
