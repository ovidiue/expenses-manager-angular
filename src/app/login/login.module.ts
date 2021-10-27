import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

import { SharedModule } from '@shared/shared.module';

const loginRoutes: Route[] = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(loginRoutes),
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
