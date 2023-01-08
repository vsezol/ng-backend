import { HttpRequest } from '@angular/common/http';
import { HttpMethodName } from '../enums/http-method-name.enum';
import { MethodHandlerConfig } from '../interfaces/method-handler-config.interface';
import { RequestHandlers } from './request-handlers.class';

describe('request-handlers.class', () => {
  let requestHandlers: RequestHandlers;

  beforeEach(() => {
    requestHandlers = new RequestHandlers();
  });

  describe('initialization', () => {
    it('baseUrl is correctly initialized', () => {
      expect(requestHandlers.baseUrl).toBe('');
    });

    it('disabled is correctly initialized', () => {
      expect(requestHandlers.disabled).toBe(false);
    });
  });

  describe('getHandlerConfig', () => {
    it('returns undefined if request method is not registered', () => {
      expect(
        requestHandlers.getHandlerConfig(
          new HttpRequest<unknown>('GET', 'fake')
        )
      ).toEqual(undefined);
      expect(
        requestHandlers.getHandlerConfig(
          new HttpRequest<unknown>('DELETE', 'fake')
        )
      ).toEqual(undefined);
    });

    it('returns undefined if request handlers disabled', () => {
      const config: MethodHandlerConfig = {
        forMethod: HttpMethodName.GET,
        key: 'fakeKey',
        canActivate: () => true,
        run: () => {},
        routeRegExpPart: '',
        paramNames: [],
      };
      requestHandlers.registerHandler(config);

      expect(
        requestHandlers.getHandlerConfig(
          new HttpRequest<unknown>('GET', 'fake')
        )
      ).toEqual(config);

      requestHandlers.disabled = true;

      expect(
        requestHandlers.getHandlerConfig(
          new HttpRequest<unknown>('GET', 'fake')
        )
      ).toEqual(undefined);
    });

    it('filters out disabled handlers', () => {
      const firstHandlerConfig: MethodHandlerConfig = {
        canActivate: () => true,
        forMethod: HttpMethodName.GET,
        key: 'handler1',
        run: () => 1,
        routeRegExpPart: '',
        paramNames: [],
      };

      const secondHandlerConfig: MethodHandlerConfig = {
        canActivate: () => true,
        forMethod: HttpMethodName.GET,
        key: 'handler2',
        run: () => 2,
        routeRegExpPart: '',
        paramNames: [],
      };

      requestHandlers.registerHandler(firstHandlerConfig);
      requestHandlers.registerHandler(secondHandlerConfig);

      requestHandlers.disableHandlerByKey(secondHandlerConfig.key);

      const handlerConfig = requestHandlers.getHandlerConfig(
        new HttpRequest<unknown>('GET', 'fake')
      );
      expect(handlerConfig).toEqual(firstHandlerConfig);
    });

    it('filters out handlers based on canActivate', () => {
      const baseUrl = 'http://example.com';

      requestHandlers.baseUrl = baseUrl;

      const firstHandlerConfig: MethodHandlerConfig = {
        canActivate: (base, url) => base === baseUrl && url === '/test',
        forMethod: HttpMethodName.GET,
        key: 'handler1',
        run: () => 1,
        routeRegExpPart: '',
        paramNames: [],
      };
      const secondHandlerConfig: MethodHandlerConfig = {
        canActivate: (base, url) => base === baseUrl && url === '/other',
        forMethod: HttpMethodName.GET,
        key: 'handler2',
        run: () => 2,
        routeRegExpPart: '',
        paramNames: [],
      };

      requestHandlers.registerHandler(firstHandlerConfig);
      requestHandlers.registerHandler(secondHandlerConfig);
      const handlerConfig = requestHandlers.getHandlerConfig(
        new HttpRequest<unknown>('GET', '/test')
      );

      expect(handlerConfig).toEqual(firstHandlerConfig);
    });

    it('returns the run function of first registered handler', () => {
      const firstConfig: MethodHandlerConfig = {
        canActivate: () => true,
        forMethod: HttpMethodName.DELETE,
        key: 'handler1',
        run: () => {},
        routeRegExpPart: '',
        paramNames: [],
      };
      const secondConfig: MethodHandlerConfig = {
        canActivate: () => true,
        forMethod: HttpMethodName.DELETE,
        key: 'handler2',
        run: () => {},
        routeRegExpPart: '',
        paramNames: [],
      };

      requestHandlers.registerHandler(firstConfig);
      requestHandlers.registerHandler(secondConfig);

      const handlerConfig = requestHandlers.getHandlerConfig(
        new HttpRequest('DELETE', 'fake')
      );
      expect(handlerConfig).toEqual(firstConfig);
    });
  });
});
