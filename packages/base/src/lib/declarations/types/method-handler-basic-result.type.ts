import { HttpEvent, HttpRequest } from '@angular/common/http';

/**
 * Basic type of possible method handler output
 */
export type MethodHandlerBasicResult<T = unknown> =
  | HttpRequest<T>
  | HttpEvent<T>
  | unknown
  | void;
