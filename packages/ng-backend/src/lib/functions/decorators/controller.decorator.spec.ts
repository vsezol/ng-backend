const mockRequestHandlersBaseUrlSetter = jest.fn();
const mockRequestHandlersGetHandlers = jest.fn();

const mockHttpHandler: HttpHandler = {
  handle: jest.fn(),
};

const mockRequestHandlers = {
  getHandlers: mockRequestHandlersGetHandlers,
};

const mockRunMethodHandlers = jest.fn();

Object.defineProperty(mockRequestHandlers, 'baseUrl', {
  set: mockRequestHandlersBaseUrlSetter,
});

const mockRequestHandlersBuilder = {
  getRequestHandlers: jest.fn().mockReturnValue(mockRequestHandlers),
};

jest.mock('../../declarations/classes/request-handlers-builder.class', () => ({
  RequestHandlersBuilder: mockRequestHandlersBuilder,
}));

jest.mock('../../declarations/classes/request-handlers.class', () => ({
  RequestHandlers: mockRequestHandlers,
}));

jest.mock('../../functions/common/run-method-handlers.function', () => ({
  runMethodHandlers: mockRunMethodHandlers,
}));

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MethodHandler } from '../../declarations/types/method-handler.type';
import { hasProperty } from '../type-guards/has-property.function';
import { Controller } from './controller.decorator';

describe('controller.decorator', () => {
  const baseUrl = '/api/fake';

  it('should return a class decorator that creates a new class that extends the original class and implements HttpInterceptor', () => {
    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();

    expect(isHttpInterceptor(testInstance)).toBe(true);
    expect(testInstance).toBeInstanceOf(Test);
  });

  it('should set the baseUrl of the request handlers to the provided baseUrl', () => {
    @Controller(baseUrl)
    class Test {}
    new Test();

    expect(mockRequestHandlersBaseUrlSetter).toHaveBeenCalledWith(baseUrl);
  });

  it('should call HttpHandler.handle if the request URL is not registered', () => {
    const request = new HttpRequest('GET', '/other/api/items');
    mockRequestHandlersGetHandlers.mockReturnValue(() => new HttpResponse());

    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();
    if (!isHttpInterceptor(testInstance)) {
      throw new Error();
    }
    testInstance.intercept(request, mockHttpHandler);

    expect(mockHttpHandler.handle).toHaveBeenCalledWith(request);
  });

  it('should call HttpHandler.handle if the there are not registered handlers', () => {
    const request = new HttpRequest('GET', baseUrl);
    mockRequestHandlersGetHandlers.mockReturnValue([]);

    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();
    if (!isHttpInterceptor(testInstance)) {
      throw new Error();
    }
    testInstance.intercept(request, mockHttpHandler);

    expect(mockHttpHandler.handle).toHaveBeenCalledWith(request);
  });

  it('should return runMethodHandlers call output if there are registered handlers', (done) => {
    const request = new HttpRequest('GET', `${baseUrl}/hello`);
    const expectedInterceptResult = new HttpResponse({
      body: 'HELLO FROM TEST',
    });
    mockRunMethodHandlers.mockReturnValue(of(expectedInterceptResult));
    const handlers: MethodHandler[] = [
      (request: HttpRequest<unknown>) => request,
      () => new HttpResponse(),
    ];
    mockRequestHandlersGetHandlers.mockReturnValue(handlers);

    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();
    if (!isHttpInterceptor(testInstance)) {
      throw new Error();
    }
    let result$: Observable<HttpEvent<unknown>> = testInstance.intercept(
      request,
      mockHttpHandler
    );

    expect(mockRunMethodHandlers).toHaveBeenCalledWith(
      request,
      mockHttpHandler,
      handlers
    );
    expect(mockHttpHandler.handle).not.toHaveBeenCalled();
    result$.subscribe((value) => {
      expect(value).toEqual(expectedInterceptResult);
      done();
    });
  });
});

function isHttpInterceptor(object: object): object is HttpInterceptor {
  return hasProperty(object, 'intercept');
}
