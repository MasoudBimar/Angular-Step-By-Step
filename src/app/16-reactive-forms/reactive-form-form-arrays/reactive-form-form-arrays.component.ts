
import { Component, OnInit } from '@angular/core';
import { Stock } from './model/stock';
import { CreateFormArrayStockComponent } from './stock/create-stock/create-stock.component';
import { StockFormArrayItemComponent } from './stock/stock-item/stock-item.component';


@Component({
  standalone: true,
  imports: [StockFormArrayItemComponent, CreateFormArrayStockComponent],
  selector: 'app-reactive-form-form-arrays',
  templateUrl: './reactive-form-form-arrays.component.html',
  styleUrls: ['./reactive-form-form-arrays.component.scss']
})
export class ReactiveFormFormArraysComponent implements OnInit {

  title = 'Stock Market App';

  public stock!: Stock;

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(stock: any) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }

}
