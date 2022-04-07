import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractFormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-formInput',
  template: `<div class="form-group" [formGroup]="formGroup">
  <label for="control" [class]="labelClass" {{label}} </label>
  <input [type]="type" [class]="Name" [formControlName]="controlName"
  [validClass]="controller.valid" [class.invalidClass]="controller.invalid&&controller.touched"
  </div>

  <div *ngif="controller.invalid && controller.touched">
  </div>`
})
export class formInput implements OnInit {

    // Get the values from the input
    @Input() 
    type = new String;
    @Input()
    Name = new String;
    @Input()
    controller = new AbstractControl;
    @Input()
    control = new String;
    @Input()
    formGroup = new AbstractFormGroupDirective;
    @Input()
    label = new String;
    @Input()
    labelClass = new String;

    

  constructor() { }

  ngOnInit(): void {
  }
}
