import { Observable } from 'rxjs';
import { MethodHandlerBasicResult } from './method-handler-basic-result.type';

/**
 * Type of possible method handler output
 */
export type MethodHandlerResult<T = unknown> =
  | MethodHandlerBasicResult<T>
  | Observable<MethodHandlerBasicResult<T>>;
