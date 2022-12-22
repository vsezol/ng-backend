import { MethodGuard } from '../../declarations/types/method-guard.type';
import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';

export const createMethodGuard =
  (routeRegExpPart: string): MethodGuard =>
  (baseRegExpPart: string, inputUriPart: string) => {
    const fullUrl: string = concatUriRegExpParts(
      baseRegExpPart,
      routeRegExpPart
    );

    const regExp: RegExp = new RegExp(`${fullUrl}$`, 'gi');
    return regExp.test(inputUriPart);
  };
