import { HttpMethod } from '../enums/http-method.enum';

export type CreateBaseHttpMethodDecorator = (
  method: HttpMethod,
  uri?: string
) => MethodDecorator;
