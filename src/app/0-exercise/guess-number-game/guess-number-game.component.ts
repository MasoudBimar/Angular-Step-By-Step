import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-guess-number-game',
  imports: [],
  templateUrl: './guess-number-game.component.html',
  styleUrl: './guess-number-game.component.scss',
})
export class GuessNumberGameComponent {
  private readonly maxAttempts = 10;
  private answer = this.createAnswer();

  readonly attemptsLeft = signal(this.maxAttempts);
  readonly lastGuess = signal<number | null>(null);
  readonly message = signal('Make your first guess.');
  readonly hasWon = signal(false);
  readonly isGameOver = computed(() => this.hasWon() || this.attemptsLeft() < 1);

  submit(value: string) {
    if (!value.trim()) {
      this.message.set('Enter a whole number from 0 to 100.');
      return;
    }

    const guess = Number(value);

    if (!Number.isInteger(guess) || guess < 0 || guess > 100) {
      this.message.set('Enter a whole number from 0 to 100.');
      return;
    }

    if (this.isGameOver()) {
      return;
    }

    this.lastGuess.set(guess);
    this.attemptsLeft.update(attempts => attempts - 1);

    if (guess === this.answer) {
      this.hasWon.set(true);
      this.message.set('Correct. You found the hidden number.');
      return;
    }

    if (this.attemptsLeft() === 0) {
      this.message.set(`Game over. The number was ${this.answer}.`);
      return;
    }

    this.message.set(
      guess < this.answer
        ? 'Too low. Try a higher number.'
        : 'Too high. Try a lower number.'
    );
  }

  reset(input: HTMLInputElement) {
    this.answer = this.createAnswer();
    this.attemptsLeft.set(this.maxAttempts);
    this.lastGuess.set(null);
    this.message.set('Make your first guess.');
    this.hasWon.set(false);
    input.value = '';
    input.focus();
  }

  private createAnswer() {
    return Math.floor(Math.random() * 101);
  }
}
