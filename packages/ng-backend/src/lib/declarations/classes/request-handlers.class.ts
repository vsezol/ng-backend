import { HttpRequest } from '@angular/common/http';
import { isEnumValue } from '../../functions/type-guards/is-enum-value.function';
import { HttpMethodName } from '../enums/http-method-name.enum';
import { MethodHandlerConfig } from '../interfaces/method-handler-config.interface';

export class RequestHandlers {
  public baseUrl: string = '';

  public disabled: boolean = false;

  private readonly handlerConfigByMethod: Map<
    HttpMethodName,
    MethodHandlerConfig[]
  > = new Map();

  private readonly disabledHandlersKeys: Set<string | symbol> = new Set();

  public disableHandlerByKey(key: string | symbol): void {
    this.disabledHandlersKeys.add(key);
  }

  public getHandlerConfig(
    request: HttpRequest<unknown>
  ): MethodHandlerConfig | undefined {
    if (!this.isRegisteredHttpMethod(request.method) || this.disabled) {
      return undefined;
    }

    const [config]: MethodHandlerConfig[] = this.getHandlersConfigsByMethod(
      request.method
    ).filter(
      ({ canActivate, key }: MethodHandlerConfig) =>
        !this.disabledHandlersKeys.has(key) &&
        canActivate(this.baseUrl, request.url)
    );

    return config;
  }

  public registerHandler(config: MethodHandlerConfig): void {
    this.handlerConfigByMethod.set(config.forMethod, [
      ...this.getHandlersConfigsByMethod(config.forMethod),
      config,
    ]);
  }

  private getHandlersConfigsByMethod(
    method: HttpMethodName
  ): MethodHandlerConfig[] {
    return this.handlerConfigByMethod.get(method) ?? [];
  }

  private isRegisteredHttpMethod(
    method: HttpMethodName | string
  ): method is HttpMethodName {
    return (
      isEnumValue(HttpMethodName, method) &&
      this.handlerConfigByMethod.has(method)
    );
  }
}
