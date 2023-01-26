import { HttpResponse } from '@angular/common/http';

/**
 * Decorator that returns HttpResponse with configured options instead of handling input request by method
 *
 * @param params arguments of constructor of HttpResponse
 * @returns MethodDecorator
 * @group Decorators
 *
 * @example
 * Returns HttpResponse with configured options
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get()
 *  @AutoResponseFull({
 *    body: {
 *      name: 'Vsevolod',
 *      age: 20
 *    },
 *    status: 200
 *  })
 *  public get(): void {}
 * }
 * ```
 */
export function AutoResponseFull<T>(
  ...params: ConstructorParameters<typeof HttpResponse<T>>
): MethodDecorator {
  const resultDecorator: MethodDecorator = (
    _: object,
    __: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    descriptor.value = () => new HttpResponse<T>(...params);

    return descriptor;
  };

  return resultDecorator;
}
