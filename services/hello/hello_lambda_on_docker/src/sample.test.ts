import {add} from './test_sample';

describe('sample', () => {
  it('should be 2', () => {
    expect.hasAssertions();
    expect(add(1, 1)).toBe(2);
  });
});
