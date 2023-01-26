import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { getObservable, VOID } from '@ng-backend/utilities';
import { Observable, of, switchMap } from 'rxjs';
import { MethodHandlerInput } from '../../declarations/classes/method-handler-input.class';
import { MethodHandlerBasicResult } from '../../declarations/types/method-handler-basic-result.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { isHttpEvent } from '../type-guards/is-http-event.function';

export function runMethodHandler(
  input: MethodHandlerInput,
  next: HttpHandler,
  handler: MethodHandler
): Observable<HttpEvent<unknown>> {
  return of(VOID).pipe(
    switchMap(() => getObservable(handler(input))),
    switchMap((result: MethodHandlerBasicResult) => {
      if (typeof result === 'undefined') {
        return next.handle(input.request);
      }

      if (result instanceof HttpRequest) {
        return next.handle(result);
      }

      if (isHttpEvent(result)) {
        return of(result);
      }

      return of(new HttpResponse<unknown>({ body: result }));
    })
  );
}
