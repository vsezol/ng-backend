import { HttpRequest } from '@angular/common/http';

/**
 * Interface that is used by MethodHandlerInput for init and clone
 */
export interface MethodHandlerInputOptions<T> {
  request: HttpRequest<T>;
  dynamicParamsMap?: Map<string, string>;
}
