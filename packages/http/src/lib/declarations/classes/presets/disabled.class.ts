import { DisabledController } from '../../../functions/decorators/disabled-controller.decorator';
import { DisabledHandler } from '../../../functions/decorators/disabled-handler.decorator';

/**
 * Сlass that groups decorators {@link DisabledController} and {@link DisabledHandler} in itself for more convenient use
 *
 * @group Decorators
 *
 * @example
 * Simple use
 * ```ts
 * @Controller('todos')
 * @Disabled.controller
 * class TodoController {
 *  @Get()
 *  @Disabled.handler
 *  public get(): void {}
 * }
 * ```
 */
export class Disabled {
  public static handler: MethodDecorator = DisabledHandler;
  public static controller: ClassDecorator = DisabledController;
}
