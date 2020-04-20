import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExpenseModule } from './expense/expense.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginModule } from './login/login.module';
import { RateModule } from './rate/rate.module';
import { TagModule } from './tag/tag.module';

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
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
