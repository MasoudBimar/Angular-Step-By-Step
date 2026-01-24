import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  standalone: true,
  imports: [],
  selector: 'app-rate-version2',
  templateUrl: './rate-version2.component.html',
  styleUrls: ['./rate-version2.component.scss']
})
export class RateVersion2Component implements OnInit, OnChanges {
  @Input() stars: number = 10;
  @Input() rate: number = 0;
  @Input() starWidth: number = 32;
  @Output() rateChange = new EventEmitter<number>();
  protected states: number[] = [];
  protected starHovered = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stars'] || this.states.length === 0) {
      this.states = Array.from({ length: this.stars }, (_, i) => i + 1)
    }

  }

  ngOnInit(): void {

    if (this.states.length === 0) {
      this.states = Array.from({ length: this.stars }, (_, i) => i + 1)
    }

  }

  changeHandler(rate: number) {
    this.rate = rate;
    this.rateChange.emit(rate);
  }

  handleHover(rate: number) {
    this.starHovered = rate;

  }

  handleMouseLeave() {
    this.starHovered = 0;
  }




}
