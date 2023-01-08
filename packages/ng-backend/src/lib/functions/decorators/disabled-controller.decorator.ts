import { isClassConstructor } from 'utilities';
import { RequestHandlersBuilder } from '../../declarations/classes/request-handlers-builder.class';

export const DisabledController: ClassDecorator = <T extends Function>(
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
