import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  QUEmail: string = '';
  password: string = '';
  isRealEmail: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  checkIfString(event: any, type: string) {
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
  }
}
