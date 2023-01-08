import { HttpRequest } from '@angular/common/http';
import { isNil } from 'utilities';

interface Options<T> {
  request: HttpRequest<T>;
  dynamicParamsMap?: Map<string, string>;
}

export class MethodHandlerInput<T = unknown> {
  public readonly request: HttpRequest<T>;
  public readonly dynamicParamsMap: Map<string, string> = new Map<
    string,
    string
  >();

  constructor(options: Options<T>) {
    this.request = options.request;
    if (!isNil(options.dynamicParamsMap)) {
      this.dynamicParamsMap = options.dynamicParamsMap;
    }
  }

  public clone(options: Partial<Options<T>>): MethodHandlerInput<T> {
    return new MethodHandlerInput({
      request: options.request ?? this.request.clone(),
      dynamicParamsMap:
        options.dynamicParamsMap ?? new Map(this.dynamicParamsMap),
    });
  }
}
