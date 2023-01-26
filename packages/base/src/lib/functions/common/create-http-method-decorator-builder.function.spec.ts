const mockHttpMethod = jest.fn().mockReturnValue(() => VOID);

jest.mock('../decorators/http-method.decorator', () => {
  return {
    HttpMethod: mockHttpMethod,
  };
});

import { VOID } from '@ng-backend/utilities';
import { DynamicUriPart } from '../../declarations/classes/dynamic-uri-part.class';
import { UriPart } from '../../declarations/classes/uri-part.class';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { HttpMethodDecoratorBuilder } from '../../declarations/types/http-method-decorator-builder.type';
import { createHttpMethodDecoratorBuilder } from './create-http-method-decorator-builder.function';

describe('create-http-method-decorator-builder.function', () => {
  it('should return callable object that returns function', () => {
    const builder: HttpMethodDecoratorBuilder =
      createHttpMethodDecoratorBuilder(HttpMethodName.GET);

    const result: MethodDecorator = builder();

    expect(typeof result).toBe('function');
  });

  it('should return object that works like UriRegExpBuilder and returns function', () => {
    const builder: HttpMethodDecoratorBuilder =
      createHttpMethodDecoratorBuilder(HttpMethodName.POST);

    const result: MethodDecorator = builder.hello
      .param1('float')
      .param2('any')
      .param3('uuid')();

    expect(typeof result).toBe('function');
  });

  describe('HttpMethod call', () => {
    it('should return callable that calls HttpMethod decorator after call', () => {
      const builder: HttpMethodDecoratorBuilder =
        createHttpMethodDecoratorBuilder(HttpMethodName.PATCH);

      builder();

      expect(mockHttpMethod).toHaveBeenCalledTimes(1);
      expect(mockHttpMethod).toHaveBeenCalledWith(HttpMethodName.PATCH, []);
    });

    it('should return callable that calls HttpMethod decorator after call with using UriRegExpBuilder', () => {
      const builder: HttpMethodDecoratorBuilder =
        createHttpMethodDecoratorBuilder(HttpMethodName.GET);

      builder.hello.my.brothers
        .id('float')
        .i.want.to.ask.you.about.my.phone.number('int')();

      expect(mockHttpMethod).toHaveBeenCalledTimes(1);
      expect(mockHttpMethod).toHaveBeenCalledWith(
        HttpMethodName.GET,
        expect.arrayContaining([
          new UriPart('hello'),
          new UriPart('my'),
          new UriPart('brothers'),
          new DynamicUriPart('id', 'float'),
          new UriPart('i'),
          new UriPart('want'),
          new UriPart('to'),
          new UriPart('ask'),
          new UriPart('you'),
          new UriPart('about'),
          new UriPart('my'),
          new UriPart('phone'),
          new DynamicUriPart('number', 'int'),
        ])
      );
    });
  });
});
