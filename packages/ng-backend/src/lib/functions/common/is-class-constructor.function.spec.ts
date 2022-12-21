import { isClassConstructor } from './is-class-constructor.function';

describe('isClassConstructor', () => {
  it('should return true if input is a class constructor', () => {
    class User {
      constructor(public name: string) {}
    }

    expect(isClassConstructor(User)).toBe(true);
  });

  it('should return true if input is a function', () => {
    function greet(name: string) {
      return `Hello, ${name}!`;
    }

    expect(isClassConstructor(greet)).toBe(true);
  });

  it('should return false if input is an object', () => {
    expect(isClassConstructor({ name: 'John' })).toBe(false);
  });

  it('should return false if input is a number', () => {
    expect(isClassConstructor(43)).toBe(false);
  });

  it('should return false if input is a string', () => {
    expect(isClassConstructor('Hello, world!')).toBe(false);
  });

  it('should return false if input is nil', () => {
    [null, undefined].forEach((input) => {
      expect(isClassConstructor(input)).toBe(false);
    });
  });
});
