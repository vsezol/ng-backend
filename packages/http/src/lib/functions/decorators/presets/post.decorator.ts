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
 *  @Post.id('int')()
 *  public postById(): void {}
 *
 *  @Post.all()
 *  public patchAll(): void {}
 * }
 * ```
 *
 * @example
 * Simple style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Post(/(.*)/)
 *  public postById(): void {}
 *
 *  @Post('all')
 *  public postAll(): void {}
 * }
 * ```
 */
export const Post: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.POST);
