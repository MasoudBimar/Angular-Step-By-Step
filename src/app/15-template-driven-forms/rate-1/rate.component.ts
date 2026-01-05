import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-sample',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateSampleComponent implements OnInit {
  @Input() stars: number = 5;
  @Input() rate: number = 0;
  @Input() starWidth: number = 25;
  @Output() rateChange = new EventEmitter<number>();
  public states: any[] = new Array(this.stars).fill({});
  constructor() {
  }

  ngOnInit(): void {
    this.states = new Array(this.stars).fill({});
  }
  setRate(rate: number) {
    this.rate = rate;
    for (let i = 0; i < this.stars; i++) {
      this.states[i] = { hover: false, select: i < this.rate };
    }
  }
  changeHandler(rate: number) {
    this.setRate(rate);
    this.rateChange.emit(rate);
  }
  handleHover(rate: number) {
    for (let i = 0; i < this.stars; i++) {
      let state = i <= rate;
      if (this.states[i].hover !== state) this.states[i] = { hover: state, select: this.states[i].select };
    }

  }
  handleLeave() {
    this.setRate(this.rate);
  }


}
