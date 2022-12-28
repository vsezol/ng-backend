import {
  HttpEventType,
  HttpHandler,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { MethodHandlerResult } from '../../declarations/types/method-handler-result.type';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { runMethodHandlers } from './run-method-handlers.function';

const mockHttpHandler: HttpHandler = {
  handle: jest.fn(),
};

describe('run-method-handlers.function', () => {
  let beginRequest: HttpRequest<unknown>;

  beforeEach(() => {
    beginRequest = new HttpRequest('GET', '/api/items');
  });

  describe('next.handle', () => {
    it('should skip the result of the handler if it is undefined', () => {
      const handlers: MethodHandler[] = [() => {}, () => {}, () => {}];

      runMethodHandlers(beginRequest, mockHttpHandler, handlers).subscribe();

      expect(mockHttpHandler.handle).toHaveBeenCalledTimes(1);
      expect(mockHttpHandler.handle).toHaveBeenCalledWith(beginRequest);
    });

    it('should call next.handle if the finish result of handlers chain is HttpRequest', () => {
      const endRequest = new HttpRequest('GET', 'handler/end');
      const handlers: MethodHandler[] = [
        (request) => request,
        (request) => request,
        () => endRequest,
      ];

      runMethodHandlers(beginRequest, mockHttpHandler, handlers).subscribe();

      expect(mockHttpHandler.handle).toHaveBeenCalledTimes(1);
      expect(mockHttpHandler.handle).toHaveBeenCalledWith(endRequest);
    });

    it('should not call next.handle if the finish result of handlers chain is not HttpRequest', () => {
      const handlers: MethodHandler[] = [
        (request) => request,
        (request) => request,
        () => new HttpResponse(),
      ];

      runMethodHandlers(beginRequest, mockHttpHandler, handlers).subscribe();

      expect(mockHttpHandler.handle).not.toHaveBeenCalled();
    });
  });

  describe('handlers chain', () => {
    it('should call the next handler with the result of the previous handler until it is HttpRequest', () => {
      const results = [
        new HttpRequest('GET', 'fake/first'),
        new HttpRequest('GET', 'fake/second'),
        new HttpResponse({
          body: 'fake/third',
        }),
      ];

      const handlers = [
        jest.fn().mockReturnValue(results[0]),
        jest.fn().mockReturnValue(results[1]),
        jest.fn().mockReturnValue(results[2]),
        jest.fn(),
      ];

      runMethodHandlers(beginRequest, mockHttpHandler, handlers).subscribe();

      expect(handlers[0]).toHaveBeenCalledWith(beginRequest);
      expect(handlers[1]).toHaveBeenCalledWith(results[0]);
      expect(handlers[2]).toHaveBeenCalledWith(results[1]);
      expect(handlers[3]).not.toHaveBeenCalled();
    });
  });

  it('should return the HttpEvent if the result is HttpEvent', () => {
    const progressEvent: HttpProgressEvent = {
      type: HttpEventType.DownloadProgress,
      total: 10,
      loaded: 4,
    };

    let result: MethodHandlerResult;
    runMethodHandlers(beginRequest, mockHttpHandler, [
      () => progressEvent,
    ]).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(progressEvent);
  });

  it('should return the HttpEvent from first handler if its result is HttpEvent', () => {
    const progressEvent: HttpProgressEvent = {
      type: HttpEventType.DownloadProgress,
      total: 10,
      loaded: 4,
    };

    let result: MethodHandlerResult;
    runMethodHandlers(beginRequest, mockHttpHandler, [
      () => progressEvent,
      () => new HttpResponse(),
    ]).subscribe((value) => {
      result = value;
    });

    expect(result).toEqual(progressEvent);
  });

  it('should wrap result into HttpResponse body if it is not undefined or HttpRequest or HttpEvent', () => {
    const expectedBody = {
      age: 20,
      name: 'Vsevolod Zolotov',
    };

    let result: MethodHandlerResult;
    runMethodHandlers(beginRequest, mockHttpHandler, [
      (request) => request,
      () => expectedBody,
    ]).subscribe((value) => {
      result = value;
    });

    expect(result).toBeInstanceOf(HttpResponse);
    if (result instanceof HttpResponse) {
      expect(result.body).toEqual(expectedBody);
    }
  });
});
