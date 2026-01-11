import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-version2',
  templateUrl: './rate-version2.component.html',
  styleUrls: ['./rate-version2.component.scss']
})
export class RateVersion2Component implements OnInit {
  @Input() stars: number = 10;
  @Input() rate: number = 0;
  @Input() starWidth: number = 25;
  @Output() rateChange = new EventEmitter<number>();
  public states: any[] = new Array(this.stars).fill({});
  constructor() {
    this.states = new Array(this.stars).fill({});
  }

  ngOnInit(): void {
    if (this.rate) {
      this.setRate(this.rate);
    }
  }

  setRate(rate: number) {

    for (let i = 0; i < this.stars; i++) {
      this.states[i] = { hover: false, select: i < this.rate };
    }
  }

  changeHandler(rate: number) {
    this.rate = rate;
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
