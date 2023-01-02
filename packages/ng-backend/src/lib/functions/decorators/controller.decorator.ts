import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { runMethodHandler } from '../common/run-method-handler.function';
import { isClassConstructor } from '../type-guards/is-class-constructor.function';

export const Controller =
  (baseUrl: string): ClassDecorator =>
  <T extends Function>(classConstructorReference: T): T => {
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

        const handler: MethodHandler | undefined =
          RequestHandlersBuilder.getRequestHandlers(this).getHandler(request);

        if (handler === undefined) {
          return stub();
        }

        return runMethodHandler(request, next, handler);
      }

      private isRegisteredUrl(url: string): boolean {
        return new RegExp(baseUrl, 'gi').test(url);
      }
    };
  };
