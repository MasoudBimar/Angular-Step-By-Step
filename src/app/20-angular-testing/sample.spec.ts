import { sum } from "./sample";

describe('gettingSum', () => {
  it('should retuns the sum of two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  })
});
