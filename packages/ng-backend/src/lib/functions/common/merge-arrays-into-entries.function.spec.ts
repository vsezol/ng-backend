import { mergeArraysIntoEntries } from './merge-arrays-into-entries.function';

describe('merge-arrays-into-entries.function', () => {
  it('returns an array of key-value pairs for two arrays of equal size', () => {
    const firstArray = ['a', 'b', 'c'];
    const secondArray = [1, 2, 3];

    expect(mergeArraysIntoEntries(firstArray, secondArray)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('filters out key-value pairs with undefined values', () => {
    const firstArray = ['a', 'b', 'c'];
    const secondArray = [1, undefined, 3];

    expect(mergeArraysIntoEntries(firstArray, secondArray)).toEqual([
      ['a', 1],
      ['c', 3],
    ]);
  });

  it('returns an empty array if one of the input arrays is empty', () => {
    const firstArray = ['a', 'b', 'c'];
    const secondArray: number[] = [];
    expect(mergeArraysIntoEntries(firstArray, secondArray)).toEqual([]);
  });

  it('returns an array of key-value pairs with the correct data types', () => {
    const firstArray = ['a', 'b', 'c'];
    const secondArray = [1, '2', true];

    expect(mergeArraysIntoEntries(firstArray, secondArray)).toEqual([
      ['a', 1],
      ['b', '2'],
      ['c', true],
    ]);
  });

  it('returns an array of key-value pairs with the correct element order', () => {
    const firstArray = ['a', 'b', 'c'];
    const secondArray = [3, 2, 1];

    expect(mergeArraysIntoEntries(firstArray, secondArray)).toEqual([
      ['a', 3],
      ['b', 2],
      ['c', 1],
    ]);
  });

  it('returns an array of key-value pairs with length of smaller array', () => {
    const firstArray = ['hello', 'what', 'do', 'you', 'think', 'about', 'it'];
    const secondArray = [1, 2, 3, 4, 5];

    expect(mergeArraysIntoEntries(firstArray, secondArray)).toHaveLength(
      secondArray.length
    );
  });
});
