import { VOID } from '@ng-backend/utilities';
import { DynamicUriPart } from '../../declarations/classes/dynamic-uri-part.class';
import { UriPart } from '../../declarations/classes/uri-part.class';
import { UriPartsListBuilder } from '../../declarations/types/uri-parts-list-builder.type';
import { UrlParamType } from '../../declarations/types/url-param-type.type';

export function createUriRegExpPartsBuilder(): UriPartsListBuilder {
  const target: UriPartsListBuilder = <UriPartsListBuilder>(() => VOID);

  const uriParts: UriPart[] = [];

  let lastKey: string | undefined = undefined;

  return new Proxy<UriPartsListBuilder>(target, {
    apply: (
      _: unknown,
      thisArg: unknown,
      [urlParamType]: [UrlParamType] | []
    ) => {
      if (urlParamType === undefined) {
        if (lastKey !== undefined) {
          uriParts.push(new UriPart(lastKey));
        }
        lastKey = undefined;

        return uriParts;
      }

      if (lastKey !== undefined) {
        uriParts.push(new DynamicUriPart(lastKey, urlParamType));
      }
      lastKey = undefined;

      return thisArg;
    },

    get: (_: unknown, key: string, receiver: UriPartsListBuilder) => {
      if (lastKey !== undefined) {
        uriParts.push(new UriPart(lastKey));
      }
      lastKey = key;

      return receiver;
    },
  });
}
