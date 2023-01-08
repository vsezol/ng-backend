import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from 'base';

export const Post: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.POST);
