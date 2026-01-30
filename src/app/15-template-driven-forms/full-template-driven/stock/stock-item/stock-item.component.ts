import { Component, Input, Output, EventEmitter } from '@angular/core';


import { Stock } from '../../model/stock';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {

  @Input() public stock!: Stock;
  @Output() toggleFavorite = new EventEmitter<Stock>();

  onToggleFavorite() {
    this.toggleFavorite.emit(this.stock);
  }
}
