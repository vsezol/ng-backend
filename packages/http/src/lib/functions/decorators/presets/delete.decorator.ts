import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from '@ng-backend/base';

/**
 * Decorator that registers MethodHandler by using {@link HttpMethodDecoratorBuilder}
 * @group Decorators
 *
 * @example
 * Builder-style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Delete.id('int')()
 *  public deleteById(): void {}
 *
 *  @Delete.all()
 *  public deleteAll(): void {}
 * }
 * ```
 *
 * @example
 * Simple style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Delete(/(.*)/)
 *  public deleteById(): void {}
 *
 *  @Delete('all')
 *  public deleteAll(): void {}
 * }
 * ```
 */
export const Delete: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.DELETE);
