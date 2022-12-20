import { AutoResponseFull } from './auto-response-full.decorator';

export function ResponseBody<T extends unknown>(body: T): MethodDecorator {
  return AutoResponseFull<T>({
    body,
  });
}
