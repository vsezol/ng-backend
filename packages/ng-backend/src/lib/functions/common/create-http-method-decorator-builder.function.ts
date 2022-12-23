import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { HttpMethodDecoratorBuilder } from '../../declarations/types/http-method-decorator-builder.type';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
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
    apply: (_: unknown, __: unknown, params: string[]) =>
      HttpMethod(method, params[0] ?? uriRegExpBuilder()),

    get(_: unknown, key: keyof HttpMethodDecoratorBuilder, receiver) {
      uriRegExpBuilder[key];

      return receiver;
    },
  });
}
