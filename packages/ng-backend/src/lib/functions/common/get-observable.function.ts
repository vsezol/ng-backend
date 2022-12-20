import { from, isObservable, Observable, of } from 'rxjs';
import { isPromise } from './is-promise.function';

export const getObservable = <T>(
  data: Observable<T> | Promise<T> | T
): Observable<T> => {
  if (isObservable(data)) {
    return data;
  }

  if (isPromise(data)) {
    return from(data);
  }

  return of(data);
};
