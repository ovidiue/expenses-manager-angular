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
import {ColorPickerModule, ConfirmDialogModule, MultiSelectModule, ScrollPanelModule, ToolbarModule} from 'primeng/primeng';
import {CategoryDetailComponent} from './category-detail/category-detail.component';
import {ToastModule} from 'primeng/toast';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    RatesComponent,
    CategoriesComponent,
    TagsComponent,
    CategoryDetailComponent,
    TagDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ToolbarModule,
    ScrollPanelModule,
    MultiSelectModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
