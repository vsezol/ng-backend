import { UrlParam } from '../enums/url-param.enum';

type Callable = () => MethodDecorator;

type CallableWithUri = (uri?: string) => MethodDecorator;

type HttpMethodDecoratorBuilderBase = {
  [key in string]: HttpMethodDecoratorBuilderBase & Callable;
} & {
  [key in UrlParam]: HttpMethodDecoratorBuilderBase & Callable;
};

export type HttpMethodDecoratorBuilder = HttpMethodDecoratorBuilderBase &
  CallableWithUri;
