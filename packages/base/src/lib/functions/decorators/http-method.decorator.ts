import { concatUriRegExpParts } from 'utilities';
import { DynamicUriPart } from '../../declarations/classes/dynamic-uri-part.class';
import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';
import { UriPart } from '../../declarations/classes/uri-part.class';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { createMethodGuard } from '../common/create-method-guard.function';

type Route = UriPart[] | string | RegExp;

export const HttpMethod = (method: HttpMethodName, route: Route = '') => {
  const resultDecorator: MethodDecorator = (
    hostObject: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const handler: MethodHandler = descriptor.value;

    const routeRegExpPart: string = createRegExpPartFromRoute(route);

    RequestHandlersBuilder.getRequestHandlers(hostObject).registerHandler({
      forMethod: method,
      key,
      canActivate: createMethodGuard(routeRegExpPart),
      run: handler,
      routeRegExpPart,
      paramNames: getParamNamesFromRoute(route),
    });

    return descriptor;
  };

  return resultDecorator;
};

function getParamNamesFromRoute(route: Route): string[] {
  if (!Array.isArray(route)) {
    return [];
  }

  return route
    .filter((part) => part instanceof DynamicUriPart)
    .map((part) => part.name);
}

function createRegExpPartFromRoute(route: Route): string {
  if (typeof route === 'string') {
    return route;
  }

  if (route instanceof RegExp) {
    return String(route).slice(1).slice(0, -1);
  }

  return concatUriRegExpParts(...route.map((item) => item.stringValue));
}
