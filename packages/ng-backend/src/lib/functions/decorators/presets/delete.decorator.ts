import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from 'base';

export const Delete: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.DELETE);
