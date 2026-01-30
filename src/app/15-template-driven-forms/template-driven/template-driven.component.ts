
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Product } from 'src/app/shared/model/product.model';

@Component({
    imports: [FormsModule],
    selector: 'app-template-driven-form',
    templateUrl: './template-driven.component.html',
    styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent {
  product: Product = new Product();
  categories: { id: string, name: string }[] = [{ id: 'cat1', name: 'category 1' }, { id: 'cat2', name: 'category 2' }, { id: 'cat3', name: 'category 3' }];

  onSubmit(productForm: NgForm) {
    console.log(productForm, productForm.value);
    if (productForm.valid) {
      console.log('submit form to server', productForm.value.name);
    } else {
      console.log('form is invalid');
    }
  }

  getValidationMessages(productForm: NgModel): string[] {
    return Object.keys(productForm.control);
  }

  reset(productForm: NgForm) {
    productForm.resetForm();
  }

  preset(productForm: NgForm) {
    productForm.resetForm({ name: 'default name', price: 0 });
  }

}
