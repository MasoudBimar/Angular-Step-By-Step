import { Component } from '@angular/core';
import { RateVersion3Component } from './rate-version3/rate-version3.component';
import { RateVersion2Component } from './rate-version2/rate-version2.component';
import { RateComponent } from './rate/rate.component';

@Component({
  selector: 'app-rate-panel',
  standalone: true,
  imports: [RateVersion3Component, RateVersion2Component, RateComponent],
  templateUrl: './rate-panel.component.html',
  styleUrl: './rate-panel.component.scss'
})
export class RatePanelComponent {
  rateValue: number = 0;
  rangeValue: number = 10;
  rateValues: number[] = [1, 2, 3, 4, 5];

  setRateValue(event: Event) {
    console.log(event);
    this.rateValue = (event.target as HTMLInputElement).valueAsNumber;
  }

  setRangeValue(event: Event) {
    console.log(event);
    this.rangeValue = (event.target as HTMLInputElement).valueAsNumber;
    this.rateValues = new Array(this.rangeValue).fill({});
  }

}
