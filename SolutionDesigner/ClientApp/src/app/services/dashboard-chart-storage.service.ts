import { Injectable } from "@angular/core";
import { ChartDashboardItem } from "../dashboard-item";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardChartStorageService {

  private apiUrl = "https://localhost:5001/dashboard/chart/";

  constructor(private http: HttpClient) {}

  /**
   * Stores a new item that was created in the dashboard.
   * @param payload the items to be inserted
   */
  insertItem(payload): Observable<ChartDashboardItem> {
    return this.http.post<ChartDashboardItem>(this.apiUrl, payload);
  }

  /**
   * Selects one of the dashboard items that exists in the dashboard.
   * @param payload the item to be selected
   */
  selectItem(payload): Observable<ChartDashboardItem> {
    return this.http.get<ChartDashboardItem>(this.apiUrl + payload.id);
  }

  /**
   * Gets all existing dashboard items stored in the database.
   */
  selectAll(): Observable<Array<ChartDashboardItem>> {
    return this.http.get<Array<ChartDashboardItem>>(this.apiUrl);
  }

  /***
   * Updates the state of an item on the database.
   * @param payload the item to be updated
   */
  updateItem(payload): Observable<ChartDashboardItem> {
    return this.http.put<ChartDashboardItem>(
      this.apiUrl + payload.id,
      payload
    );
  }

  /**
   * Deletes an item that was stored in the database.
   * @param payload the item to be deleted
   */
  deleteItem(payload): Observable<ChartDashboardItem> {
    return this.http.delete<ChartDashboardItem>(this.apiUrl + payload.id);
  }
}
