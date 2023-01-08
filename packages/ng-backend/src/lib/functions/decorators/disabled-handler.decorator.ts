import { RequestHandlersBuilder } from 'base';

export function DisabledHandler(
  host: object,
  key: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  RequestHandlersBuilder.getRequestHandlers(host).disableHandlerByKey(key);

  return descriptor;
}
