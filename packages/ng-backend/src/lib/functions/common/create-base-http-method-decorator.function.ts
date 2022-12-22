import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';
import { HttpMethod } from '../../declarations/enums/http-method.enum';
import { CreateBaseHttpMethodDecorator } from '../../declarations/types/create-base-http-method-decorator.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { createMethodGuard } from './create-method-guard.function';

export const createBaseHttpMethodDecorator: CreateBaseHttpMethodDecorator = (
  method: HttpMethod,
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
