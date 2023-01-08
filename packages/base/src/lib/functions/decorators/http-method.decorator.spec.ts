const mockRequestHandlers = {
  registerHandler: jest.fn(),
};

const mockRequestHandlersBuilder = {
  getRequestHandlers: jest.fn().mockReturnValue(mockRequestHandlers),
};

const mockMethodGuard = jest.fn();
const mockCreateMethodGuard = jest.fn().mockReturnValue(mockMethodGuard);

jest.mock('../../declarations/classes/request-handlers.class', () => ({
  RequestHandlers: mockRequestHandlers,
}));

jest.mock('../../declarations/classes/request-handlers-builder.class', () => ({
  RequestHandlersBuilder: mockRequestHandlersBuilder,
}));

jest.mock('../common/create-method-guard.function', () => ({
  createMethodGuard: mockCreateMethodGuard,
}));

import { DynamicUriPart } from '../../declarations/classes/dynamic-uri-part.class';
import { UriPart } from '../../declarations/classes/uri-part.class';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { RegExpPart } from '../../declarations/enums/regexp-part.enum';
import { MethodHandlerConfig } from '../../declarations/interfaces/method-handler-config.interface';
import { HttpMethod } from './http-method.decorator';

describe('http-method.decorator', () => {
  it('should call RequestHandlersBuilder.getRequestHandlers for each @HttpMethod', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Fake {
      @HttpMethod(HttpMethodName.GET)
      public firstFakeFn() {}

      @HttpMethod(HttpMethodName.POST)
      public secondFakeFn() {}
    }

    expect(mockRequestHandlersBuilder.getRequestHandlers).toHaveBeenCalledTimes(
      2
    );
  });

  it('should call RequestHandlers.registerHandler for each @HttpMethod', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Fake {
      @HttpMethod(HttpMethodName.GET)
      public firstFakeFn() {}

      @HttpMethod(HttpMethodName.POST)
      public secondFakeFn() {}
    }

    expect(mockRequestHandlers.registerHandler).toHaveBeenCalledTimes(2);
  });

  it('should call createMethodGuard for each @HttpMethod', () => {
    const firstUri = 'hello/world';
    const secondUri = 'have/a/nice/day';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Fake {
      @HttpMethod(HttpMethodName.DELETE, firstUri)
      public firstFakeFn() {}

      @HttpMethod(HttpMethodName.PUT, secondUri)
      public secondFakeFn() {}
    }

    expect(mockCreateMethodGuard).toHaveBeenCalledTimes(2);
    expect(mockCreateMethodGuard.mock.calls[0][0]).toBe(firstUri);
    expect(mockCreateMethodGuard.mock.calls[1][0]).toBe(secondUri);
  });

  it('should call RequestHandlers.registerHandler with specified options', () => {
    const methodKey = 'firstFakeFn';
    const httpMethodName = HttpMethodName.GET;
    class Fake {
      @HttpMethod(httpMethodName, 'my/name/is/van')
      public [methodKey]() {}
    }

    const exemplar = new Fake();

    const passedOptions: MethodHandlerConfig =
      mockRequestHandlers.registerHandler.mock.lastCall[0];
    const expectedOptions = expect.objectContaining<MethodHandlerConfig>({
      key: methodKey,
      canActivate: mockMethodGuard,
      forMethod: httpMethodName,
      run: exemplar[methodKey],
      routeRegExpPart: 'my/name/is/van',
      paramNames: [],
    });
    expect(mockRequestHandlers.registerHandler).toHaveBeenCalledTimes(1);
    expect(passedOptions).toEqual(expectedOptions);
  });

  it('should work with regexp', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Fake {
      @HttpMethod(HttpMethodName.GET, /url\/by\/regexp/)
      public fakeFn() {}
    }

    const passedOptions: MethodHandlerConfig =
      mockRequestHandlers.registerHandler.mock.lastCall[0];
    expect(mockRequestHandlers.registerHandler).toHaveBeenCalledTimes(1);
    expect(passedOptions.routeRegExpPart).toBe('url\\/by\\/regexp');
  });

  it('should work with UriPart array', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Fake {
      @HttpMethod(HttpMethodName.GET, [
        new UriPart('old'),
        new UriPart('but/gold'),
        new DynamicUriPart('phone', 'int'),
      ])
      public fakeFn() {}
    }

    const passedOptions: MethodHandlerConfig =
      mockRequestHandlers.registerHandler.mock.lastCall[0];
    expect(mockRequestHandlers.registerHandler).toHaveBeenCalledTimes(1);
    expect(passedOptions.routeRegExpPart).toBe(
      `old/but/gold/(${RegExpPart.Int})`
    );
  });
});
