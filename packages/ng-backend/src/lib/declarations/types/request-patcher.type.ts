import { HttpRequest } from '@angular/common/http';

export type RequestPatcher<T, U = T> = (
  request: HttpRequest<T>
) => HttpRequest<U>;
