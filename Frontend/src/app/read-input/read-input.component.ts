import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractFormGroupDirective, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-read-input',
  templateUrl: './read-input.component.html',
  styleUrls: ['./read-input.component.css']
})
export class ReadInputComponent implements OnInit {

  constructor() { }

  // Read in the input
  @Input()
  form!: AbstractFormGroupDirective;
  @Input()
  type!: string;
  @Input()
  label!: string;
  @Input()
  labelClass!: string;
  @Input()
  class!: string;
  @Input()
  controller!: AbstractControl;
  @Input()
  control!: string;

/*   loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)])
  }); */

   ngOnInit(): void {
/*     this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)])
    }); */
  }

}
