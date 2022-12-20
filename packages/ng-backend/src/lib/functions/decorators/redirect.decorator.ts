import { HttpRequest } from '@angular/common/http';
import { PatchRequest } from './patch-request.decorator';

type Input = (url: string) => string | string;

export function Redirect(input: Input): MethodDecorator {
  const getChangedUrl = (url: string) =>
    typeof input === 'function' ? input(url) : input;

  return PatchRequest((request: HttpRequest<unknown>) =>
    request.clone({
      url: getChangedUrl(request.url),
    })
  );
}
