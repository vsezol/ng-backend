import { RegExpPart } from '../../declarations/enums/regexp-part.enum';

export const concatUriParts = (...parts: string[]): string => {
  return parts.filter(Boolean).join(RegExpPart.Slash);
};
