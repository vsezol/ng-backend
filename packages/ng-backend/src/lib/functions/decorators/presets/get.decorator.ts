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
 *  @Get.id('int')()
 *  public getById(): void {}
 *
 *  @Get.all()
 *  public getAll(): void {}
 * }
 * ```
 *
 * @example
 * Simple style
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get(/(.*)/)
 *  public getById(): void {}
 *
 *  @Get('all')
 *  public getAll(): void {}
 * }
 * ```
 */
export const Get: HttpMethodDecoratorBuilder = createHttpMethodDecoratorBuilder(
  HttpMethodName.GET
);
