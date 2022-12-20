import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';
import { HttpMethod } from '../../declarations/enums/http-method.enum';
import { CreateBaseHttpMethodDecorator } from '../../declarations/types/create-base-http-method-decorator.type';
import { MethodGuard } from '../../declarations/types/method-guard.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';

const SLASH: string = `/`;

export const createBaseHttpMethodDecorator: CreateBaseHttpMethodDecorator = (
  method: HttpMethod,
  routeUri: string = ''
) => {
  const resultDecorator: MethodDecorator = (
    hostObject: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const handler: MethodHandler = descriptor.value;

    const canActivate: MethodGuard = (
      baseUriPart: string,
      inputUriPart: string
    ) => {
      const fullUrl: string = concatUriRegExpParts(
        baseUriPart,
        getProcessedRouteUrl(routeUri)
      );

      const regExp: RegExp = new RegExp(`${fullUrl}$`, 'gi');

      return regExp.test(inputUriPart);
    };

    RequestHandlersBuilder.getRequestHandlers(hostObject).registerHandler({
      forMethod: method,
      key,
      canActivate: canActivate,
      run: handler,
    });

    return descriptor;
  };

  return resultDecorator;
};

function getProcessedRouteUrl(routeUrl: string): string {
  if (routeUrl.at(-1) === SLASH) {
    return routeUrl.slice(0, -1);
  }

  return routeUrl;
}
