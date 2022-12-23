import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { AutoResponseFull } from './auto-response-full.decorator';

describe('auto-response-full.decorator', () => {
  it('should return a method decorator', () => {
    const decorator = AutoResponseFull();

    expect(typeof decorator).toBe('function');
    expect(decorator).toHaveLength(3);
  });

  it('should modify the class method and returns HttpResponse instead of any value', () => {
    const originalValue: string = 'hello world';
    class Fake {
      @AutoResponseFull()
      public fakeFn() {
        return originalValue;
      }
    }

    const result: unknown = new Fake().fakeFn();

    expect(result).toBeInstanceOf(HttpResponse);
    expect(result).not.toBe(originalValue);
  });

  it('modified method should return HttpResponse with passed info', () => {
    const statusText = 'OK';
    const status = HttpStatusCode.Ok;
    const body = {
      foo: 'bar',
    };
    class Fake {
      @AutoResponseFull({
        status,
        statusText,
        body,
      })
      public fakeFn() {}
    }

    const result: unknown = new Fake().fakeFn();

    expect(result).toBeInstanceOf(HttpResponse);
    if (result instanceof HttpResponse) {
      expect(result.status).toBe(status);
      expect(result.statusText).toBe(statusText);
      expect(result.body).toEqual(body);
    }
  });
});
