import { REQUEST_HANDLERS_KEY } from '../constants/request-handlers-key.const';
import { RequestHandlers } from './request-handlers.class';

type WithRequestHandlers<T> = T & {
  [REQUEST_HANDLERS_KEY]: RequestHandlers;
};

export class RequestHandlersBuilder {
  public static getRequestHandlers(instance: object): RequestHandlers {
    return RequestHandlersBuilder.hasRequestHandlers(instance)
      ? Reflect.get(instance, REQUEST_HANDLERS_KEY)
      : this.defineRequestHandlers(instance);
  }

  public static hasRequestHandlers<T extends object>(
    instance: T
  ): instance is WithRequestHandlers<T> {
    return Reflect.has(instance, REQUEST_HANDLERS_KEY);
  }

  public static defineRequestHandlers(instance: object): RequestHandlers {
    const requestHandlers: RequestHandlers = new RequestHandlers();

    Reflect.defineProperty(instance, REQUEST_HANDLERS_KEY, {
      value: requestHandlers,
      configurable: false,
      enumerable: false,
      writable: false,
    });

    return requestHandlers;
  }
}
