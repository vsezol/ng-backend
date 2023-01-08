import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from 'base';

export const Patch: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.PATCH);
