import { Nullable } from '../../declarations/types/nullable.type';

export function isNil<T>(entity: Nullable<T>): entity is undefined | null {
  return entity === null || entity === undefined;
}
