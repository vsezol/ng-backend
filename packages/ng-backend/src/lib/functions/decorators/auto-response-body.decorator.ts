import { AutoResponseFull } from './auto-response-full.decorator';

export function AutoResponseBody<T extends unknown>(body: T): MethodDecorator {
  return AutoResponseFull<T>({
    body,
  });
}
