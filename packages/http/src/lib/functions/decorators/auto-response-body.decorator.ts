import { AutoResponseFull } from './auto-response-full.decorator';

/**
 * Decorator that returns HttpResponse with configured body instead of handling input request by method
 *
 * @param body body of HttpResponse
 * @returns MethodDecorator
 * @group Decorators
 *
 * @example
 * Returns HttpResponse with passed body
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get()
 *  @AutoResponseBody({
 *    name: 'Vsevolod',
 *    age: 20
 *  })
 *  public get(): void {}
 * }
 * ```
 */
export function AutoResponseBody<T>(body: T): MethodDecorator {
  return AutoResponseFull<T>({
    body,
  });
}
