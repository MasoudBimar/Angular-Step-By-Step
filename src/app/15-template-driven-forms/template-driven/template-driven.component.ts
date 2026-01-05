import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/model/product.model';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent {
  product: Product = new Product();
  categories: { id: string, name: string }[] = [{ id: 'cat1', name: 'category 1' }, { id: 'cat2', name: 'category 2' }, { id: 'cat3', name: 'category 3' }];
  constructor() {

  }

  onSubmit(productForm: NgForm) {
    console.log(productForm, productForm.value);
    if (productForm.valid) {
      console.log('submiot for to serrver', name);
    } else {
      console.log('form is invalid');
    }
  }

  getValidationMessages(productForm: any): string[] {
    return [''];
  }

  reset(productForm: NgForm,) {
    productForm.resetForm();
  }

  preset(productForm: NgForm,) {
    productForm.resetForm({ name: 'default name', price: 0 })
  }

}
