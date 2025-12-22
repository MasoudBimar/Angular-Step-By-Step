import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  constructor() {
    this.stock = new Stock('test', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm: NgForm) {
    if (stockForm.valid) {
      console.log('Creating stock ', this.stock, stockForm.resetForm());
      this.stock = new Stock('', '', 0, 0, '');
    } else {
      console.log('Invalid Form Creating stock ', this.stock);
    }
  }

  resetForm(stockForm: NgForm) {
    stockForm.resetForm();
  }
}
