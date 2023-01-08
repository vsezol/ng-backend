import { HttpRequest } from '@angular/common/http';
import { MethodHandlerInput } from './method-handler-input.class';

describe('method-handler-input.class', () => {
  const request: HttpRequest<unknown> = new HttpRequest<unknown>(
    'GET',
    'fake/url'
  );

  it('creates an instance with a request and an empty dynamic params map', () => {
    const input = new MethodHandlerInput({ request });

    expect(input.request).toBe(request);
    expect(input.dynamicParamsMap).toEqual(new Map());
  });

  it('creates an instance with a request and a dynamic params map', () => {
    const dynamicParamsMap = new Map([['key', 'value']]);

    const input = new MethodHandlerInput({ request, dynamicParamsMap });

    expect(input.request).toBe(request);
    expect(input.dynamicParamsMap).toEqual(dynamicParamsMap);
  });

  it('clones an instance with a new request and the same dynamic params map', () => {
    const dynamicParamsMap = new Map([['key', 'value']]);
    const newRequest = new HttpRequest<unknown>('DELETE', 'new/fake/url');

    const input = new MethodHandlerInput({ request, dynamicParamsMap });
    const clonedInput = input.clone({ request: newRequest });

    expect(clonedInput).toBeInstanceOf(MethodHandlerInput);
    expect(clonedInput).not.toBe(input);
    expect(clonedInput.request).toEqual(newRequest);
    expect(clonedInput.dynamicParamsMap).toEqual(dynamicParamsMap);
  });

  it('clones an instance with the same request and a new dynamic params map', () => {
    const dynamicParamsMap = new Map([['key', 'value']]);
    const newDynamicParamsMap = new Map([['key2', 'value2']]);

    const input = new MethodHandlerInput({ request, dynamicParamsMap });
    const clonedInput = input.clone({ dynamicParamsMap: newDynamicParamsMap });

    expect(clonedInput).toBeInstanceOf(MethodHandlerInput);
    expect(clonedInput).not.toBe(input);
    expect(clonedInput.request).toEqual(request);
    expect(clonedInput.dynamicParamsMap).toEqual(newDynamicParamsMap);
  });
});
