import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Stock } from '../model/stock';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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


