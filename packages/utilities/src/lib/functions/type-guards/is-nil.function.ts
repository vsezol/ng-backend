import { Nullable } from '../../api';

export function isNil<T>(entity: Nullable<T>): entity is undefined | null {
  return entity === null || entity === undefined;
}
