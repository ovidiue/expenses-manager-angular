import { Component } from '@angular/core';
import { LoginService } from '../../views/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn$ = this.authService.getLoggedInStatus();

  constructor(private readonly authService: LoginService) {
  }

  logout() {
    this.authService.logout();
  }

}
