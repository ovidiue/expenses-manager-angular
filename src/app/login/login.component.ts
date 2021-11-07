import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  isFormFocused = false;

  loading$ = this._authService.getLoadingState();

  usernameCtrl = new FormControl('', Validators.required);
  passwordCtrl = new FormControl('', Validators.required);

  constructor(private readonly _authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
    });
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this._authService.authenticate(username, password);
  }

  register() {
    const { username, password } = this.loginForm.value;
    this._authService.register(username, password);
  }
}
