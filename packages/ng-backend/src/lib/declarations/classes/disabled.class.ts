import { DisabledController } from '../../functions/decorators/disabled-controller.decorator';
import { DisabledHandler } from '../../functions/decorators/disabled-handler.decorator';

export class Disabled {
  public static handler: MethodDecorator = DisabledHandler;
  public static controller: ClassDecorator = DisabledController;
}
