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

  handleSubmit() {
    this.authServe.login(this.loginForm.value).subscribe((res: Handler) => {
      if (res.data.role == 'ADVISOR') {
        this.authRouter.navigate(['/advisor-view']);
      } else if (res.data.role == 'ADMIN') {
        this.authRouter.navigate(['/admin-view']);
      } else {
        this.authRouter.navigate(['/advisee-view']);
      }
    });
  }
}
