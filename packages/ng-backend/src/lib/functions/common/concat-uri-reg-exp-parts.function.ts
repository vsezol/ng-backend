import { RegExpPart } from '../../declarations/enums/regexp-part.enum';

type Part = string | undefined | null;

export const concatUriRegExpParts = (...parts: Part[]): string => {
  return parts
    .filter((item: Part): item is string => typeof item === 'string')
    .map((part: string) =>
      part.replace(/ /gi, '').replace(/^\/+/gi, '').replace(/\/+$/gi, '')
    )
    .filter((item: string) => item.length > 0)
    .join(RegExpPart.Slash);
};
