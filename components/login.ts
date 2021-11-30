import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: './public/pages/login.html',
    styleUrls: ['./public/stylesheets/login.scss']
})

export class loginComponent implements OnInit {
    QUEmail: string = '';
    password: string = '';
    checkEmail: boolean = true;

    constructor() { };

    ngOnInit(): void { };

    checkIfString(event: any, type: string) {
        if (type === 'QUEmail') {
            this.QUEmail = event.target.value;
            this.validateEmail();
        } else if (type === 'password') {
            this.password = event.target.value;
        }
    }

    validateEmail(): void {
        const structure = RegExp(/@/);
        if (structure.test(this.QUEmail)) {
            this.checkEmail = true;
        } else {
            this.checkEmail = false;
        }
    }

}