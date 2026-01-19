
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MassAttrDirective } from '../directives/attr.directive';
import { MassModel } from '../directives/two-way.directive';
import { ProductFormGroup } from './model/form.model';
import { Product } from './model/product.model';
import { Model } from './model/repository.model';

@Component({
  standalone: true,
  imports: [FormsModule, MassModel, MassAttrDirective],
  selector: 'app-product-sample',
  templateUrl: './product-sample.component.html',
  styleUrls: ['./product-sample.component.scss']
})
export class ProductSampleComponent implements OnInit {
  model: Model = new Model();
  constructor() { }

  ngOnInit(): void {
  }

  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return [...this.model.getProducts()];
  }

  newProduct: Product = new Product();

  addProduct(p: Product) {
    this.model.saveProduct(p);
  }

  submitForm() {
    this.addProduct(this.newProduct);
  }

}
