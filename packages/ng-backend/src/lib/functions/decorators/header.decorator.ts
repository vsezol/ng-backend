import { HttpRequest } from '@angular/common/http';
import { PatchRequest } from './patch-request.decorator';

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
  return PatchRequest((request: HttpRequest<unknown>) =>
    request.clone({
      headers: request.headers.set(name, value),
    })
  );
}
