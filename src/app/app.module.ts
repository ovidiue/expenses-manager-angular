import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogRatesComponent } from '@components/dialog-rates/dialog-rates.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ExpenseCardListComponent } from '@components/expense-card-list/expense-card-list.component';
import { CardViewComponent } from '@components/card-view/card-view.component';
import { CardViewListComponent } from '@components/card-view-list/card-view-list.component';
import { ExpenseChartComponent } from '@components/expense-chart/expense-chart.component';
import { ChartComponent } from '@components/chart/chart.component';
import { CategoryModule } from './views/category/category.module';
import { SharedModule } from './modules/shared.module';
import { RateModule } from './views/rate/rate.module';
import { TagModule } from './views/tag/tag.module';
import { ExpenseModule } from './views/expense/expense.module';
import { LoginComponent } from './views/login/login.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HeaderComponent } from '@components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogRatesComponent,
    DashboardComponent,
    ExpenseCardListComponent,
    CardViewComponent,
    CardViewListComponent,
    ExpenseChartComponent,
    ChartComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
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
    SharedModule
  ],
  entryComponents: [DialogRatesComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
