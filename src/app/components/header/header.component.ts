import { Component } from '@angular/core';
import { AuthService } from '@core/services';

import { routes } from '../../app-routing/app-routing.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn$ = this.authService.getLoggedInStatus();
  navigationRoutes = routes;

  constructor(private readonly authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

}
