import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogRatesComponent} from './components/dialog-rates/dialog-rates.component';
import {PrimengModule} from './modules/primeng.module';
import {CategoriesComponent} from './views/categories/categories.component';
import {ExpensesComponent} from './views/expenses/expenses.component';
import {RatesComponent} from './views/rates/rates.component';
import {TagsComponent} from './views/tags/tags.component';
import {CategoryDetailComponent} from './views/category-detail/category-detail.component';
import {TagDetailComponent} from './views/tag-detail/tag-detail.component';
import {ExpenseDetailComponent} from './views/expense-detail/expense-detail.component';
import {RateDetailComponent} from './views/rate-detail/rate-detail.component';
import {GlobalMessageComponent} from './global-message/global-message.component';
import {TagDetailEditComponent} from "./views/tag-detail/tag-detail-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ExpensesComponent,
    RatesComponent,
    TagsComponent,
    CategoryDetailComponent,
    TagDetailComponent,
    TagDetailEditComponent,
    ExpenseDetailComponent,
    RateDetailComponent,
    GlobalMessageComponent,
    DialogRatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  entryComponents: [DialogRatesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
