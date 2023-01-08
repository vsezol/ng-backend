import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';

describe('concat-uri-parts.function', () => {
  it('should concatenate multiple parts with a slash', () => {
    const result = concatUriRegExpParts('part1', 'part2', 'part3');

    expect(result).toEqual('part1/part2/part3');
  });

  it('should ignore empty or null parts', () => {
    const result = concatUriRegExpParts(
      'part1',
      '',
      'part2',
      null,
      'part3',
      undefined
    );

    expect(result).toEqual('part1/part2/part3');
  });

  it('should handle a single part', () => {
    const result = concatUriRegExpParts('part1');

    expect(result).toEqual('part1');
  });

  it('should return an empty string if no parts are provided', () => {
    const result = concatUriRegExpParts();
    expect(result).toEqual('');
  });

  it('should handle leading and trailing slashes correctly', () => {
    const result = concatUriRegExpParts('/part1/', 'part2', '/part3/');

    expect(result).toEqual('part1/part2/part3');
  });

  it('should handle multiple slashes between parts correctly', () => {
    const result = concatUriRegExpParts('part1', '//part2//', '/part3/part4');

    expect(result).toEqual('part1/part2/part3/part4');
  });

  it('should handle parts with spaces correctly', () => {
    const result = concatUriRegExpParts('par t1', 'part 2', 'par t3', '    ');
    expect(result).toEqual('part1/part2/part3');
  });
});
