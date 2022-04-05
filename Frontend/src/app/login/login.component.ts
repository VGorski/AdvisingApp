import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Handler } from '../interface/handler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  QUEmail: string = '';
  password: string = '';
  isRealEmail: boolean = true;

  constructor(private authServe: AuthenticationService, private authRouter: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  handleSubmit() {
    this.authServe.login(this.loginForm.value).subscribe((res: Handler) => {
    this.authRouter.navigate(['/advisee-view']);
 
  });
    

  };



  /* checkIfString(event: any, type: string) {
    if (type === 'QUEmail') {
      this.QUEmail = event.target.value;
    } else if (type === 'password') {
      this.password = event.target.value;
    }
  }

  validateEmail(): void {
    var checkSymbols = RegExp(/@/);
    if (checkSymbols.test(this.QUEmail)) {
      this.isRealEmail = true;
    } else {
      this.isRealEmail = false;
    }
  } */
}
