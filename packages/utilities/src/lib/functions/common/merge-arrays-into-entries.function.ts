export const mergeArraysIntoEntries = <T, U>(
  firstArray: T[],
  secondArray: U[]
): [T, U][] =>
  firstArray
    .map((entryKey: T, index: number): [T, U] => [entryKey, secondArray[index]])
    .filter(([, value]: [T, U]) => value !== undefined);
