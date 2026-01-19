import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule, JsonPipe],
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent {

  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  public stockPrice = 0;
  public previousStockPrice = 0;

  setStockPriceChange(price: number) {
    this.previousStockPrice = this.stockPrice;
    this.stockPrice = price;
  }

  createStock(stockForm: NgForm) {
    if (stockForm.valid) {
      console.log('Creating stock ', stockForm.value);
      this.resetForm(stockForm);
    } else {
      console.log('Invalid Form Creating stock ', stockForm.value, stockForm.valid);
    }
  }

  resetForm(stockForm: NgForm) {
    stockForm.resetForm();
  }
}
