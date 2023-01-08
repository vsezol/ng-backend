import { HttpMethodName } from 'ng-backend/internal';
import { HttpMethodDecoratorBuilder } from '../../../../internal/declarations/types/http-method-decorator-builder.type';
import { createHttpMethodDecoratorBuilder } from '../../../../internal/functions/common/create-http-method-decorator-builder.function';

export const Get: HttpMethodDecoratorBuilder = createHttpMethodDecoratorBuilder(
  HttpMethodName.GET
);
