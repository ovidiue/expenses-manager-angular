import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {RatesComponent} from './rates/rates.component';
import {CategoriesComponent} from './categories/categories.component';
import {TagsComponent} from './tags/tags.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    RatesComponent,
    CategoriesComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
