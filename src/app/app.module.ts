import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogRatesComponent } from '@components/dialog-rates/dialog-rates.component';
import { PrimengModule } from './modules/primeng.module';
import { CategoriesComponent } from './views/categories/categories.component';
import { ExpensesComponent } from './views/expenses/expenses.component';
import { RatesComponent } from './views/rates/rates.component';
import { TagsComponent } from './views/tags/tags.component';
import { CategoryDetailComponent } from './views/category-detail/category-detail.component';
import { TagDetailComponent } from './views/tag-detail/tag-detail.component';
import { ExpenseDetailComponent } from './views/expense-detail/expense-detail.component';
import { RateDetailComponent } from './views/rate-detail/rate-detail.component';
import { GlobalMessageComponent } from '@components/global-message/global-message.component';
import { PageSpinnerComponent } from '@components/page-spinner/page-spinner.component';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { ExpenseFilterComponent } from '@components/expense-filter/expense-filter.component';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    DialogRatesComponent,
    ExpenseDetailComponent,
    ExpensesComponent,
    GlobalMessageComponent,
    PageSpinnerComponent,
    RateDetailComponent,
    RatesComponent,
    TagDetailComponent,
    TagsComponent,
    ExpenseFilterComponent,
    ShortFilterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,
    ProgressSpinnerModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogRatesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
