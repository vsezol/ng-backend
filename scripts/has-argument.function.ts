import { findArgumentIndex } from './find-argument-index.function';

export const hasArgument = (name: string): boolean =>
  findArgumentIndex(name) !== -1;
