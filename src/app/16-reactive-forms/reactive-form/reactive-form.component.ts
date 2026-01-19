import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  name: FormControl = new FormControl('');
  category: FormControl = new FormControl('');
  price: FormControl = new FormControl('');


  public stockForm: FormGroup = new FormGroup({
    name: new FormControl(null, { nonNullable: true, validators: [Validators.required] }),
    code: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.stockForm);
  }

}
