import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';

export function DisabledHandler(
  host: object,
  key: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  RequestHandlersBuilder.getRequestHandlers(host).disableHandlerByKey(key);

  return descriptor;
}
