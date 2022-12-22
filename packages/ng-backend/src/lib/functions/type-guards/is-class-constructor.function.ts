import { ClassConstructor } from '../../declarations/types/class-constructor.type';

export function isClassConstructor(input: unknown): input is ClassConstructor {
  return typeof input === 'function';
}
