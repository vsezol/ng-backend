import { VOID } from 'utilities';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { HttpMethodDecoratorBuilder } from '../../declarations/types/http-method-decorator-builder.type';
import { UriPartsListBuilder } from '../../declarations/types/uri-parts-list-builder.type';
import { UrlParamType } from '../../declarations/types/url-param-type.type';
import { HttpMethod } from '../decorators/http-method.decorator';
import { createUriRegExpPartsBuilder } from './create-uri-parts-list-builder.function';

export function createHttpMethodDecoratorBuilder(
  method: HttpMethodName
): HttpMethodDecoratorBuilder {
  const uriPartsListBuilder: UriPartsListBuilder =
    createUriRegExpPartsBuilder();

  return new Proxy<HttpMethodDecoratorBuilder>(createTarget(), {
    apply: (_: unknown, __: unknown, [uriPart]: [string] | []) =>
      HttpMethod(method, uriPart ?? uriPartsListBuilder()),

    get: (_: unknown, key: keyof HttpMethodDecoratorBuilder, receiver) =>
      createProxyForKey(uriPartsListBuilder, receiver, key),
  });
}

function createProxyForKey(
  uriPartsListBuilder: UriPartsListBuilder,
  rootProxy: HttpMethodDecoratorBuilder,
  forKey: string
): HttpMethodDecoratorBuilder {
  return new Proxy<HttpMethodDecoratorBuilder>(createTarget(), {
    apply: (_: unknown, __: unknown, [urlParamType]: [UrlParamType] | []) => {
      if (urlParamType === undefined) {
        uriPartsListBuilder[forKey];

        return rootProxy();
      }

      uriPartsListBuilder[forKey](urlParamType);

      return rootProxy;
    },

    get: (_: unknown, key: string) => {
      uriPartsListBuilder[forKey];

      return rootProxy[key];
    },
  });
}

function createTarget(): HttpMethodDecoratorBuilder {
  return <HttpMethodDecoratorBuilder>(() => VOID);
}
