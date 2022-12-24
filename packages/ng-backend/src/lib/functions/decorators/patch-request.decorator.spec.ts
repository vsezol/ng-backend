import { HttpRequest } from '@angular/common/http';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import type { MethodHandlerResult } from '../../declarations/types/method-handler-result.type';
import { PatchRequest } from './patch-request.decorator';

describe('patch-request.decorator', () => {
  const beginUrl: string = 'BEGIN_URL';
  const beginHttpRequest: HttpRequest<void> = new HttpRequest<void>(
    HttpMethodName.GET,
    beginUrl
  );

  it('should return a MethodDecorator function', () => {
    const result = PatchRequest((request) => request);

    expect(typeof result).toBe('function');
    expect(result).toHaveLength(3);
  });

  it('should modify method by patching input HttpRequest if target method returns void', () => {
    const patchedUrl = 'PATCHED_URL';
    class Fake {
      @PatchRequest((request) =>
        request.clone({ url: request.url + patchedUrl })
      )
      public fakeFn() {}
    }

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      beginHttpRequest
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    if (result instanceof HttpRequest) {
      expect(result.url).toBe(beginUrl + patchedUrl);
    }
  });

  it('should modify method by patching target method output HttpRequest', () => {
    const patchedUrl = 'PATCHED_URL';
    const returnedUrl: string = 'RETURNED_VALUE';
    class Fake {
      @PatchRequest((request) =>
        request.clone({ url: request.url + patchedUrl })
      )
      public fakeFn(): HttpRequest<void> {
        return new HttpRequest<void>(HttpMethodName.GET, returnedUrl);
      }
    }

    const result: HttpRequest<unknown> = new Fake().fakeFn();

    expect(result).toBeInstanceOf(HttpRequest);
    expect(result.url).toBe(returnedUrl + patchedUrl);
  });

  it('should not patch anything if target method returns custom value', () => {
    const customValue: string = 'CUSTOM_VALUE';
    class Fake {
      @PatchRequest((request) => request)
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
      @PatchRequest((request) =>
        request.clone({ url: request.url + urlPatchedByDecorator })
      )
      fakeFn(request: HttpRequest<void>): MethodHandlerResult {
        return request.clone({ url: request.url + urlPatchedByMethod });
      }
    }

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      beginHttpRequest
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    if (result instanceof HttpRequest) {
      expect(result.url).toBe(
        beginUrl + urlPatchedByMethod + urlPatchedByDecorator
      );
    }
  });

  it('can be used multiple times', () => {
    const uriParts = ['FIRST', 'SECOND'];
    class Fake {
      @PatchRequest((request) =>
        request.clone({ url: request.url + uriParts[1] })
      )
      @PatchRequest((request) =>
        request.clone({ url: request.url + uriParts[0] })
      )
      public fakeFn() {}
    }

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      beginHttpRequest
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    if (result instanceof HttpRequest) {
      expect(result.url).toBe(beginUrl + uriParts.join(''));
    }
  });
});
