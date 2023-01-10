import { VOID } from 'utilities';
import { AutoResponseBody } from '../../functions/decorators/auto-response-body.decorator';
import { AutoResponseFull } from '../../functions/decorators/auto-response-full.decorator';

interface AutoResponseStructure {
  <T>(...params: Parameters<typeof AutoResponseFull<T>>): MethodDecorator;
  body: typeof AutoResponseBody;
}

const target: AutoResponseStructure = <AutoResponseStructure>(() => VOID);

/**
 * Proxy that groups decorators {@link AutoResponseFull} and {@link AutoResponseBody} in itself for more convenient use
 *
 * @group Decorators
 *
 * @example
 * Sending response with options
 * ```ts
 * @Controller('todos')
 * @Disabled.controller
 * class TodoController {
 *  @Get()
 *  @AutoResponse({
 *    body: {
 *      name: 'Vsevolod',
 *      age: 20
 *    },
 *    status: 200
 *  })
 *  @Disabled.handler
 *  public get(): void {}
 * }
 * ```
 *
 * @example
 * Sending response with body
 * ```ts
 * @Controller('todos')
 * @Disabled.controller
 * class TodoController {
 *  @Get()
 *  @AutoResponse.body({
 *    name: 'Vsevolod',
 *    age: 20
 *  })
 *  @Disabled.handler
 *  public get(): void {}
 * }
 * ```
 */
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
