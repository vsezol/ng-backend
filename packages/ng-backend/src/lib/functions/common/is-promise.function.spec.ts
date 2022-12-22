import { isPromise } from './is-promise.function';

describe('is-promise.function', () => {
  it('should return true for a promise', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
  });

  it('should return false for a non-promise object', () => {
    expect(isPromise({})).toBe(false);
  });

  it('should return false for a null value', () => {
    expect(isPromise(null)).toBe(false);
  });

  it('should return false for a primitive value', () => {
    ['foo', 123, true].forEach((value) => {
      expect(isPromise(value)).toBe(false);
    });
  });
});
