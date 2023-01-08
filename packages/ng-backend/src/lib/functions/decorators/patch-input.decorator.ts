import {
  MethodHandler,
  MethodHandlerInput,
  MethodHandlerInputPatcher,
} from 'ng-backend/internal';
import { isNil } from 'utilities';

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
