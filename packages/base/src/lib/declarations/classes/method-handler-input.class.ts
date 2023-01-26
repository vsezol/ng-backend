import { HttpRequest } from '@angular/common/http';
import { isNil } from '@ng-backend/utilities';
import { MethodHandlerInputOptions } from '../interfaces/method-handler-input-options.interface';

/**
 * Class that passes to each method handler as first argument
 *
 * @group Classes
 *
 * @example
 * Work with dynamic params map
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get.id('int').authorId('int')()
 *  public getById({dynamicParamsMap}: MethodHandlerInput): void {
 *    const id: string = dynamicParamsMap.get('id');
 *    const authorId: string = dynamicParamsMap.get('authorId');
 *
 *    console.log(id, authorId); // 777 999 for request url 'todos/777/999'
 *  }
 * }
 * ```
 *
 * @example
 * Echo request url in body
 * ```ts
 * @Controller('todos')
 * class TodoController {
 *  @Get()
 *  public get({request}: MethodHandlerInput): MethodHandlerResult {
 *    return request.url;
 *  }
 * }
 * ```
 */
export class MethodHandlerInput<T = unknown> {
  public readonly request: HttpRequest<T>;
  public readonly dynamicParamsMap: Map<string, string> = new Map<
    string,
    string
  >();

  /**
   * MethodHandlerInput constructor
   * @param options
   */
  constructor(options: MethodHandlerInputOptions<T>) {
    this.request = options.request;
    if (!isNil(options.dynamicParamsMap)) {
      this.dynamicParamsMap = options.dynamicParamsMap;
    }
  }

  /**
   * Clones itself with optional options
   * @param options
   * @returns MethodHandlerInput<T>
   */
  public clone(
    options: Partial<MethodHandlerInputOptions<T>>
  ): MethodHandlerInput<T> {
    return new MethodHandlerInput({
      request: options.request ?? this.request.clone(),
      dynamicParamsMap:
        options.dynamicParamsMap ?? new Map(this.dynamicParamsMap),
    });
  }
}
