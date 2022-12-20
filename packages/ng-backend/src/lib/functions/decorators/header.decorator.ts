import { HttpRequest } from '@angular/common/http';
import { PatchRequest } from './patch-request.decorator';

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
