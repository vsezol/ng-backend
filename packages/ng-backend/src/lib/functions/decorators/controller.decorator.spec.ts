const mockRequestHandlersBaseUrlSetter = jest.fn();
const mockRequestHandlersGetHandler = jest.fn();

const mockHttpHandler: HttpHandler = {
  handle: jest.fn(),
};

const mockRequestHandlers = {
  getHandler: mockRequestHandlersGetHandler,
};

const mockRunMethodHandler = jest.fn();

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

jest.mock('../../functions/common/run-method-handler.function', () => ({
  runMethodHandler: mockRunMethodHandler,
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
    mockRequestHandlersGetHandler.mockReturnValue(() => new HttpResponse());

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
    mockRequestHandlersGetHandler.mockReturnValue(undefined);

    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();
    if (!isHttpInterceptor(testInstance)) {
      throw new Error();
    }
    testInstance.intercept(request, mockHttpHandler);

    expect(mockHttpHandler.handle).toHaveBeenCalledWith(request);
  });

  it('should return runMethodHandler call output if there is at least one registered handler', (done) => {
    const request = new HttpRequest('GET', `${baseUrl}/hello`);
    const expectedInterceptResult = new HttpResponse({
      body: 'HELLO FROM TEST',
    });
    mockRunMethodHandler.mockReturnValue(of(expectedInterceptResult));
    const handler: MethodHandler = () => new HttpResponse();
    mockRequestHandlersGetHandler.mockReturnValue(handler);

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

    expect(mockRunMethodHandler).toHaveBeenCalledWith(
      request,
      mockHttpHandler,
      handler
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
