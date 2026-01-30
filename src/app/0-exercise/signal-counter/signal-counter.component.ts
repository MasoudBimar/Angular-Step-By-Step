import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-counter',
  standalone: true,
  imports: [],
  templateUrl: './signal-counter.component.html',
  styleUrl: './signal-counter.component.scss',
})
export class SignalCounterComponent {
  counter = signal<number>(0);

  updateCounter(direction: 'up' | 'down') {
    if (direction === 'up') {
      this.counter.update((value: number) => value + 1);
    } else {
      this.counter.update((value: number) => value - 1);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.updateCounter('up');
    } else if (event.key === 'ArrowDown') {
      this.updateCounter('down');
    }
  }
}
