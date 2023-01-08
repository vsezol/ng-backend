import { AutoResponseFull } from './auto-response-full.decorator';

export function AutoResponseBody<T>(body: T): MethodDecorator {
  return AutoResponseFull<T>({
    body,
  });
}
