import { HttpRequest } from '@angular/common/http';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { PatchRequest } from './patch-request.decorator';

describe('patch-request.decorator', () => {
  it('should return a MethodDecorator function', () => {
    const result = PatchRequest((request) => request);

    expect(typeof result).toBe('function');
    expect(result).toHaveLength(3);
  });

  it('should modify method by patching first argument data if target function returns void', () => {
    class Fake {
      @PatchRequest((request) => request)
      fakeFn(): void {}
    }
    const fakeHttpRequest: HttpRequest<void> = new HttpRequest<void>(
      HttpMethodName.GET,
      'fakeUrl'
    );

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      fakeHttpRequest
    )();

    expect(result).toBeInstanceOf(HttpRequest);
  });

  it('should modify method by patching target function output if output is HttpRequest argument', () => {
    const returnedFakeUrl: string = 'returnedFakeUrl';
    class Fake {
      @PatchRequest((request) => request)
      fakeFn(): HttpRequest<void> {
        return new HttpRequest<void>(HttpMethodName.GET, returnedFakeUrl);
      }
    }
    const fakeHttpRequest: HttpRequest<void> = new HttpRequest<void>(
      HttpMethodName.GET,
      'fakeUrl'
    );

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      fakeHttpRequest
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    if (result instanceof HttpRequest) {
      expect(result.url).toBe(returnedFakeUrl);
    }
  });

  it('should modify method by patching target function output if output is HttpRequest argument', () => {
    const returnedFakeUrl: string = 'returnedFakeUrl';
    class Fake {
      @PatchRequest((request) => request)
      fakeFn(): HttpRequest<void> {
        return new HttpRequest<void>(HttpMethodName.GET, returnedFakeUrl);
      }
    }
    const fakeHttpRequest: HttpRequest<void> = new HttpRequest<void>(
      HttpMethodName.GET,
      'fakeUrl'
    );

    const fakeExemplar: Fake = new Fake();
    const result: unknown = fakeExemplar.fakeFn.bind(
      fakeExemplar,
      fakeHttpRequest
    )();

    expect(result).toBeInstanceOf(HttpRequest);
    if (result instanceof HttpRequest) {
      expect(result.url).toBe(returnedFakeUrl);
    }
  });

  it.todo(
    'should not patch argument or output if target function returns custom value'
  );
});
