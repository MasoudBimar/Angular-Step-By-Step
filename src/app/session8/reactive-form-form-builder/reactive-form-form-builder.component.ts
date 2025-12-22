import { Component, OnInit } from '@angular/core';
import { Stock } from './model/stock';

@Component({
  selector: 'app-reactive-form-form-builder',
  templateUrl: './reactive-form-form-builder.component.html',
  styleUrls: ['./reactive-form-form-builder.component.scss']
})
export class ReactiveFormFormBuilderComponent implements OnInit {
  title = 'Stock Market App';

  public stock!: Stock;

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }

}
