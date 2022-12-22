export function isNil<T>(
  entity: T | undefined | null
): entity is undefined | null {
  return entity === null || entity === undefined;
}
