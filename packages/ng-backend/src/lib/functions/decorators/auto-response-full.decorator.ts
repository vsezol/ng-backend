import { HttpResponse } from '@angular/common/http';

export function AutoResponseFull<T extends unknown>(
  ...params: ConstructorParameters<typeof HttpResponse<T>>
): MethodDecorator {
  const resultDecorator: MethodDecorator = (
    _: object,
    __: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    descriptor.value = () => {
      return new HttpResponse<T>(...params);
    };

    return descriptor;
  };

  return resultDecorator;
}
