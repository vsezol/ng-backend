import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';
import { MethodHandlerBasicResult } from '../../declarations/types/method-handler-basic-result.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { getObservable } from '../common/get-observable.function';
import { isClassConstructor } from '../type-guards/is-class-constructor.function';
import { isHttpEvent } from '../type-guards/is-http-event.function';

export function Controller(baseUrl: string): ClassDecorator {
  const decorator: ClassDecorator = <T extends Function>(
    classConstructorReference: T
  ): T => {
    if (!isClassConstructor(classConstructorReference)) {
      throw new Error(`Unexpected decoration target is detected.`);
    }

    return class extends classConstructorReference implements HttpInterceptor {
      constructor(...options: unknown[]) {
        super(...options);

        RequestHandlersBuilder.getRequestHandlers(this).baseUrl = baseUrl;
      }

      public intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
      ): Observable<HttpEvent<unknown>> {
        const stub = (): Observable<HttpEvent<unknown>> => next.handle(request);

        if (!this.isRegisteredUrl(request.url)) {
          return stub();
        }

        const handlers: MethodHandler[] =
          RequestHandlersBuilder.getRequestHandlers(this).getHandlers(request);

        if (handlers.length === 0) {
          return stub();
        }

        return runHandlers(request, next, handlers);
      }

      private isRegisteredUrl(url: string): boolean {
        return new RegExp(baseUrl, 'gi').test(url);
      }
    };
  };

  return decorator;
}

function runHandlers(
  request: HttpRequest<unknown>,
  next: HttpHandler,
  [handler, ...otherHandlers]: MethodHandler[]
): Observable<HttpEvent<unknown>> {
  const runHandlersChainForResult = (result: HttpRequest<unknown>) => {
    return otherHandlers.length === 0
      ? next.handle(result)
      : runHandlers(result, next, otherHandlers);
  };

  return getObservable(handler(request)).pipe(
    switchMap((result: MethodHandlerBasicResult) => {
      if (typeof result === 'undefined') {
        return runHandlersChainForResult(request);
      }

      if (result instanceof HttpRequest) {
        return runHandlersChainForResult(result);
      }

      if (isHttpEvent(result)) {
        return of(result);
      }

      return of(new HttpResponse<unknown>({ body: result }));
    })
  );
}
