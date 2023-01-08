import { RequestHandlersBuilder } from 'base';
import { isClassConstructor } from 'utilities';

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
