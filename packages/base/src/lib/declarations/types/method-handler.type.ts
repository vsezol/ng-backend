import { MethodHandlerInput } from '../classes/method-handler-input.class';
import { MethodHandlerResult } from './method-handler-result.type';

export type MethodHandler<T = unknown> = (
  input: MethodHandlerInput<T>
) => MethodHandlerResult;
