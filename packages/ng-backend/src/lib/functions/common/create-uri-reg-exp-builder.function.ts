import { REG_EXP_PART_BY_URL_PARAM } from '../../declarations/constants/reg-exp-part-by-url-param.const';
import { RegExpPart } from '../../declarations/enums/regexp-part.enum';
import { UrlParam } from '../../declarations/enums/url-param.enum';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { isEnumValue } from './is-enum-value.function';

export const createUriRegExpBuilder = () => {
  const target: UriRegExpBuilder = <UriRegExpBuilder>(() => {});

  let parts: string[] = [];

  return new Proxy(target, {
    apply: () => {
      const uri: string = parts.join(RegExpPart.Slash);

      parts = [];

      return uri;
    },
    get: (
      _: UriRegExpBuilder,
      key: keyof UriRegExpBuilder,
      receiver: UriRegExpBuilder
    ) => {
      parts.push(getPart(key));

      return receiver;
    },
  });
};

function getPart(key: string): string {
  if (!isEnumValue(UrlParam, key)) {
    return key;
  }

  return REG_EXP_PART_BY_URL_PARAM.get(key) ?? key;
}
