import { UriPart } from './uri-part.class';

describe('uri-part.class', () => {
  it('constructor sets correct name', () => {
    const part = new UriPart('test');
    expect(part.name).toBe('test');
  });

  it('stringValue returns correct name', () => {
    const part = new UriPart('test');
    expect(part.stringValue).toBe('test');
  });

  it('stringValue returns correct name for different instances', () => {
    const part1 = new UriPart('test1');
    const part2 = new UriPart('test2');

    expect(part1.stringValue).toBe('test1');
    expect(part2.stringValue).toBe('test2');
  });
});
