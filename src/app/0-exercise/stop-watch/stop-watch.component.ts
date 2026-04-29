import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  signal,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stop-watch',
  imports: [],
  templateUrl: './stop-watch.component.html',
  styleUrl: './stop-watch.component.scss',
})
export class StopWatchComponent implements OnDestroy {
  private intervalId?: ReturnType<typeof setInterval>;
  private startedAt = 0;
  private savedElapsed = 0;

  readonly elapsed = signal(0);
  readonly isRunning = signal(false);
  readonly displayTime = computed(() => this.formatTime(this.elapsed()));

  startOrPause() {
    if (this.isRunning()) {
      this.pause();
      return;
    }

    this.startedAt = Date.now() - this.savedElapsed;
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      const currentElapsed = Date.now() - this.startedAt;
      this.savedElapsed = currentElapsed;
      this.elapsed.set(currentElapsed);
    }, 10);
  }

  stop() {
    this.clearTimer();
    this.savedElapsed = 0;
    this.elapsed.set(0);
    this.isRunning.set(false);
  }

  pause() {
    this.clearTimer();
    this.savedElapsed = this.elapsed();
    this.isRunning.set(false);
  }

  formatTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(centiseconds)}`;
  }

  private pad(value: number) {
    return value.toString().padStart(2, '0');
  }

  private clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
