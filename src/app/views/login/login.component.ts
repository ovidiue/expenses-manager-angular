import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  isFormFocused = false;

  loading$ = this.service.getLoadingState();

  constructor(private readonly service: LoginService) {
  }

  get password() {
    return this.loginForm.get('password');
  }

  get username() {
    return this.loginForm.get('username');
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const {username, password} = this.loginForm.value;
    this.service.authenticate(username, password);
  }

  register() {
    const {username, password} = this.loginForm.value;
    this.service.register(username, password);
  }
}
