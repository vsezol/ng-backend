import { isNil } from '../../functions/type-guards/is-nil.function';
import { REG_EXP_PART_BY_URL_PARAM_TYPE } from '../constants/reg-exp-part-by-url-param-type.const';
import { UrlParamType } from '../types/url-param-type.type';
import { UriPart } from './uri-part.class';

export class DynamicUriPart extends UriPart {
  public override get stringValue(): string {
    const regExpPart: string | undefined = REG_EXP_PART_BY_URL_PARAM_TYPE.get(
      this.type
    );

    return isNil(regExpPart) ? this.name : `(${regExpPart})`;
  }

  constructor(name: string, public readonly type: UrlParamType) {
    super(name);
  }
}
