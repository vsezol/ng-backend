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
 *  @Patch.id('int')()
 *  public patchById(): void {}
 *
 *  @Patch.all()
 *  public patchAll(): void {}
 * }
 * ```
 *
 * @example
 * Simple style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Patch(/(.*)/)
 *  public patchById(): void {}
 *
 *  @Patch('all')
 *  public patchAll(): void {}
 * }
 * ```
 */
export const Patch: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.PATCH);
