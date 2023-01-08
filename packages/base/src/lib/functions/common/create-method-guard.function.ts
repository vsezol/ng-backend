import { concatUriRegExpParts } from 'utilities';
import { MethodGuard } from '../../declarations/types/method-guard.type';

export const createMethodGuard =
  (routeRegExpPart: string): MethodGuard =>
  (baseRegExpPart: string, inputUriPart: string) => {
    const fullUrl: string = concatUriRegExpParts(
      baseRegExpPart,
      routeRegExpPart
    );

    const regExp = new RegExp(`${fullUrl}$`, 'gi');
    return regExp.test(inputUriPart);
  };
