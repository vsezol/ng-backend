import { MethodHandlerInput } from '@ng-backend/base';
import { PatchInput } from './patch-input.decorator';

type Input = ((url: string) => string) | string;

/**
 * Decorator that changes url of input HttpRequest
 *
 * @param input string or function for change url
 * @returns MethodDecorator
 * @group Decorators
 *
 * @example
 * Redirecting to 404
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Redirect('404')
 *  public get(): void {}
 * }
 * ```
 *
 * @example
 * Redirect by function
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Redirect((url: string) => url + '/additional-part')
 *  public get(): void {}
 * }
 * ```
 */
export function Redirect(input: Input): MethodDecorator {
  const getChangedUrl = (url: string) =>
    typeof input === 'function' ? input(url) : input;

  return PatchInput((input: MethodHandlerInput) =>
    input.clone({
      request: input.request.clone({
        url: getChangedUrl(input.request.url),
      }),
    })
  );
}
