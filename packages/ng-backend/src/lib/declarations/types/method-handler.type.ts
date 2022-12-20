import { HttpRequest } from '@angular/common/http';
import { MethodHandlerResult } from './method-handler-result.type';

export type MethodHandler<T = unknown> = (
  request: HttpRequest<T>
) => MethodHandlerResult;
