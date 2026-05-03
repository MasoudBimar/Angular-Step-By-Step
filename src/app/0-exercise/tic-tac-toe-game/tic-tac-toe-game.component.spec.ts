import { beforeEach, describe, expect, it } from 'vitest';
import { TicTacToeGameComponent } from './tic-tac-toe-game.component';

describe('TicTacToeGameComponent', () => {
  let component: TicTacToeGameComponent;

  beforeEach(() => {
    component = new TicTacToeGameComponent();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should alternate turns after a valid move', () => {
    component.selectCell(0);

    expect(component.board()[0]).toBe('X');
    expect(component.playerTurn()).toBe('O');
  });

  it('should not allow selecting an occupied cell', () => {
    component.selectCell(0);
    component.selectCell(0);

    expect(component.board()[0]).toBe('X');
    expect(component.playerTurn()).toBe('O');
  });

  it('should detect a winner and highlight the winning cells', () => {
    component.selectCell(0);
    component.selectCell(3);
    component.selectCell(1);
    component.selectCell(4);
    component.selectCell(2);

    expect(component.winner()).toBe('X');
    expect(component.statusText()).toBe('X wins');
    expect(
      component.cells().filter(cell => cell.isWinningCell).map(cell => cell.id)
    ).toEqual([0, 1, 2]);
  });

  it('should detect a draw', () => {
    [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(cellIndex =>
      component.selectCell(cellIndex)
    );

    expect(component.winner()).toBeUndefined();
    expect(component.isDraw()).toBe(true);
    expect(component.statusText()).toBe('Draw');
  });

  it('should reset the game', () => {
    component.selectCell(0);

    component.reset();

    expect(component.board().every(cell => cell === null)).toBe(true);
    expect(component.playerTurn()).toBe('X');
    expect(component.gameOver()).toBe(false);
  });
});
