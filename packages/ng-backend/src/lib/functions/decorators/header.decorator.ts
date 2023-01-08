import { MethodHandlerInput } from 'ng-backend/internal';
import { PatchInput } from './patch-input.decorator';

/**
 * Decorator that sets request header
 *
 * @param name header name
 * @param value header value
 * @returns MethodDecorator
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
