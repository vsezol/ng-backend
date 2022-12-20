import { HttpMethod } from '../../declarations/enums/http-method.enum';
import { HttpMethodDecorator } from '../../declarations/types/http-method-decorator.type';
import { createHttpMethodDecorator } from '../common/create-http-method-decorator.function';

export const Get: HttpMethodDecorator = createHttpMethodDecorator(
  HttpMethod.GET
);
