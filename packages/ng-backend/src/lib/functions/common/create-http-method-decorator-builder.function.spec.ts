const mockHttpMethod = jest.fn().mockReturnValue(() => {});

jest.mock('../decorators/http-method.decorator', () => {
  return {
    HttpMethod: mockHttpMethod,
  };
});

import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { RegExpPart } from '../../declarations/enums/regexp-part.enum';
import { HttpMethodDecoratorBuilder } from '../../declarations/types/http-method-decorator-builder.type';
import { createHttpMethodDecoratorBuilder } from './create-http-method-decorator-builder.function';

describe('create-http-method-decorator-builder.function', () => {
  it('should return callable object that returns function', () => {
    const builder: HttpMethodDecoratorBuilder =
      createHttpMethodDecoratorBuilder(HttpMethodName.GET);

    const result: MethodDecorator = builder();

    expect(typeof result === 'function').toBe(true);
  });

  it('should return object that works like UriRegExpBuilder and returns function', () => {
    const builder: HttpMethodDecoratorBuilder =
      createHttpMethodDecoratorBuilder(HttpMethodName.POST);

    const result: MethodDecorator = builder.hello._float_._any_._uuid_();

    expect(typeof result === 'function').toBe(true);
  });

  describe('HttpMethod call', () => {
    it('should return callable that calls HttpMethod decorator after call', () => {
      const builder: HttpMethodDecoratorBuilder =
        createHttpMethodDecoratorBuilder(HttpMethodName.PATCH);

      builder();

      expect(mockHttpMethod).toHaveBeenCalledTimes(1);
      expect(mockHttpMethod).toHaveBeenCalledWith(HttpMethodName.PATCH, '');
    });

    it('should return callable that calls HttpMethod decorator after call with using UriRegExpBuilder', () => {
      const builder: HttpMethodDecoratorBuilder =
        createHttpMethodDecoratorBuilder(HttpMethodName.GET);

      builder.hello.my.brothers.i.want.to.ask.you.about.my.phone.number._int_();

      expect(mockHttpMethod).toHaveBeenCalledTimes(1);
      expect(mockHttpMethod).toHaveBeenCalledWith(
        HttpMethodName.GET,
        `hello/my/brothers/i/want/to/ask/you/about/my/phone/number/${RegExpPart.Int}`
      );
    });
  });
});
