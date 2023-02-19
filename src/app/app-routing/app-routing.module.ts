import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { MainComponent } from '@core/main/main.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../login/login.module').then((m) => m.LoginModule),
  },
  { path: '', redirectTo: 'home/expenses', pathMatch: 'full' },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'expenses',
        pathMatch: 'full',
      },
      {
        path: 'expenses',
        data: {
          displayName: 'MENUS.EXPENSES',
        },
        loadChildren: () =>
          import('../expense/expense.module').then((m) => m.ExpenseModule),
      },
      {
        path: 'rates',
        data: {
          displayName: 'MENUS.RATES',
        },
        loadChildren: () =>
          import('../rate/rate.module').then((m) => m.RateModule),
      },
      {
        path: 'categories',
        data: {
          displayName: 'MENUS.CATEGORIES',
        },
        loadChildren: () =>
          import('../category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'tags',
        data: {
          displayName: 'MENUS.TAGS',
        },
        loadChildren: () =>
          import('../tag/tag.module').then((m) => m.TagModule),
      },
      {
        path: 'dashboard',
        data: {
          displayName: 'MENUS.DASHBOARD',
        },
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
