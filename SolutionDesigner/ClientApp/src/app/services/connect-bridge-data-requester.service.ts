import { Injectable, HostListener } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CreateConnectionResponse } from "../service-models/create-connection-response";
import { ExecuteResponse } from "../service-models/execute-query-response";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ConnectBridgeDataRequesterService {
  private _username = "Administrator";
  private _password = "123456";
  private _accountName = "OPC_UA_DEMO_SERVER";

  private _sqlId: string;
  private _tryingToOpen = false;

  constructor(private http: HttpClient) {
    this.openConnection();
  }

  /**
   * Opens a new connection with connect bridge.
   * @param username The username that is required by connect bridge to open the connection
   * @param password The password that is associated with the password.
   * @param accountName The account to which the informations about the target system are associated in Connect Bridge
   */
  public openConnection(): void {
    const url =
      "https://localhost:4433/WsDriver/rest/CreateConnection?format=json";

    const body = {
      username: this._username,
      password: this._password,
      accountname: this._accountName,
      properties: null
    };
    this._tryingToOpen = true;
    this.http.post<CreateConnectionResponse>(url, body).subscribe(
      (resturnedValue: CreateConnectionResponse) => {
        this._sqlId = resturnedValue.sql; // Sets the identifier for the opened session
      },
      (error: HttpErrorResponse) => {
        console.log(
          "Unable to open the session with connect bridge. Error: " +
            error.message
        );
      }
    );
  }

  /**
   * Executes a query for the session that was open
   * @param _sqlId The identifier of the session in which the query will be executed
   * @param query The query to be executed
   */
  public executeQuery(query: string): Observable<ExecuteResponse> {
    if (this._sqlId === undefined && this._tryingToOpen === false) {
      this.openConnection();
    }
    const url = "https://localhost:4433/WsDriver/rest/Execute?format=json";
    const body = {
      connection: { sql: this._sqlId },
      command: {
        SqlStatement: query,
        Parameters: null
      }
    };
    return this.http.post<ExecuteResponse>(url, body);
  }

  /**
   * Closes a Connection with Connect Bridge
   * @param _sqlId The identifier of the sesison to be closed.
   */
  @HostListener("window:beforeunload", ["$event"])
  private closeQuery(): void {
    const url =
      "https://localhost:4433/WsDriver/rest/CloseConnection?format=json";
    const body = {
      connection: { sql: this._sqlId }
    };

    // Sync Request
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body));
  }
}
