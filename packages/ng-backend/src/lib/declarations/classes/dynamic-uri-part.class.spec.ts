const mockRegExpPartByUrlParamTypeGetter = jest.fn();

jest.mock('../constants/reg-exp-part-by-url-param-type.const', () => {
  const root = {};

  Object.defineProperty(root, 'REG_EXP_PART_BY_URL_PARAM_TYPE', {
    get: mockRegExpPartByUrlParamTypeGetter,
  });

  return root;
});

import { UrlParamType } from '../api';
import { REG_EXP_PART_BY_URL_PARAM_TYPE } from '../constants/reg-exp-part-by-url-param-type.const';
import { RegExpPart } from '../enums/regexp-part.enum';
import { DynamicUriPart } from './dynamic-uri-part.class';

mockRegExpPartByUrlParamTypeGetter.mockReturnValue(
  new Map([
    ['int', RegExpPart.Int],
    ['float', RegExpPart.Float],
    ['any', RegExpPart.Any],
  ])
);

describe('DynamicUriPart', () => {
  it('constructor sets correct name', () => {
    expect(new DynamicUriPart('test', 'float').name).toBe('test');
  });

  it('stringValue returns correct name', () => {
    const part = new DynamicUriPart('test', 'int');

    expect(part.stringValue).toBe(getExpectedDynamicPartStringValue('int'));
  });

  it('stringValue returns correct name for different instances', () => {
    const firstPart = new DynamicUriPart('FIRST', 'any');

    const secondPart = new DynamicUriPart('SECOND', 'float');

    expect(firstPart.stringValue).toBe(
      getExpectedDynamicPartStringValue('any')
    );
    expect(secondPart.stringValue).toBe(
      getExpectedDynamicPartStringValue('float')
    );
  });

  it('stringValue returns correct value if UrlParamType is not specified', () => {
    expect(new DynamicUriPart('test', 'uuid').stringValue).toBe('test');
  });
});

function getExpectedDynamicPartStringValue(type: UrlParamType): string {
  return '(' + REG_EXP_PART_BY_URL_PARAM_TYPE.get(type) + ')';
}
