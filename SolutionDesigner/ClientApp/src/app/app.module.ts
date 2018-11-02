import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConnectBridgeDataRequesterService } from "./services/connect-bridge-data-requester.service";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule, LineChartComponent } from "@swimlane/ngx-charts";
// import { LineChartComponent } from "./line-chart/line-chart.component";
import { GridsterModule } from "angular-gridster2";
// import { GaugeComponent } from "./gauge/gauge.component";
import { ConfigurationPanelComponent } from "./configuration-panel/configuration-panel.component";
import { FormsModule } from "@angular/forms";
import { PowerAppComponent } from "./power-app/power-app.component";
// import { NgxUIModule } from "@swimlane/ngx-ui";

@NgModule({
  declarations: [AppComponent, ConfigurationPanelComponent, PowerAppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    GridsterModule,
    FormsModule
  ],
  providers: [ConnectBridgeDataRequesterService],
  bootstrap: [AppComponent],
  entryComponents: [LineChartComponent]
})
export class AppModule {}
