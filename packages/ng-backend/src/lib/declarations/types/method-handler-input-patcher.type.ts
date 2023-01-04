import { MethodHandlerInput } from '../classes/method-handler-input.class';

export type MethodHandlerInputPatcher<T, U = T> = (
  request: MethodHandlerInput<T>
) => MethodHandlerInput<U>;
