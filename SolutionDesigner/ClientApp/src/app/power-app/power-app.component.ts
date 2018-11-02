import { Component, OnInit, OnDestroy } from "@angular/core";
import { ConnectBridgeDataRequesterService } from "../services/connect-bridge-data-requester.service";

import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import {
  ExecuteResponse,
  ColumnMetaDatum
} from "../service-models/execute-query-response";
import { Column } from "../column";

@Component({
  selector: "app-power-app",
  templateUrl: "./power-app.component.html",
  styleUrls: ["./power-app.component.scss"]
})
export class PowerAppComponent implements OnInit, OnDestroy {
  machineState: boolean;
  coolingUnit: number;
  rotorTemperature: number;
  fanSpeed: number;
  oilPressure: number;
  airPressure: number;
  private _interval: any;
  constructor(private connectBridgeDataRequester: ConnectBridgeDataRequesterService) {}

  /**
   * Initializes a machine.
   */
  ngOnInit() {
    // implement machineState refresh;
    this.connectBridgeDataRequester
      .executeQuery(
        "EXEC SP_READ_SINGLE_NODE_ATTRIBUTE 'ns=2;s=MachineState11', 'Value', '';"
      )
      .subscribe(
        (response: ExecuteResponse) => {
          if (!response.IsSuccess) {
            console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
            return;
          }
          let colMetaData: ColumnMetaDatum;
          response.ColumnMetaData.forEach(
            column =>
              column.ItemName === "Value" || column.ItemName === "value"
                ? (colMetaData = column)
                : false
          );
          this.machineState = response.Row[0][colMetaData.Offset] === "true";
        },
        (error: HttpErrorResponse) => {
          console.log("Error Starting the machine.");
        }
      );
      this.refreshMachineValues();
      this._interval = setInterval(this.refreshMachineValues.bind(this), 5000);
  }

  /**
   * Starts the execution of a machine.
   */
  startMachine() {
    this.connectBridgeDataRequester
      .executeQuery(
        "EXEC SP_METHOD_CALL 'ns=2;s=RoboticArm 11', 'ns=2;s=StartStopMachine11', '[true]';"
      )
      .subscribe(
        (response: ExecuteResponse) => {
          if (!response.IsSuccess) {
            console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
            return;
          }
          this.machineState = true;
        },
        (error: HttpErrorResponse) => {
          console.log("Error stopping the machine.");
        }
      );
    // implement machine start call
  }

  /**
   * Stops the execution of a machine.
   */
  stopMachine() {
    this.connectBridgeDataRequester
      .executeQuery(
        "EXEC SP_METHOD_CALL 'ns=2;s=RoboticArm 11', 'ns=2;s=StartStopMachine11', '[false]';"
      )
      .subscribe(
        (response: ExecuteResponse) => {
          if (!response.IsSuccess) {
            console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
            return;
          }
          this.machineState = false;
        },
        (error: HttpErrorResponse) => {}
      );
    // implement machine stop call
  }

  /**
   * Gets values from the events to update the GUI.
   */
  refreshMachineValues() {
    this.connectBridgeDataRequester.executeQuery("EXEC SP_READ_SINGLE_NODE_ATTRIBUTE 'ns=2;s=CoolingUnit11', 'Value', '';").subscribe(
      (response: ExecuteResponse) => {
        if (!response.IsSuccess) {
          console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
          return;
        }
        let colMetaData: ColumnMetaDatum;
        response.ColumnMetaData.forEach(
          column =>
            column.ItemName === "Value" || column.ItemName === "value"
              ? (colMetaData = column)
              : false
        );
        this.coolingUnit = Number(response.Row[0][colMetaData.Offset]);
      }, (error: HttpErrorResponse) => {
        console.log("Could not get the value from the cooling unit. Error: " + error.message);
      }
    );
    this.connectBridgeDataRequester.executeQuery("EXEC SP_READ_SINGLE_NODE_ATTRIBUTE 'ns=2;s=RotorTemperature11', 'Value', '';").subscribe(
      (response: ExecuteResponse) => {
        if (!response.IsSuccess) {
          console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
          return;
        }
        let colMetaData: ColumnMetaDatum;
        response.ColumnMetaData.forEach(
          column =>
            column.ItemName === "Value" || column.ItemName === "value"
              ? (colMetaData = column)
              : false
        );
        this.rotorTemperature = Number(response.Row[0][colMetaData.Offset]);
      }, (error: HttpErrorResponse) => {
        console.log("Could not get the temperature from the rotor. Error: " + error.message);
      }
    );
    this.connectBridgeDataRequester.executeQuery("EXEC SP_READ_SINGLE_NODE_ATTRIBUTE 'ns=2;s=FanSpeed11', 'Value', '';").subscribe(
      (response: ExecuteResponse) => {
        if (!response.IsSuccess) {
          console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
          return;
        }
        let colMetaData: ColumnMetaDatum;
        response.ColumnMetaData.forEach(
          column =>
            column.ItemName === "Value" || column.ItemName === "value"
              ? (colMetaData = column)
              : false
        );
        this.fanSpeed = Number(response.Row[0][colMetaData.Offset]);
      }, (error: HttpErrorResponse) => {
        console.log("Could not get the speed from the fan. Error: " + error.message);
      }
    );
    this.connectBridgeDataRequester.executeQuery("EXEC SP_READ_SINGLE_NODE_ATTRIBUTE 'ns=2;s=OilPressure11', 'Value', '';").subscribe(
      (response: ExecuteResponse) => {
        if (!response.IsSuccess) {
          console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
          return;
        }
        let colMetaData: ColumnMetaDatum;
        response.ColumnMetaData.forEach(
          column =>
            column.ItemName === "Value" || column.ItemName === "value"
              ? (colMetaData = column)
              : false
        );
        this.oilPressure = Number(response.Row[0][colMetaData.Offset]);
      }, (error: HttpErrorResponse) => {
        console.log("Could not get the oil pressure. Error: " + error.message);
      }
    );
    this.connectBridgeDataRequester.executeQuery("EXEC SP_READ_SINGLE_NODE_ATTRIBUTE 'ns=2;s=AirPressure11', 'Value', '';").subscribe(
      (response: ExecuteResponse) => {
        if (!response.IsSuccess) {
          console.log("It was not possible to fetch data from Connect Bridge. Error: " + response.ErrorMessage);
          return;
        }
        let colMetaData: ColumnMetaDatum;
        response.ColumnMetaData.forEach(
          column =>
            column.ItemName === "Value" || column.ItemName === "value"
              ? (colMetaData = column)
              : false
        );
        this.airPressure = Number(response.Row[0][colMetaData.Offset]);
      }, (error: HttpErrorResponse) => {
        console.log("Could not get the value of the air pressure. Error: " + error.message);
      }
    );
  }

  /**
   *  Clears the event that is associated with the automatic refresh
   *  */
  ngOnDestroy() {
    clearInterval(this._interval);
  }
}
