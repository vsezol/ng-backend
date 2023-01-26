import { RequestHandlersBuilder } from '@ng-backend/base';

/**
 * MethodDecorator that disables method handler functionality
 *
 * @group Decorators
 *
 * @example
 * Simple use
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get()
 *  @DisabledHandler
 *  public get(): void {}
 * }
 * ```
 */
export function DisabledHandler(
  host: object,
  key: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  RequestHandlersBuilder.getRequestHandlers(host).disableHandlerByKey(key);

  return descriptor;
}
