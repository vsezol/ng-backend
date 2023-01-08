const mockHttpHandler: HttpHandler = {
  handle: jest.fn(),
};

import {
  HttpEventType,
  HttpHandler,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { MethodHandlerInput } from '../../declarations/classes/method-handler-input.class';
import { runMethodHandler } from './run-method-handler.function';

describe('runMethodHandler', () => {
  let baseRequest: HttpRequest<unknown>;

  beforeEach(() => {
    baseRequest = new HttpRequest<unknown>('GET', '/hello/world');
  });

  it('returns next.handle when handler returns undefined', () => {
    runMethodHandler(
      new MethodHandlerInput({ request: baseRequest }),
      mockHttpHandler,
      () => undefined
    ).subscribe();

    expect(mockHttpHandler.handle).toHaveBeenCalledWith(baseRequest);
  });

  it('returns next.handle when handler returns HttpRequest', () => {
    runMethodHandler(
      new MethodHandlerInput({ request: baseRequest }),
      mockHttpHandler,
      () => baseRequest
    ).subscribe();

    expect(mockHttpHandler.handle).toHaveBeenCalledWith(baseRequest);
  });

  it('returns of(HttpEvent) when handler returns HttpEvent', (done) => {
    const progressEvent: HttpProgressEvent = {
      type: HttpEventType.DownloadProgress,
      total: 10,
      loaded: 4,
    };

    runMethodHandler(
      new MethodHandlerInput({ request: baseRequest }),
      mockHttpHandler,
      () => progressEvent
    ).subscribe((event) => {
      expect(event).toEqual(progressEvent);
      done();
    });
  });

  it('returns of(HttpResponse) when handler returns basic result', () => {
    const handlerResult = {
      age: 20,
      name: 'Vsevolod Zolotov',
    };

    runMethodHandler(
      new MethodHandlerInput({ request: baseRequest }),
      mockHttpHandler,
      () => handlerResult
    ).subscribe((event) => {
      expect(event).toEqual(new HttpResponse<unknown>({ body: handlerResult }));
    });
  });

  it('returns error if handler throws an exception', () => {
    const errorMessage = 'FAKE_ERROR_MESSAGE';
    const handler = () => {
      throw new Error(errorMessage);
    };

    runMethodHandler(
      new MethodHandlerInput({ request: baseRequest }),
      mockHttpHandler,
      handler
    ).subscribe({
      next: () => fail('should have thrown an error'),
      error: (error) => expect(error.message).toEqual(errorMessage),
    });
  });
});
