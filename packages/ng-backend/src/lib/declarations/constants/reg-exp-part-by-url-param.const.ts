import { RegExpPart } from '../enums/regexp-part.enum';
import { UrlParam } from '../enums/url-param.enum';

export const REG_EXP_PART_BY_URL_PARAM: Map<UrlParam, RegExpPart> = new Map([
  [UrlParam.Int, RegExpPart.Int],
  [UrlParam.Float, RegExpPart.Float],
  [UrlParam.Uuid, RegExpPart.Uuid],
  [UrlParam.Any, RegExpPart.Any],
]);
