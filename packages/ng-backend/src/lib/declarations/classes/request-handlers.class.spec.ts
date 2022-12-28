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

  describe('getHandlers', () => {
    it('getHandlers returns empty array if request method is not registered', () => {
      expect(
        requestHandlers.getHandlers(new HttpRequest<unknown>('GET', 'fake'))
      ).toEqual([]);
      expect(
        requestHandlers.getHandlers(new HttpRequest<unknown>('DELETE', 'fake'))
      ).toEqual([]);
    });

    it('getHandlers returns empty array if request handlers disabled', () => {
      const handler: MethodHandler = () => {};
      requestHandlers.registerHandler({
        forMethod: HttpMethodName.GET,
        key: 'fakeKey',
        canActivate: () => true,
        run: handler,
      });

      expect(
        requestHandlers.getHandlers(new HttpRequest<unknown>('GET', 'fake'))
      ).toEqual([handler]);

      requestHandlers.disabled = true;

      expect(
        requestHandlers.getHandlers(new HttpRequest<unknown>('GET', 'fake'))
      ).toEqual([]);
    });

    it('getHandlers filters out disabled handlers', () => {
      const firstHandlerConfig: MethodHandlerConfig = {
        canActivate: () => true,
        forMethod: HttpMethodName.GET,
        key: 'handler1',
        run: () => 1,
      };

      const secondHandlerConfig: MethodHandlerConfig = {
        canActivate: () => true,
        forMethod: HttpMethodName.GET,
        key: 'handler2',
        run: () => 2,
      };

      requestHandlers.registerHandler(firstHandlerConfig);
      requestHandlers.registerHandler(secondHandlerConfig);

      requestHandlers.disableHandlerByKey(secondHandlerConfig.key);

      const handlers = requestHandlers.getHandlers(
        new HttpRequest<unknown>('GET', 'fake')
      );
      expect(handlers).toEqual([firstHandlerConfig.run]);
    });

    it('getHandlers filters out handlers based on canActivate', () => {
      const baseUrl = 'http://example.com';

      requestHandlers.baseUrl = baseUrl;

      const firstHandlerConfig: MethodHandlerConfig = {
        canActivate: (base, url) => base === baseUrl && url === '/test',
        forMethod: HttpMethodName.GET,
        key: 'handler1',
        run: () => 1,
      };
      const secondHandlerConfig: MethodHandlerConfig = {
        canActivate: (base, url) => base === baseUrl && url === '/other',
        forMethod: HttpMethodName.GET,
        key: 'handler2',
        run: () => 2,
      };

      requestHandlers.registerHandler(firstHandlerConfig);
      requestHandlers.registerHandler(secondHandlerConfig);
      const handlers = requestHandlers.getHandlers(
        new HttpRequest<unknown>('GET', '/test')
      );

      expect(handlers).toEqual([firstHandlerConfig.run]);
    });

    it('getHandlers returns the run function of each enabled handler', () => {
      const firstRun = () => {};
      const secondRun = () => {};

      requestHandlers.registerHandler({
        canActivate: () => true,
        forMethod: HttpMethodName.DELETE,
        key: 'handler1',
        run: firstRun,
      });
      requestHandlers.registerHandler({
        canActivate: () => true,
        forMethod: HttpMethodName.DELETE,
        key: 'handler2',
        run: secondRun,
      });

      const handlers = requestHandlers.getHandlers(
        new HttpRequest('DELETE', 'fake')
      );
      expect(handlers).toEqual([firstRun, secondRun]);
    });
  });
});
