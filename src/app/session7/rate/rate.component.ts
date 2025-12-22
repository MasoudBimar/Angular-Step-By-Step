import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent {

  @Input() stars: number[] = [1, 2, 3, 4, 5];
  @Input() selectedValue!: number;
  @Output() rateSelected: EventEmitter<number> = new EventEmitter<number>();
  hoveredValue: number = -1;

  countStar(star: number) {
    this.selectedValue = star;
    this.rateSelected.emit(this.selectedValue);
  }

}
