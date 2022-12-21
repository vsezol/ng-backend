import { HttpEventType } from '@angular/common/http';
import { isEnumValue } from './is-enum-value.function';
import { isHttpEvent } from './is-http-event.function';

describe('isHttpEvent', () => {
  it(`should return true if input has 'type' property with value from HttpEventType`, () => {
    const httpEvents: { type: HttpEventType }[] = Object.values(HttpEventType)
      .filter((type: unknown): type is HttpEventType =>
        isEnumValue(HttpEventType, type)
      )
      .map((type: HttpEventType) => ({ type }));

    httpEvents.forEach((event) => {
      expect(isHttpEvent(event)).toBe(true);
    });
  });

  it(`should return false if input has 'type' property but its value is not from HttpEventType`, () => {
    [{ type: 9999 }, { type: 'Hello' }].forEach((input) => {
      expect(isHttpEvent(input)).toBe(false);
    });
  });

  it(`should return false if input does no have 'type' property`, () => {
    expect(isHttpEvent({ name: 'John' })).toBe(false);
  });

  it('should return false if input is a number', () => {
    expect(isHttpEvent(42)).toBe(false);
  });

  it('should return false if input is a string', () => {
    expect(isHttpEvent('Hello, world!')).toBe(false);
  });

  it('should return false if input is nil', () => {
    [null, undefined].forEach((input) => {
      expect(isHttpEvent(input)).toBe(false);
    });
  });
});
