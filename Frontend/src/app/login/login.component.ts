// Authors: Timothy Carta and Victoria Gorski

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Handler } from '../interface/handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  QUEmail: string = '';
  password: string = '';
  isRealEmail: boolean = true;

  constructor(
    private authServe: AuthenticationService,
    private authRouter: Router
  ) {}

  ngOnInit(): void {}

  // Create login form 
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(14),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  // Log in user and redirect them to the correct dashboard
  handleSubmit() {
    this.authServe.login(this.loginForm.value).subscribe((res: Handler) => {
      // If the user has the advisor role, bring them to the advisor dashboard
      if (res.data.role == 'ADVISOR') {
        this.authRouter.navigate(['/advisor-view']);
        // If the user has the admin role, bring them to the admin dashboard
      } else if (res.data.role == 'ADMIN') {
        this.authRouter.navigate(['/admin-view']);
      } else {
        // Bring the user to the advisee dashboard if not an advisor or admin
        this.authRouter.navigate(['/advisee-view']);
      }
    });
  }
}
