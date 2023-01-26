import { MethodHandlerInput } from '@ng-backend/base';
import { PatchInput } from './patch-input.decorator';

/**
 * Decorator that sets header for input request
 *
 * @param name header name
 * @param value header value
 * @returns MethodDecorator
 * @group Decorators
 *
 *
 *
 * @example
 * Single use
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get()
 *  @Header('hello', 'world') // sets header "hello: world" to input request
 *  public get(): void {}
 * }
 * ```
 *
 * @example
 * Pagination headers example
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  // sets headers "skip: 10" and "take: 10" to input request
 *  @Get('list')
 *  @Header('skip', '10')
 *  @Header('take', '10')
 *  public get(): void {}
 * }
 * ```
 */
export function Header<T extends string>(
  name: T,
  value: string | string[]
): MethodDecorator {
  return PatchInput((input: MethodHandlerInput<unknown>) =>
    input.clone({
      request: input.request.clone({
        headers: input.request.headers.set(name, value),
      }),
    })
  );
}
