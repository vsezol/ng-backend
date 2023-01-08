import { MethodHandlerInput } from 'ng-backend/internal';
import { PatchInput } from './patch-input.decorator';

type Input = ((url: string) => string) | string;

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
