import { HttpMethod } from '../../declarations/enums/http-method.enum';
import { HttpMethodDecorator } from '../../declarations/types/http-method-decorator.type';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { createBaseHttpMethodDecorator } from './create-base-http-method-decorator.function';

import { createUriRegExpBuilder } from './create-uri-reg-exp-builder.function';

const target: HttpMethodDecorator = <HttpMethodDecorator>(() => {});

export function createHttpMethodDecorator(
  method: HttpMethod
): HttpMethodDecorator {
  const uriRegExpBuilder: UriRegExpBuilder = createUriRegExpBuilder();

  return new Proxy<HttpMethodDecorator>(target, {
    apply: (_: unknown, __: unknown, params: string[]) =>
      createBaseHttpMethodDecorator(method, params[0] ?? uriRegExpBuilder()),

    get(_: unknown, key: keyof HttpMethodDecorator, receiver) {
      uriRegExpBuilder[key];

      return receiver;
    },
  });
}
