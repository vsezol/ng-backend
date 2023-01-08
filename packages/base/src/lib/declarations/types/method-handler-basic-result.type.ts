import { HttpEvent, HttpRequest } from '@angular/common/http';

export type MethodHandlerBasicResult<T = unknown> =
  | HttpRequest<T>
  | HttpEvent<T>
  | unknown
  | void;
