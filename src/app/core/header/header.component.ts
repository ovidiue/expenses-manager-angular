import { Component } from '@angular/core';

import { routes } from '../../app-routing/app-routing.module';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$ = this._authService.getLoggedInStatus();
  navigationRoutes = routes;

  constructor(private readonly _authService: AuthService) {}

  logout() {
    this._authService.logout();
  }
}
