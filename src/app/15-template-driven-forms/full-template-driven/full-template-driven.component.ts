
import { Component, OnInit } from '@angular/core';
import { Stock } from './model/stock';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';

@Component({
  standalone: true,
  imports: [StockItemComponent, CreateStockComponent],
  selector: 'app-full-template-driven',
  templateUrl: './full-template-driven.component.html',
  styleUrls: ['./full-template-driven.component.scss']
})
export class FullTemplateDrivenComponent implements OnInit {

  title = 'Stock Market App';

  public stock!: Stock;

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80, 'NYSE');
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }

}
