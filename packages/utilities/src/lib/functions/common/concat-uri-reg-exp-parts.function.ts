import { Nullable } from '../../declarations/types/nullable.type';

/**
 * Function that concatenates parts of uri as stringified regexp
 *
 * @param {...Nullable<string>[]}  parts - array of nullable string parts
 * @returns string - concatenated parts without falsy values
 * @group Functions
 * @category RegExp Helpers
 *
 * @example
 * ```ts
 * concatUriRegExpParts('/part1/', 'part2', '/part3/'); // 'part1/part2/part3'
 * ```
 */
export const concatUriRegExpParts = (...parts: Nullable<string>[]): string => {
  return (
    parts
      .filter(
        (item: Nullable<string>): item is string => typeof item === 'string'
      )
      .map((part: string) =>
        part.replace(/ /gi, '').replace(/^\/+/gi, '').replace(/\/+$/gi, '')
      )
      .filter((item: string) => item.length > 0)
      // eslint-disable-next-line no-useless-escape
      .join(`\/`)
  );
};
