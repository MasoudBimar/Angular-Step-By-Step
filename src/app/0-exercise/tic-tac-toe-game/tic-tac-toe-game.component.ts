import { Component, computed, signal } from '@angular/core';

type Player = 'X' | 'O';
type CellValue = Player | null;

interface BoardCell {
  readonly id: number;
  readonly label: number;
  readonly value: CellValue;
  readonly isWinningCell: boolean;
}

interface GameResult {
  readonly winner: Player;
  readonly line: readonly number[];
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

const BOARD_SIZE = 9;
const EMPTY_BOARD: readonly CellValue[] = Array.from(
  { length: BOARD_SIZE },
  () => null
);

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent {
  readonly playerTurn = signal<Player>('X');

  readonly board = signal<readonly CellValue[]>(EMPTY_BOARD);

  readonly winnerResult = computed(() => this.findWinner(this.board()));

  readonly winner = computed(() => this.winnerResult()?.winner);

  readonly winningCells = computed(
    () => new Set(this.winnerResult()?.line ?? [])
  );

  readonly cells = computed<readonly BoardCell[]>(() => {
    const winningCells = this.winningCells();

    return this.board().map((value, index) => ({
      id: index,
      label: index + 1,
      value,
      isWinningCell: winningCells.has(index),
    }));
  });

  readonly isDraw = computed(
    () => !this.winner() && this.board().every(Boolean)
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

  selectCell(cellIndex: number): void {
    const currentTurn = this.playerTurn();
    const targetCell = this.board()[cellIndex];

    if (targetCell !== null || this.gameOver()) {
      return;
    }

    const nextBoard = this.board().map((cell, index) =>
      index === cellIndex ? currentTurn : cell
    );

    this.board.set(nextBoard);

    if (!this.findWinner(nextBoard)) {
      this.playerTurn.set(currentTurn === 'X' ? 'O' : 'X');
    }
  }

  reset(): void {
    this.board.set(EMPTY_BOARD);
    this.playerTurn.set('X');
  }

  private findWinner(board: readonly CellValue[]): GameResult | undefined {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      const first = board[a];
      if (first && first === board[b] && first === board[c]) {
        return { winner: first, line: [a, b, c] };
      }
    }

    return undefined;
  }
}
