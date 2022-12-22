import { REG_EXP_PART_BY_URL_PARAM } from '../../declarations/constants/reg-exp-part-by-url-param.const';
import { UrlParam } from '../../declarations/enums/url-param.enum';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';
import { isEnumValue } from './is-enum-value.function';

export function createUriRegExpPartBuilder() {
  const target: UriRegExpBuilder = <UriRegExpBuilder>(() => {});

  let parts: string[] = [];

  return new Proxy(target, {
    apply: () => {
      const uri: string = concatUriRegExpParts(...parts);

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
}

function getPart(key: string): string {
  if (!isEnumValue(UrlParam, key)) {
    return key;
  }

  return REG_EXP_PART_BY_URL_PARAM.get(key) ?? key;
}
