import { isNil } from './is-nil.function';

describe('is-nil.function', () => {
  it('should return true if argument is null', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return true if argument is undefined', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false if argument is an object', () => {
    expect(isNil({ name: 'John' })).toBe(false);
  });

  it('should return false if argument is a number', () => {
    expect(isNil(42)).toBe(false);
  });

  it('should return false if argument is a string', () => {
    expect(isNil('Hello, world!')).toBe(false);
  });
});
