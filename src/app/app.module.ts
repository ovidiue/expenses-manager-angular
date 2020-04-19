import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CardViewListComponent } from "@components/card-view-list/card-view-list.component";
import { CardViewComponent } from "@components/card-view/card-view.component";
import { ChartComponent } from "@components/chart/chart.component";
import { DialogRatesComponent } from "@components/dialog-rates/dialog-rates.component";
import { ExpenseCardListComponent } from "@components/expense-card-list/expense-card-list.component";
import { ExpenseChartComponent } from "@components/expense-chart/expense-chart.component";
import { HeaderComponent } from "@components/header/header.component";
import { CoreModule } from "@core/core.module";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { SharedModule } from "./modules/shared.module";
import { CategoryModule } from "./views/category/category.module";
import { DashboardModule } from "./views/dashboard/dashboard.module";
import { ExpenseModule } from "./views/expense/expense.module";
import { LoginModule } from "./views/login/login.module";
import { RateModule } from "./views/rate/rate.module";
import { TagModule } from "./views/tag/tag.module";

@NgModule({
  declarations: [
    AppComponent,
    DialogRatesComponent,
    ExpenseCardListComponent,
    CardViewComponent,
    CardViewListComponent,
    ExpenseChartComponent,
    ChartComponent,
    HeaderComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CategoryModule,
    RateModule,
    TagModule,
    ExpenseModule,
    SharedModule,
    DashboardModule,
    LoginModule
  ],
  entryComponents: [DialogRatesComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
