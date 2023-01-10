import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from 'base';

/**
 * Decorator that registers MethodHandler by using {@link HttpMethodDecoratorBuilder}
 * @group Decorators
 *
 * @example
 * Builder-style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Put.id('int')()
 *  public putById(): void {}
 *
 *  @Put.all()
 *  public putAll(): void {}
 * }
 * ```
 *
 * @example
 * Simple style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Put(/(.*)/)
 *  public putById(): void {}
 *
 *  @Put('all')
 *  public putAll(): void {}
 * }
 * ```
 */
export const Put: HttpMethodDecoratorBuilder = createHttpMethodDecoratorBuilder(
  HttpMethodName.PUT
);
