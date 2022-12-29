import { REG_EXP_PART_BY_URL_PARAM_TYPE } from '../../declarations/constants/reg-exp-part-by-url-param-type.const';
import { RegExpPart } from '../../declarations/enums/regexp-part.enum';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { UrlParamType } from '../../declarations/types/url-param-type.type';
import { isNil } from '../type-guards/is-nil.function';
import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';
import { createUriRegExpPartBuilder } from './create-uri-reg-exp-part-builder.function';

describe('create-uri-reg-exp-part-builder.function', () => {
  let builder: UriRegExpBuilder;

  beforeEach(() => {
    builder = createUriRegExpPartBuilder();
  });

  it('should work with multiple parts', () => {
    const regExpPart: string = builder.user.friends.and.my.dog();

    expect(regExpPart).toEqual('user/friends/and/my/dog');
  });

  it('should return empty string if there are no parts', () => {
    const regExpPart: string = builder();

    expect(regExpPart).toBe('');
  });

  it('should return parameters regexp parts with other parts', () => {
    const regExpPart: string = builder.first
      .param1('any')
      .second.param2('uuid')
      .third();

    expect(regExpPart).toEqual(
      `first/${RegExpPart.Any}/second/${RegExpPart.Uuid}/third`
    );
  });

  it('should works with every param type', () => {
    const urlParamTypes: UrlParamType[] = ['int', 'float', 'uuid', 'any'];
    const regExpPartsForUrlParamTypes: string[] = urlParamTypes
      .map((key: UrlParamType) => REG_EXP_PART_BY_URL_PARAM_TYPE.get(key))
      .filter(
        (item: RegExpPart | undefined): item is RegExpPart => !isNil(item)
      );
    const expectedUri: string = concatUriRegExpParts(
      ...regExpPartsForUrlParamTypes
    );

    urlParamTypes.forEach((type: UrlParamType) => builder.p(type));
    const uri: string = builder();

    expect(expectedUri).toBe(uri);
  });
});
