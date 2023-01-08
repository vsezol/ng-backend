import {
  createHttpMethodDecoratorBuilder,
  HttpMethodDecoratorBuilder,
  HttpMethodName,
} from 'base';

export const Put: HttpMethodDecoratorBuilder = createHttpMethodDecoratorBuilder(
  HttpMethodName.PUT
);
