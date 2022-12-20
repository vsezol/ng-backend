import { HttpRequest } from '@angular/common/http';
import { isEnumValue } from '../../functions/common/is-enum-value.function';
import { HttpMethod } from '../enums/http-method.enum';
import { MethodHandlerConfig } from '../interfaces/method-handler-config.interface';
import { MethodHandler } from '../types/method-handler.type';

export class RequestHandlers {
  public baseUrl: string = '';

  public disabled: boolean = false;

  private readonly handlerConfigByMethod: Map<
    HttpMethod,
    MethodHandlerConfig[]
  > = new Map();

  private readonly disabledHandlersKeys: Set<string | symbol> = new Set();

  public disableHandlerByKey(key: string | symbol): void {
    this.disabledHandlersKeys.add(key);
  }

  public getHandlers(request: HttpRequest<unknown>): MethodHandler[] {
    if (!this.isRegisteredHttpMethod(request.method) || this.disabled) {
      return [];
    }

    const handlers: MethodHandler[] = this.getHandlersConfigsByMethod(
      request.method
    )
      .filter(
        ({ canActivate, key }: MethodHandlerConfig) =>
          !this.disabledHandlersKeys.has(key) &&
          canActivate(this.baseUrl, request.url)
      )
      .map(({ run }: MethodHandlerConfig) => run);

    return handlers;
  }

  public registerHandler(config: MethodHandlerConfig): void {
    this.handlerConfigByMethod.set(config.forMethod, [
      ...this.getHandlersConfigsByMethod(config.forMethod),
      config,
    ]);
  }

  private getHandlersConfigsByMethod(
    method: HttpMethod
  ): MethodHandlerConfig[] {
    return this.handlerConfigByMethod.get(method) ?? [];
  }

  private isRegisteredHttpMethod(
    method: HttpMethod | string
  ): method is HttpMethod {
    return (
      isEnumValue(HttpMethod, method) && this.handlerConfigByMethod.has(method)
    );
  }
}
