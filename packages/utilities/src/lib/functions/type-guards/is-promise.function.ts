import { hasProperty } from './has-property.function';

export function isPromise(data: unknown): data is Promise<unknown> {
  return (
    data !== null &&
    typeof data === 'object' &&
    hasProperty(data, 'then') &&
    typeof data.then === 'function' &&
    hasProperty(data, 'catch') &&
    typeof data.catch === 'function'
  );
}
