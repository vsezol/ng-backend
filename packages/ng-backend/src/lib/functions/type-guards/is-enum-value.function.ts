interface Enum {
  [value: string | number]: string | number;
}

export function isEnumValue<T extends Enum>(
  enumSrc: T,
  key: unknown
): key is T[keyof T] {
  const valuesSet: Set<string | number> = new Set(Object.values(enumSrc));

  if (typeof key !== 'string' && typeof key !== 'number') {
    return false;
  }
  return valuesSet.has(key);
}
