import { HttpRequest } from '@angular/common/http';
import { HttpMethodName } from '../enums/http-method-name.enum';
import { MethodHandlerConfig } from '../interfaces/method-handler-config.interface';
import { MethodHandler } from '../types/method-handler.type';
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

  describe('getHandler', () => {
    it('getHandler returns undefined if request method is not registered', () => {
      expect(
        requestHandlers.getHandler(new HttpRequest<unknown>('GET', 'fake'))
      ).toEqual(undefined);
      expect(
        requestHandlers.getHandler(new HttpRequest<unknown>('DELETE', 'fake'))
      ).toEqual(undefined);
    });

    it('returns undefined if request handlers disabled', () => {
      const handler: MethodHandler = () => {};
      requestHandlers.registerHandler({
        forMethod: HttpMethodName.GET,
        key: 'fakeKey',
        canActivate: () => true,
        run: handler,
        routeRegExpPart: '',
        paramNames: [],
      });

      expect(
        requestHandlers.getHandler(new HttpRequest<unknown>('GET', 'fake'))
      ).toEqual(handler);

      requestHandlers.disabled = true;

      expect(
        requestHandlers.getHandler(new HttpRequest<unknown>('GET', 'fake'))
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

      const handler = requestHandlers.getHandler(
        new HttpRequest<unknown>('GET', 'fake')
      );
      expect(handler).toEqual(firstHandlerConfig.run);
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
      const handler = requestHandlers.getHandler(
        new HttpRequest<unknown>('GET', '/test')
      );

      expect(handler).toEqual(firstHandlerConfig.run);
    });

    it('returns the run function of first registered handler', () => {
      const firstRun = () => {};
      const secondRun = () => {};

      requestHandlers.registerHandler({
        canActivate: () => true,
        forMethod: HttpMethodName.DELETE,
        key: 'handler1',
        run: firstRun,
        routeRegExpPart: '',
        paramNames: [],
      });
      requestHandlers.registerHandler({
        canActivate: () => true,
        forMethod: HttpMethodName.DELETE,
        key: 'handler2',
        run: secondRun,
        routeRegExpPart: '',
        paramNames: [],
      });

      const handler = requestHandlers.getHandler(
        new HttpRequest('DELETE', 'fake')
      );
      expect(handler).toEqual(firstRun);
    });
  });
});
