import { REG_EXP_PART_BY_URL_PARAM } from '../../declarations/constants/reg-exp-part-by-url-param.const';
import { RegExpPart } from '../../declarations/enums/regexp-part.enum';
import { UrlParam } from '../../declarations/enums/url-param.enum';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';
import { createUriRegExpPartBuilder } from './create-uri-reg-exp-part-builder.function';
import { isNil } from './is-nil.function';

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
    const regExpPart: string = builder.first._any_.second._uuid_.third();

    expect(regExpPart).toEqual(
      `first/${RegExpPart.Any}/second/${RegExpPart.Uuid}/third`
    );
  });

  it('should works with every param type', () => {
    const regExpPartForUrlParams: string[] = Object.values(UrlParam)
      .map((key: UrlParam) => REG_EXP_PART_BY_URL_PARAM.get(key))
      .filter(
        (item: RegExpPart | undefined): item is RegExpPart => !isNil(item)
      );
    const expectUriRegExpPart: string = concatUriRegExpParts(
      ...regExpPartForUrlParams
    );

    Object.values(UrlParam).forEach((key) => builder[key]);
    const regExpPart: string = builder();

    expect(regExpPart).toBe(expectUriRegExpPart);
  });
});
