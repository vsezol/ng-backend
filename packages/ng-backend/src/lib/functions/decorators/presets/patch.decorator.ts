import { HttpMethodName } from '../../../declarations/enums/http-method-name.enum';
import { HttpMethodDecoratorBuilder } from '../../../declarations/types/http-method-decorator-builder.type';
import { createHttpMethodDecoratorBuilder } from '../../common/create-http-method-decorator-builder.function';

export const Patch: HttpMethodDecoratorBuilder =
  createHttpMethodDecoratorBuilder(HttpMethodName.PATCH);
