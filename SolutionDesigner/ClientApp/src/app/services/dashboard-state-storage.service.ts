import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DashboardItem } from "../dashboard-item";

@Injectable({
  providedIn: "root"
})
export class DashboardStateStorageService {
  private apiUrl = "https://localhost:5001/dashboard/item/";

  constructor(private http: HttpClient) {}

  /**
   * Stores a new item that was created in the dashboard.
   * @param payload the items to be inserted
   */
  insertItem(payload): Observable<DashboardItem> {
    return this.http.post<DashboardItem>(this.apiUrl, payload);
  }

  /**
   * Selects one of the dashboard items that exists in the dashboard.
   * @param payload the item to be selected
   */
  selectItem(payload) {
    return this.http.get<DashboardItem>(this.apiUrl + payload.id);
  }

  /**
   * Gets all existing dashboard items stored in the database.
   */
  selectAll(): Observable<Array<DashboardItem>> {
    return this.http.get<Array<DashboardItem>>(this.apiUrl);
  }

  /***
   * Updates the state of an item on the database.
   * @param payload the item to be updated
   */
  updateItem(payload): Observable<DashboardItem> {
    return this.http.put<DashboardItem>(
      this.apiUrl + payload.id,
      payload
    );
  }

  /**
   * Deletes an item that was stored in the database.
   * @param payload the item to be deleted
   */
  deleteItem(payload): Observable<DashboardItem> {
    return this.http.delete<DashboardItem>(this.apiUrl + payload.id);
  }
}
