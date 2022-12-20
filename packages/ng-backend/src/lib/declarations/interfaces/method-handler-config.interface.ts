import { HttpMethod } from '../enums/http-method.enum';
import { MethodGuard } from '../types/method-guard.type';
import { MethodHandler } from '../types/method-handler.type';

export interface MethodHandlerConfig {
  key: string | symbol;
  forMethod: HttpMethod;
  canActivate: MethodGuard;
  run: MethodHandler;
}
