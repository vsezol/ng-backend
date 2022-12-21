import { hasProperty } from './has-property.function';

describe('hasProperty', () => {
  it('should return true if the argument has the specified property', () => {
    expect(hasProperty({ ab: 1, cd: 2 }, 'cd')).toBe(true);
  });

  it('should return false if the argument does not have the specified property', () => {
    expect(hasProperty({ ab: 1, cd: 2 }, 'hello')).toBe(false);
  });

  it('should return false if the argument is an empty object', () => {
    expect(hasProperty({}, 'hi')).toBe(false);
  });

  it('should return false if the argument is null', () => {
    expect(hasProperty(null, 'name')).toBe(false);
  });

  it('should return false if the argument is undefined', () => {
    expect(hasProperty(undefined, 'name')).toBe(false);
  });
});
