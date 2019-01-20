import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {RatesComponent} from './rates/rates.component';
import {CategoriesComponent} from './categories/categories.component';
import {TagsComponent} from './tags/tags.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';

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
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
