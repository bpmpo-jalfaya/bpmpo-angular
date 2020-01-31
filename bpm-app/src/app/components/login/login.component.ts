import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.user = {
      username: this.f.username.value, password: this.f.password.value, roles: []
    };

    this.authService.login(this.user );

    this.router.navigate(['/home']);

  }

}
