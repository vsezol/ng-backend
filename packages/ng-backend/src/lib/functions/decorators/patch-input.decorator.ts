import { MethodHandlerInput } from '../../declarations/classes/method-handler-input.class';
import { MethodHandlerInputPatcher } from '../../declarations/types/method-handler-input-patcher.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { isNil } from '../api';

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