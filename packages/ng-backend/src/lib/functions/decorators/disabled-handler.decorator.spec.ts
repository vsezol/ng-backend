/* eslint-disable @typescript-eslint/no-unused-vars */
const mockRequestHandlers = {
  disableHandlerByKey: jest.fn(),
};

const mockRequestHandlersBuilder = {
  getRequestHandlers: jest.fn().mockReturnValue(mockRequestHandlers),
};

jest.mock('base', () => ({
  ...jest.requireActual('base'),
  RequestHandlersBuilder: mockRequestHandlersBuilder,
  RequestHandlers: mockRequestHandlers,
}));

import { DisabledHandler } from './disabled-handler.decorator';

describe('http-method.decorator', () => {
  it('should call RequestHandlersBuilder.getRequestHandlers for each @DisabledHandler', () => {
    class Fake {
      @DisabledHandler
      public firstFakeFn() {}

      @DisabledHandler
      public secondFakeFn() {}
    }

    expect(mockRequestHandlersBuilder.getRequestHandlers).toHaveBeenCalledTimes(
      2
    );
  });

  it('should call RequestHandlers.disableHandlerByKey for each @DisabledHandler', () => {
    class Fake {
      @DisabledHandler
      public firstFakeFn() {}

      @DisabledHandler
      public secondFakeFn() {}
    }

    expect(mockRequestHandlers.disableHandlerByKey).toHaveBeenCalledTimes(2);
  });

  it('should call RequestHandlers.disableHandlerByKey with method key', () => {
    const methodKey = 'fakeFn';

    class Fake {
      @DisabledHandler
      public [methodKey]() {}
    }

    expect(mockRequestHandlers.disableHandlerByKey).toHaveBeenCalledTimes(1);
    expect(mockRequestHandlers.disableHandlerByKey).toHaveBeenCalledWith(
      methodKey
    );
  });
});
