interface StringEnum {
  [value: string]: string;
}
interface NumericEnum {
  [value: number]: string;
}

export function isEnumValue<T extends StringEnum | NumericEnum>(
  enumSrc: T,
  key: unknown
): key is T[keyof T] {
  const valuesSet: Set<string | number> = new Set(Object.values(enumSrc));

  if (typeof key !== 'string' && typeof key !== 'number') {
    return false;
  }
  return valuesSet.has(key);
}
