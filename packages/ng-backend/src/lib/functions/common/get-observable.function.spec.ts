import { isObservable, of } from 'rxjs';
import { isPromise } from '../type-guards/is-promise.function';
import { getObservable } from './get-observable.function';

describe('get-observable.function', () => {
  it('should return an observable when given an observable', () => {
    const observable = of('test');

    const result = getObservable(observable);

    expect(isObservable(result)).toBe(true);
    expect(result).toBe(observable);
  });

  it('should return an observable when given a promise', () => {
    const promise = Promise.resolve('test');

    const result = getObservable(promise);

    expect(isObservable(result)).toBe(true);
    expect(isPromise(result)).toBe(false);
  });

  it('should return an observable when given a value', () => {
    const value = 'test';

    const result = getObservable(value);

    expect(isObservable(result)).toBe(true);
    expect(isPromise(result)).toBe(false);
  });

  it('should handle null or undefined values correctly', () => {
    [undefined, null].map(getObservable).forEach((result) => {
      expect(isObservable(result)).toBe(true);
      expect(isPromise(result)).toBe(false);
    });
  });
});
