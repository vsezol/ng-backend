import { HttpMethodName } from '../enums/http-method-name.enum';
import { MethodGuard } from '../types/method-guard.type';
import { MethodHandler } from '../types/method-handler.type';

export interface MethodHandlerConfig {
  key: string | symbol;
  forMethod: HttpMethodName;
  canActivate: MethodGuard;
  run: MethodHandler;
  routeRegExpPart: string;
  paramNames: string[];
}
