import { Injectable } from "@angular/core";
import { TextDashboardItem } from "../dashboard-item";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DashboardComponentStorageService {

  private apiUrl = "https://localhost:5001/dashboard/component/";

  constructor(private http: HttpClient) {}

  /**
   * Stores a new item that was created in the dashboard.
   * @param payload the items to be inserted
   */
  insertItem(payload): Observable<TextDashboardItem> {
    return this.http.post<TextDashboardItem>(this.apiUrl, payload);
  }

  /**
   * Selects one of the dashboard items that exists in the dashboard.
   * @param payload the item to be selected
   */
  selectItem(payload): Observable<TextDashboardItem> {
    return this.http.get<TextDashboardItem>(this.apiUrl + payload.id);
  }

  /**
   * Gets all existing dashboard items stored in the database.
   */
  selectAll(): Observable<Array<TextDashboardItem>> {
    return this.http.get<Array<TextDashboardItem>>(this.apiUrl);
  }

  /***
   * Updates the state of an item on the database.
   * @param payload the item to be updated
   */
  updateItem(payload): Observable<TextDashboardItem> {
    return this.http.put<TextDashboardItem>(
      this.apiUrl + payload.id,
      payload
    );
  }

  /**
   * Deletes an item that was stored in the database.
   * @param payload the item to be deleted
   */
  deleteItem(payload): Observable<TextDashboardItem> {
    return this.http.delete<TextDashboardItem>(this.apiUrl + payload.id);
  }
}
