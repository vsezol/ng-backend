import { AutoResponseBody } from '../../functions/decorators/auto-response-body.decorator';
import { AutoResponseFull } from '../../functions/decorators/auto-response-full.decorator';

interface AutoResponseStructure {
  <T>(...params: Parameters<typeof AutoResponseFull<T>>): MethodDecorator;
  body: typeof AutoResponseBody;
}

const target: AutoResponseStructure = <AutoResponseStructure>(() => {});

export const AutoResponse: AutoResponseStructure =
  new Proxy<AutoResponseStructure>(target, {
    apply: <T>(
      _: unknown,
      __: unknown,
      params: Parameters<typeof AutoResponseFull<T>>
    ) => AutoResponseFull(...params),
    get(_: unknown, key: keyof AutoResponseStructure) {
      switch (key) {
        case 'body':
          return AutoResponseBody;
        default:
          throw new Error(
            `[AutoResponse] there is no decorator with name 'AutoResponse.${key}'`
          );
      }
    },
  });
