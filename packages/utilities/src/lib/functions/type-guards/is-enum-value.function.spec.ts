import { isEnumValue } from './is-enum-value.function';

describe('is-enum-value.function', () => {
  enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
  }

  enum NumberEnum {
    One,
    Two,
    Three,
  }

  enum StringNumberEnum {
    One = '1',
    Two = '2',
    Three = '3',
  }

  enum EmptyEnum {}

  it('should return true for key that exists in the enum', () => {
    expect(isEnumValue(Color, Color.Blue)).toBe(true);
  });

  it('should return true for a numeric key that exists in the enum', () => {
    expect(isEnumValue(NumberEnum, 1)).toBe(true);
  });

  it('should return false for a key that does not exist in the enum', () => {
    expect(isEnumValue(Color, 'FakeColor')).toBe(false);
  });

  it('should return false for a numeric key that does not exist in the enum', () => {
    expect(isEnumValue(NumberEnum, 999)).toBe(false);
  });

  it('should return false for a key that is not a string or a number', () => {
    expect(isEnumValue(Color, {})).toBe(false);
  });

  it('should work with an empty enum', () => {
    ['any', 0].forEach((key) => {
      expect(isEnumValue(EmptyEnum, key)).toBe(false);
    });
  });
});
