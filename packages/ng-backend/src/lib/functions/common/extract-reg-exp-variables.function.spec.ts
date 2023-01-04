import { extractRegExpVariables } from './extract-reg-exp-variables.function';

describe('extract-reg-exp-variables.function', () => {
  it('extracts variables from a string using a RegExp pattern', () => {
    const url = '/users/123/messages/456';
    const regExp = /\/users\/(.*)\/messages\/(.*)/gi;

    expect(extractRegExpVariables(url, regExp)).toEqual(['123', '456']);
  });

  it('returns an empty array if no variables match the pattern', () => {
    const url = '/users/123/messages/456';
    const regExp = /\/posts\/(.*)/gi;

    expect(extractRegExpVariables(url, regExp)).toEqual([]);
  });

  it('returns an array of variables with the correct data types', () => {
    const url = '/users/123/messages/true';
    const regExp = /\/users\/(.*)\/messages\/(.*)/gi;

    expect(extractRegExpVariables(url, regExp)).toEqual(['123', 'true']);
  });

  it('returns an array of variables in the correct order', () => {
    const url = '/users/123/messages/456/999/777';
    const regExp = /\/users\/(.*)\/messages\/(.*)\/(.*)\/(.*)/gi;

    expect(extractRegExpVariables(url, regExp)).toEqual([
      '123',
      '456',
      '999',
      '777',
    ]);
  });
});
