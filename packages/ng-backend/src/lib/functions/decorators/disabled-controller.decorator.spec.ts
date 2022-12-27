const mockRequestHandlers = {};

const mockRequestHandlersDisabledSetter = jest.fn();

Object.defineProperty(mockRequestHandlers, 'disabled', {
  set: mockRequestHandlersDisabledSetter,
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

import { DisabledController } from './disabled-controller.decorator';

describe('disabled-controller.decorator', () => {
  it('should call RequestHandlersBuilder.getRequestHandlers for each @DisabledController', () => {
    @DisabledController
    @DisabledController
    class Fake {}

    new Fake();

    expect(mockRequestHandlersBuilder.getRequestHandlers).toHaveBeenCalledTimes(
      2
    );
  });

  it('should set RequestHandlers.disabled to true', () => {
    @DisabledController
    class Fake {}

    new Fake();

    expect(mockRequestHandlersDisabledSetter).toHaveBeenCalledWith(true);
  });

  it('should set RequestHandlers.disabled to true if even with multiply @DisabledController', () => {
    @DisabledController
    @DisabledController
    @DisabledController
    class Fake {}

    new Fake();

    expect(mockRequestHandlersDisabledSetter).toHaveBeenCalledWith(true);
    expect(mockRequestHandlersDisabledSetter).toHaveBeenCalledTimes(3);
  });
});
