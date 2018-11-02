import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppDashboardItem } from "../dashboard-item";

@Injectable({
  providedIn: "root"
})
export class DashboardAppStorageService {
  private apiUrl = "https://localhost:5001/dashboard/app/";

  constructor(private http: HttpClient) {}

  /**
   * Stores a new item that was created in the dashboard.
   * @param payload the items to be inserted
   */
  insertItem(payload): Observable<AppDashboardItem> {
    return this.http.post<AppDashboardItem>(this.apiUrl, payload);
  }

  /**
   * Selects one of the dashboard items that exists in the dashboard.
   * @param payload the item to be selected
   */
  selectItem(payload): Observable<AppDashboardItem> {
    return this.http.get<AppDashboardItem>(this.apiUrl + payload.id);
  }

  /**
   * Gets all existing dashboard items stored in the database.
   */
  selectAll(): Observable<Array<AppDashboardItem>> {
    return this.http.get<Array<AppDashboardItem>>(this.apiUrl);
  }

  /***
   * Updates the state of an item on the database.
   * @param payload the item to be updated
   */
  updateItem(payload): Observable<AppDashboardItem> {
    return this.http.put<AppDashboardItem>(
      this.apiUrl + payload.id,
      payload
    );
  }

  /**
   * Deletes an item that was stored in the database.
   * @param payload the item to be deleted
   */
  deleteItem(payload): Observable<AppDashboardItem> {
    return this.http.delete<AppDashboardItem>(
      this.apiUrl + payload.id
    );
  }
}
