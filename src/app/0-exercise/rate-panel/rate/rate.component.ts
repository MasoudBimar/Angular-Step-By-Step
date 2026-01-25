import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  standalone: true,
  imports: [],
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent {

  @Input() stars: number[] = [1, 2, 3, 4, 5];
  @Input('rate') rateValue: number = 0;
  @Output() rateSelected: EventEmitter<number> = new EventEmitter<number>();
  protected hoveredValue: number = 0;

  setRate(star: number) {
    this.rateValue = star;
    this.rateSelected.emit(this.rateValue);
  }

  onMouseEnter(starValue: number) {
    this.hoveredValue = starValue;
  }
  onMouseLeave() {
    this.hoveredValue = 0;
  }



}
