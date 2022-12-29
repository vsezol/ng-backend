import { UrlParamType } from './url-param-type.type';

type Callable = () => MethodDecorator;

type CallableWithUri = (uri?: string | RegExp) => MethodDecorator;

type HttpMethodDecoratorBuilderBase = {
  [key in string]: HttpMethodDecoratorBuilderBase & Callable;
} & {
  [key in string]: (
    type: UrlParamType
  ) => HttpMethodDecoratorBuilderBase & Callable;
};

export type HttpMethodDecoratorBuilder = HttpMethodDecoratorBuilderBase &
  CallableWithUri;
