import { RegExpPart } from '../enums/regexp-part.enum';
import { UrlParamType } from '../types/url-param-type.type';

export const REG_EXP_PART_BY_URL_PARAM_TYPE: Map<UrlParamType, RegExpPart> =
  new Map([
    ['int', RegExpPart.Int],
    ['float', RegExpPart.Float],
    ['uuid', RegExpPart.Uuid],
    ['any', RegExpPart.Any],
  ]);
