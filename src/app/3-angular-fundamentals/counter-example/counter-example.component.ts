import { Component } from '@angular/core';


@Component({
  standalone: true,
  imports: [],
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

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.counter++;
    } else if (event.key === 'ArrowDown') {
      this.counter--;
    }
  }
}
