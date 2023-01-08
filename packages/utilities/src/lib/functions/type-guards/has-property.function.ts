import { isNil } from '../type-guards/is-nil.function';

export const hasProperty = <T extends object, K extends string>(
  input: T | undefined | null,
  property: K
): input is T & Record<K, unknown> =>
  isNil(input) ? false : property in input;
