import { HttpRequest } from '@angular/common/http';
import {
  HttpMethodName,
  MethodHandlerInput,
  MethodHandlerResult,
} from '@ng-backend/base';
import { PatchInput } from './patch-input.decorator';

describe('patch-input.decorator', () => {
  const beginUrl = 'BEGIN_URL';
  const beginInput: MethodHandlerInput = new MethodHandlerInput({
    request: new HttpRequest<void>(HttpMethodName.GET, beginUrl),
  });

  it('should return a MethodDecorator function', () => {
    const result = PatchInput((request) => request);

    expect(typeof result).toBe('function');
    expect(result).toHaveLength(3);
  });

  it('should modify method by patching input HttpRequest', () => {
    const patchedUrl = 'PATCHED_URL';
    const mockMethodHandler = jest.fn();
    class Fake {
      @PatchInput((input) =>
        input.clone({
          request: input.request.clone({
            url: input.request.url + patchedUrl,
          }),
        })
      )
      public fakeFn(...args: unknown[]) {
        mockMethodHandler(...args);
      }
    }

    const fakeExemplar: Fake = new Fake();
    fakeExemplar.fakeFn.bind(fakeExemplar, beginInput)();

    const patchedInput: MethodHandlerInput = mockMethodHandler.mock.lastCall[0];

    expect(patchedInput).toBeInstanceOf(MethodHandlerInput);
    expect(patchedInput.request.url).toBe(beginUrl + patchedUrl);
  });

  it('should be ignored if method returns full new HttpRequest', () => {
    const returnedUrl = 'RETURNED_URL';
    class Fake {
      @PatchInput((input) =>
        input.clone({
          request: input.request.clone({
            url: 'PATCHED_URL',
          }),
        })
      )
      public fakeFn(): HttpRequest<void> {
        return new HttpRequest<void>(HttpMethodName.GET, returnedUrl);
      }
    }

    const fakeExemplar: Fake = new Fake();
    const result: HttpRequest<unknown> = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      beginInput
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    expect(result.url).toBe(returnedUrl);
  });

  it('should not patch anything if target method returns custom value', () => {
    const customValue = 'CUSTOM_VALUE';
    class Fake {
      @PatchInput((input) => input)
      fakeFn(): MethodHandlerResult {
        return customValue;
      }
    }

    expect(new Fake().fakeFn()).toBe(customValue);
  });

  it('should patch target method output HttpRequest that patch input HttpRequest', () => {
    const urlPatchedByDecorator = 'URL_PATCHED_BY_DECORATOR';
    const urlPatchedByMethod = 'URL_PATCHED_BY_METHOD';
    class Fake {
      @PatchInput((input) =>
        input.clone({
          request: input.request.clone({
            url: input.request.url + urlPatchedByDecorator,
          }),
        })
      )
      fakeFn({ request }: MethodHandlerInput): MethodHandlerResult {
        return request.clone({ url: request.url + urlPatchedByMethod });
      }
    }

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      beginInput
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    if (result instanceof HttpRequest) {
      expect(result.url).toBe(
        beginUrl + urlPatchedByDecorator + urlPatchedByMethod
      );
    }
  });

  it('can be used multiple times', () => {
    const uriParts = ['FIRST', 'SECOND'];
    const mockMethodHandler = jest.fn();
    class Fake {
      @PatchInput((input) =>
        input.clone({
          request: input.request.clone({
            url: input.request.url + uriParts[0],
          }),
        })
      )
      @PatchInput((input) =>
        input.clone({
          request: input.request.clone({
            url: input.request.url + uriParts[1],
          }),
        })
      )
      public fakeFn(...args: unknown[]) {
        mockMethodHandler(...args);
      }
    }

    const fakeExemplar: Fake = new Fake();
    fakeExemplar.fakeFn.bind(fakeExemplar, beginInput)();

    const patchedInput: MethodHandlerInput = mockMethodHandler.mock.lastCall[0];

    expect(patchedInput).toBeInstanceOf(MethodHandlerInput);
    expect(patchedInput.request.url).toBe(beginUrl + uriParts.join(''));
  });
});
