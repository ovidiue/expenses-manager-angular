import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn$ = this.authService.getLoggedInStatus();

  constructor(private readonly authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

}
