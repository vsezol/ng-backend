import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { createMethodGuard } from '../common/create-method-guard.function';

export const HttpMethod = (
  method: HttpMethodName,
  routeRegExpPart: string = ''
) => {
  const resultDecorator: MethodDecorator = (
    hostObject: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const handler: MethodHandler = descriptor.value;

    RequestHandlersBuilder.getRequestHandlers(hostObject).registerHandler({
      forMethod: method,
      key,
      canActivate: createMethodGuard(routeRegExpPart),
      run: handler,
    });

    return descriptor;
  };

  return resultDecorator;
};
