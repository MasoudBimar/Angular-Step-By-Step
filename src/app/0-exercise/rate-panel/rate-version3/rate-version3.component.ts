import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
@Component({
  standalone: true,
  imports: [],
  selector: 'app-rate-version3',
  templateUrl: './rate-version3.component.html',
  styleUrls: ['./rate-version3.component.scss']
})

export class RateVersion3Component {

  @Input() rateNumber: number = 0;
  @Input() arr: number[] = [1, 2, 3, 4, 5];
  @Output() rateSelected: EventEmitter<number> = new EventEmitter<number>();
  hoverTo: number = -1;

  handleClick = (number: number) => { this.rateNumber = number; this.rateSelected.emit(this.rateNumber) }

  handleHover = (number: number) => { this.hoverTo = number; }

  handleLeave = () => { this.hoverTo = -1 }

}
