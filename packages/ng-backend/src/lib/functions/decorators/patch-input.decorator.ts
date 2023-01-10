import {
  MethodHandler,
  MethodHandlerInput,
  MethodHandlerInputPatcher,
} from 'base';
import { isNil } from 'utilities';

/**
 * Decorator that patches method handler input
 *
 * @param patcher function for patch input
 * @typeParam T body type of input HttpRequest
 * @typeParam U body type of patched HttpRequest
 * @returns MethodDecorator
 * @group Decorators
 *
 * @example
 * Changing request param
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get()
 *  @PatchInput((input) =>
 *   input.clone({
 *     request: input.request.clone({
 *       url: input.request.url + 'new-part-of-url',
 *       method: 'POST',
 *       body: 228
 *     }),
 *   })
 *  )
 *  public get(): void {}
 * }
 * ```
 */
export function PatchInput<T, U = T>(
  patcher: MethodHandlerInputPatcher<T, U>
): MethodDecorator {
  const decorator: MethodDecorator = (
    _: object,
    __: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const handler: MethodHandler = descriptor.value;

    const patchedHandler: MethodHandler<T> = (input: MethodHandlerInput<T>) => {
      const patchedInput: MethodHandlerInput = patcher(input);

      const result = handler(patchedInput);

      return isNil(result) ? patchedInput.request : result;
    };

    descriptor.value = patchedHandler;

    return descriptor;
  };

  return decorator;
}
