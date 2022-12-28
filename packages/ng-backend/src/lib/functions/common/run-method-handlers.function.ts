import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MethodHandlerBasicResult } from '../../declarations/types/method-handler-basic-result.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { isHttpEvent } from '../type-guards/is-http-event.function';
import { getObservable } from './get-observable.function';

export function runMethodHandlers(
  request: HttpRequest<unknown>,
  next: HttpHandler,
  [handler, ...otherHandlers]: MethodHandler[]
): Observable<HttpEvent<unknown>> {
  const runChain = runAsChain.bind(null, next, otherHandlers);

  return getObservable(handler(request)).pipe(
    switchMap((result: MethodHandlerBasicResult) => {
      if (typeof result === 'undefined') {
        return runChain(request);
      }

      if (result instanceof HttpRequest) {
        return runChain(result);
      }

      if (isHttpEvent(result)) {
        return of(result);
      }

      return of(new HttpResponse<unknown>({ body: result }));
    })
  );
}

function runAsChain(
  next: HttpHandler,
  handlers: MethodHandler[],
  request: HttpRequest<unknown>
) {
  return handlers.length === 0
    ? next.handle(request)
    : runMethodHandlers(request, next, handlers);
}
