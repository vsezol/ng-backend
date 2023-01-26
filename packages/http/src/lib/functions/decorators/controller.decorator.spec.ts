const mockRequestHandlersBaseUrlSetter = jest.fn();
const mockRequestHandlersGetHandlerConfig = jest.fn();

const mockHttpHandler: HttpHandler = {
  handle: jest.fn(),
};

const mockRequestHandlers = {
  getHandlerConfig: mockRequestHandlersGetHandlerConfig,
};

const mockRunMethodHandler = jest.fn();

Object.defineProperty(mockRequestHandlers, 'baseUrl', {
  set: mockRequestHandlersBaseUrlSetter,
});

const mockRequestHandlersBuilder = {
  getRequestHandlers: jest.fn().mockReturnValue(mockRequestHandlers),
};

jest.mock('@ng-backend/base', () => ({
  ...jest.requireActual('@ng-backend/base'),
  RequestHandlersBuilder: mockRequestHandlersBuilder,
  RequestHandlers: mockRequestHandlers,
  runMethodHandler: mockRunMethodHandler,
}));

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpMethodName,
  MethodHandlerConfig,
  MethodHandlerInput,
} from '@ng-backend/base';
import { hasProperty, VOID } from '@ng-backend/utilities';
import { Observable, of } from 'rxjs';
import { Controller } from './controller.decorator';

describe('controller.decorator', () => {
  const baseUrl = '/api/fake';

  const baseHandlerConfig: MethodHandlerConfig = {
    key: 'fakeKey',
    forMethod: HttpMethodName.GET,
    canActivate: () => true,
    run: () => new HttpResponse(),
    routeRegExpPart: '',
    paramNames: [],
  };

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
    mockRequestHandlersGetHandlerConfig.mockReturnValue(baseHandlerConfig);

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
    mockRequestHandlersGetHandlerConfig.mockReturnValue(undefined);

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

    mockRequestHandlersGetHandlerConfig.mockReturnValue(baseHandlerConfig);

    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();
    if (!isHttpInterceptor(testInstance)) {
      throw new Error();
    }
    const result$: Observable<HttpEvent<unknown>> = testInstance.intercept(
      request,
      mockHttpHandler
    );

    expect(mockRunMethodHandler).toHaveBeenCalledWith(
      new MethodHandlerInput({ request }),
      mockHttpHandler,
      baseHandlerConfig.run
    );
    expect(mockHttpHandler.handle).not.toHaveBeenCalled();
    result$.subscribe((value) => {
      expect(value).toEqual(expectedInterceptResult);
      done();
    });
  });

  it('should pass dynamic params map', () => {
    const request = new HttpRequest(
      'GET',
      `${baseUrl}/111/middle-part/222/333`
    );

    const handlerConfig: MethodHandlerConfig = {
      ...baseHandlerConfig,
      routeRegExpPart: `${baseUrl}/(.*)/middle-part/(.*)/(.*)`,
      paramNames: ['hello', 'world', 'bro'],
    };

    mockRequestHandlersGetHandlerConfig.mockReturnValue(handlerConfig);

    @Controller(baseUrl)
    class Test {}
    const testInstance = new Test();
    if (!isHttpInterceptor(testInstance)) {
      throw new Error();
    }
    testInstance.intercept(request, mockHttpHandler);

    expect(mockRunMethodHandler).toHaveBeenCalledWith(
      new MethodHandlerInput({
        request,
        dynamicParamsMap: new Map([
          ['hello', '111'],
          ['world', '222'],
          ['bro', '333'],
        ]),
      }),
      mockHttpHandler,
      handlerConfig.run
    );
  });

  it('should throw error if decoration target is not class constructor', () => {
    expect(() => Controller('fake')(() => VOID)).toThrowError();
  });
});

function isHttpInterceptor(object: object): object is HttpInterceptor {
  return hasProperty(object, 'intercept');
}
