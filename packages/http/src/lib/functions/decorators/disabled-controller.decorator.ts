import { RequestHandlersBuilder } from '@ng-backend/base';
import { isClassConstructor } from '@ng-backend/utilities';

/**
 * Decorator that disables interceptor functionality added by {@link Controller}
 *
 * @group Decorators
 *
 * @example
 * Simple use
 * ```ts
 * @Controller('todos')
 * @DisabledController
 * class TodoController {}
 * ```
 */
export const DisabledController: ClassDecorator = <T extends NewableFunction>(
  classConstructorReference: T
): T => {
  if (!isClassConstructor(classConstructorReference)) {
    throw new Error(`Unexpected decoration target is detected.`);
  }

  return class extends classConstructorReference {
    constructor(...options: unknown[]) {
      super(...options);

      RequestHandlersBuilder.getRequestHandlers(this).disabled = true;
    }
  };
};
