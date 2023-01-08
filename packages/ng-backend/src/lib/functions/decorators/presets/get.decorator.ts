import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from 'base';

export const Get: HttpMethodDecoratorBuilder = createHttpMethodDecoratorBuilder(
  HttpMethodName.GET
);
