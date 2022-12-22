import { UrlParam } from '../enums/url-param.enum';

type Callable = () => MethodDecorator;

type CallableWithUri = (uri?: string) => MethodDecorator;

type HttpMethodDecoratorUriBuilder = {
  [key in string]: HttpMethodDecoratorUriBuilder & Callable;
} & {
  [key in UrlParam]: HttpMethodDecoratorUriBuilder & Callable;
};

export type HttpMethodDecorator = HttpMethodDecoratorUriBuilder &
  CallableWithUri;
