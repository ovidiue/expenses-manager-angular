import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogRatesComponent } from '@components/dialog-rates/dialog-rates.component';
import { ExpensesComponent } from './views/expenses/expenses.component';
import { ExpenseDetailComponent } from './views/expense-detail/expense-detail.component';
import { GlobalMessageComponent } from '@components/global-message/global-message.component';
import { ExpenseFilterComponent } from '@components/expense-filter/expense-filter.component';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';
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

@NgModule({
  declarations: [
    AppComponent,
    DialogRatesComponent,
    ExpenseDetailComponent,
    ExpensesComponent,
    GlobalMessageComponent,
    ExpenseFilterComponent,
    ShortFilterComponent,
    DashboardComponent,
    ExpenseCardListComponent,
    CardViewComponent,
    CardViewListComponent,
    ExpenseChartComponent,
    ChartComponent,
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
    SharedModule
  ],
  entryComponents: [DialogRatesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
