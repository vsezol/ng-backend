import { MethodHandlerInput } from '../classes/method-handler-input.class';

/**
 * Type of predicate that is used in {@link PatchInput}
 */
export type MethodHandlerInputPatcher<T, U = T> = (
  request: MethodHandlerInput<T>
) => MethodHandlerInput<U>;
