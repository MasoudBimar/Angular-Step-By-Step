import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'app-form-array-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateFormArrayStockComponent {

  public stock!: Stock;
  public stockForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      notablePeople: this.fb.array([])
    });
  }

  get notablePeople(): FormArray {
    return this.stockForm.get('notablePeople') as FormArray;
  }

  addNotablePerson() {
    this.notablePeople.push(this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    }))
  }

  removeNotablePerson(index: number) {
    this.notablePeople.removeAt(index);
  }

  resetForm() {
    this.stockForm.reset();
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log('Saving stock', this.stock);
  }
}
