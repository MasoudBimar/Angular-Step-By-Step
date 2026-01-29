import { Component, EventEmitter, Input, Output } from '@angular/core';


import { Stock } from '../../model/stock';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-form-array-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockFormArrayItemComponent {

  @Input() public stock!: Stock;
  @Output() toggleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toggleFavorite = new EventEmitter<Stock>();
  }

  onToggleFavorite(event: Stock) {
    console.log(event);
    this.toggleFavorite.emit(this.stock);
  }
}
