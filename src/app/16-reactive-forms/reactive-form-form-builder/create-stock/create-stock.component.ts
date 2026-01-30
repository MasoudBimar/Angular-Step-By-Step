import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    imports: [ReactiveFormsModule, JsonPipe],
    selector: 'app-reactive-create-stock',
    templateUrl: './create-stock.component.html',
    styleUrls: ['./create-stock.component.scss']
})
export class CreateReactiveStockComponent {
  private fb = inject(FormBuilder);
  public stockForm!: FormGroup;
  constructor() {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    console.log('Stock Form Value', this.stockForm.value);
  }
}
