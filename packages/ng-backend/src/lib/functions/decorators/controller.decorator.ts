import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  MethodHandlerConfig,
  MethodHandlerInput,
  RequestHandlersBuilder,
  runMethodHandler,
} from 'base';

import { Observable } from 'rxjs';
import {
  extractRegExpVariables,
  isClassConstructor,
  mergeArraysIntoEntries,
} from 'utilities';

/**
 * Decorator that adds interceptor functionality to a target class.
 *
 * @param baseUrl base url for filtering input requests
 * @returns ClassDecorator
 *
 * @group Decorators
 *
 * @example
 * Simple use
 * ```ts
 * @Controller('todos')
 * class TodoController {}
 * ```
 *
 * @example
 * With method decorators
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  // filters requests with 'todos' in url and GET method
 *  @Get()
 *  @Header('hello', 'world')
 *  public get(): void {}
 *
 *  // filters requests with 'todos/all' in url and DELETE method
 *  @Delete('all')
 *  public deleteAll(): void {}
 * }
 * ```
 */
export const Controller =
  (baseUrl: string): ClassDecorator =>
  <T extends NewableFunction>(classConstructorReference: T): T => {
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

        const handlerConfig: MethodHandlerConfig | undefined =
          RequestHandlersBuilder.getRequestHandlers(this).getHandlerConfig(
            request
          );

        if (handlerConfig === undefined) {
          return stub();
        }

        return runMethodHandler(
          new MethodHandlerInput({
            request,
            dynamicParamsMap: getDynamicParamsMap(request.url, handlerConfig),
          }),
          next,
          handlerConfig.run
        );
      }

      private isRegisteredUrl(url: string): boolean {
        return new RegExp(baseUrl, 'gi').test(url);
      }
    };
  };

function getDynamicParamsMap(
  url: string,
  handlerConfig: MethodHandlerConfig
): Map<string, string> {
  return new Map(
    mergeArraysIntoEntries(
      handlerConfig.paramNames,
      extractRegExpVariables(
        url,
        new RegExp(handlerConfig.routeRegExpPart, 'gi')
      )
    )
  );
}
