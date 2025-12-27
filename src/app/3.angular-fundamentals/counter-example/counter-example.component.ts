import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-example',
  templateUrl: './counter-example.component.html',
  styleUrls: ['./counter-example.component.scss']
})
export class CounterExampleComponent {
  counter: number = 0;

  // increment() {
  //   this.counter++;
  // }

  // decrement() {
  //   this.counter--;
  // }

  updateCounter(direction: 'up' | 'down') {
    // if (direction === 'up') {
    //   this.counter++;
    // } else if (direction === 'down') {
    //   this.counter--;
    // }

    direction === 'up' ? this.counter++ : this.counter--;
  }
}
