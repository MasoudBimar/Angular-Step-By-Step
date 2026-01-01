import { LetterCountPipe } from './letter-count.pipe';

describe('LetterCountPipe', () => {
  it('create an instance', () => {
    const pipe = new LetterCountPipe();
    expect(pipe).toBeTruthy();
  });
});
