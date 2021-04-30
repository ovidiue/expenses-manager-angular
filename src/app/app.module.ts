import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExpenseModule } from './expense/expense.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginModule } from './login/login.module';
import { RateModule } from './rate/rate.module';
import { appCloseIcon } from './svg/close';
import { appDeleteIcon } from './svg/delete';
import { appEditIcon } from './svg/edit';
import { TagModule } from './tag/tag.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';

import { CoreModule } from '@core/core.module';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    CategoryModule,
    RateModule,
    TagModule,
    ExpenseModule,
    DashboardModule,
    LoginModule,
    SvgIconsModule.forRoot({
      icons: [appCloseIcon, appDeleteIcon, appEditIcon],
    }),
    HttpClientModule,
    TranslocoRootModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
