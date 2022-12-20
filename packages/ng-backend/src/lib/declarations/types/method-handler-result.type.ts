import { Observable } from 'rxjs';
import { MethodHandlerBasicResult } from './method-handler-basic-result.type';

export type MethodHandlerResult<T = unknown> =
  | MethodHandlerBasicResult<T>
  | Observable<MethodHandlerBasicResult<T>>;
