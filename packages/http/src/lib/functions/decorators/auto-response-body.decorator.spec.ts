import { HttpResponse } from '@angular/common/http';
import { AutoResponseBody } from './auto-response-body.decorator';

describe('auto-response-body.decorator', () => {
  it('should return a MethodDecorator function', () => {
    const decorator = AutoResponseBody({});

    expect(typeof decorator).toBe('function');
    expect(decorator).toHaveLength(3);
  });

  it('should modify the class method and returns HttpResponse instead of any value', () => {
    const originalValue = 'hello world';
    class Fake {
      @AutoResponseBody({})
      public fakeFn() {
        return originalValue;
      }
    }

    const result: unknown = new Fake().fakeFn();

    expect(result).toBeInstanceOf(HttpResponse);
    expect(result).not.toBe(originalValue);
  });

  it('modified method should return HttpResponse with passed body', () => {
    const body = {
      foo: 'bar',
    };
    class Fake {
      @AutoResponseBody(body)
      public fakeFn() {}
    }

    const result: unknown = new Fake().fakeFn();

    expect(result).toBeInstanceOf(HttpResponse);
    if (result instanceof HttpResponse) {
      expect(result.body).toEqual(body);
    }
  });
});
