class FakeRequestHandlers {}
const mockRequestHandlers = jest
  .fn()
  .mockReturnValue(new FakeRequestHandlers());

jest.mock('./request-handlers.class', () => ({
  RequestHandlers: mockRequestHandlers,
}));

import { RequestHandlersBuilder } from './request-handlers-builder.class';

describe('request-handlers-builder.class', () => {
  describe('hasRequestHandlers', () => {
    it('should return true for an object that has RequestHandlers defined', () => {
      const instance = {};

      RequestHandlersBuilder.defineRequestHandlers(instance);

      expect(RequestHandlersBuilder.hasRequestHandlers(instance)).toBe(true);
    });

    it('should return false for an object that does not have RequestHandlers defined', () => {
      const instance = {};

      expect(RequestHandlersBuilder.hasRequestHandlers(instance)).toBe(false);
    });
  });

  describe('defineRequestHandlers', () => {
    it('should create RequestHandlers exemplar', () => {
      const instance = {};

      const requestHandlers =
        RequestHandlersBuilder.defineRequestHandlers(instance);

      expect(mockRequestHandlers).toHaveBeenCalled();
      expect(requestHandlers).toBeInstanceOf(FakeRequestHandlers);
    });

    it('should define RequestHandlers for a given object', () => {
      const instance = {};

      RequestHandlersBuilder.defineRequestHandlers(instance);

      expect(RequestHandlersBuilder.hasRequestHandlers(instance)).toBe(true);
    });
  });

  describe('getRequestHandlers', () => {
    it('should return the correct RequestHandlers instance and define RequestHandlers', () => {
      const instance = {};

      const requestHandlers =
        RequestHandlersBuilder.getRequestHandlers(instance);

      expect(requestHandlers).toBeInstanceOf(FakeRequestHandlers);
      expect(RequestHandlersBuilder.hasRequestHandlers(instance)).toBe(true);
    });
  });
});
