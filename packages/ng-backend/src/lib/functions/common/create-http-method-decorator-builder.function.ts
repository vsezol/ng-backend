import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { HttpMethodDecoratorBuilder } from '../../declarations/types/http-method-decorator-builder.type';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { UrlParamType } from '../../declarations/types/url-param-type.type';
import { HttpMethod } from '../decorators/http-method.decorator';
import { createUriRegExpPartBuilder } from './create-uri-reg-exp-part-builder.function';

const target: HttpMethodDecoratorBuilder = <HttpMethodDecoratorBuilder>(
  (() => {})
);

export function createHttpMethodDecoratorBuilder(
  method: HttpMethodName
): HttpMethodDecoratorBuilder {
  const uriRegExpBuilder: UriRegExpBuilder = createUriRegExpPartBuilder();

  return new Proxy<HttpMethodDecoratorBuilder>(target, {
    apply: (_: unknown, __: unknown, [uriPart]: [string] | []) =>
      HttpMethod(method, uriPart ?? uriRegExpBuilder()),

    get: (_: unknown, key: keyof HttpMethodDecoratorBuilder, receiver) =>
      createProxyForKey(uriRegExpBuilder, receiver, key),
  });
}

function createProxyForKey(
  uriRegExpBuilder: UriRegExpBuilder,
  rootProxy: HttpMethodDecoratorBuilder,
  forKey: string
): HttpMethodDecoratorBuilder {
  const target: HttpMethodDecoratorBuilder = <HttpMethodDecoratorBuilder>(
    (() => {})
  );

  return new Proxy<HttpMethodDecoratorBuilder>(target, {
    apply: (_: unknown, __: unknown, [urlParamType]: [UrlParamType] | []) => {
      if (urlParamType === undefined) {
        uriRegExpBuilder[forKey];

        return rootProxy();
      }

      uriRegExpBuilder[forKey](urlParamType);

      return rootProxy;
    },

    get: (_: unknown, key: string) => {
      uriRegExpBuilder[forKey];

      return rootProxy[key];
    },
  });
}
