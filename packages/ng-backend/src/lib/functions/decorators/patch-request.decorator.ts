import { HttpRequest } from '@angular/common/http';
import { MethodHandlerBasicResult } from '../../declarations/types/method-handler-basic-result.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { RequestPatcher } from '../../declarations/types/request-patcher.type';

export function PatchRequest<T, U = T>(
  patcher: RequestPatcher<T, U>
): MethodDecorator {
  const decorator: MethodDecorator = (
    _: object,
    __: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const handler: MethodHandler = descriptor.value;

    const getPatchedRequest = (request: HttpRequest<T>): HttpRequest<U> =>
      patcher(request);

    const patchedHandler: MethodHandler<T> = (request: HttpRequest<T>) => {
      const result: MethodHandlerBasicResult = handler(request);

      if (result instanceof HttpRequest) {
        return getPatchedRequest(result);
      }

      if (typeof result === 'undefined') {
        return getPatchedRequest(request);
      }

      return result;
    };

    descriptor.value = patchedHandler;

    return descriptor;
  };

  return decorator;
}
