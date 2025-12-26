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
  categories: string[] = ['cat1', 'cat2', 'cat3'];
  constructor() {

  }

  onSubmit(productForm: NgForm, name: any) {
    // this.getValidationMessages(productForm);
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

}
