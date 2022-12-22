import { hasProperty } from './has-property.function';

describe('has-property.function', () => {
  it('should return true if the object has the specified property', () => {
    expect(hasProperty({ ab: 1, cd: 2 }, 'cd')).toBe(true);
  });

  it('should return false if the object does not have the specified property', () => {
    expect(hasProperty({ ab: 1, cd: 2 }, 'hello')).toBe(false);
  });

  it('should return false if the object is an empty object', () => {
    expect(hasProperty({}, 'hi')).toBe(false);
  });

  it('should return false if the object is null', () => {
    expect(hasProperty(null, 'name')).toBe(false);
  });

  it('should return false if the object is undefined', () => {
    expect(hasProperty(undefined, 'name')).toBe(false);
  });

  it('should return true if the object prototype has the specified property', () => {
    expect(hasProperty(Promise.resolve(), 'then')).toBe(true);
  });
});
