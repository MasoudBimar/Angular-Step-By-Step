import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Stock } from '../model/stock';

@Component({
    imports: [],
    selector: 'app-reactive-stock-item',
    templateUrl: './stock-item.component.html',
    styleUrls: ['./stock-item.component.scss']
})
export class StockReactiveItemComponent {

  @Input() public stock!: Stock;
  @Output() toggleFavorite: EventEmitter<Stock>;

  constructor() {
    this.toggleFavorite = new EventEmitter<Stock>();
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.stock);
  }
}
