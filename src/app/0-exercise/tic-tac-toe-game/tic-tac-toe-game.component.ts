import { Component, computed, signal } from '@angular/core';

type Player = 'X' | 'O';

interface SelectedCell {
  readonly type: Player | undefined;
  readonly idx: number;
  winnerState?: boolean;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent {
  readonly playerTurn = signal<Player>('X');

  readonly defaultCells: readonly SelectedCell[] = Array.from(
    { length: 9 },
    (_, index) => ({ type: undefined, idx: index + 1 })
  );

  readonly cells = signal<readonly SelectedCell[]>(this.defaultCells);

  readonly winner = computed(() => this.findWinner(this.cells()));

  readonly isDraw = computed(
    () => !this.winner() && this.cells().every(cell => cell.type !== undefined)
  );

  readonly gameOver = computed(() => Boolean(this.winner() || this.isDraw()));

  readonly statusText = computed(() => {
    if (this.winner()) {
      return `${this.winner()} wins`;
    }

    if (this.isDraw()) {
      return 'Draw';
    }

    return `${this.playerTurn()}'s turn`;
  });

  selectCell(idx: number): void {
    const cellIndex = idx - 1;
    const currentTurn = this.playerTurn();
    const targetCell = this.cells()[cellIndex];

    if (!targetCell || targetCell.type || this.gameOver()) {
      return;
    }

    this.cells.update(cells =>
      cells.map(cell =>
        cell.idx === idx ? { ...cell, type: currentTurn } : cell
      )
    );

    if (!this.findWinner(this.cells())) {
      this.playerTurn.set(currentTurn === 'X' ? 'O' : 'X');
    }
  }

  reset(): void {
    this.cells.set(this.defaultCells);
    this.playerTurn.set('X');
  }

  private findWinner(cells: readonly SelectedCell[]): Player | undefined {
    const board = cells.map(cell => cell.type);

    for (const [a, b, c] of WINNING_COMBINATIONS) {
      const first = board[a];
      if (first && first === board[b] && first === board[c]) {
        cells[a].winnerState = true;
        cells[b].winnerState = true;
        cells[c].winnerState = true;
        return first;
      }
    }

    return undefined;
  }
}
