import { REG_EXP_PART_BY_URL_PARAM_TYPE } from '../../declarations/constants/reg-exp-part-by-url-param-type.const';
import { UriRegExpBuilder } from '../../declarations/types/uri-reg-exp-builder.type';
import { UrlParamType } from '../../declarations/types/url-param-type.type';
import { concatUriRegExpParts } from './concat-uri-reg-exp-parts.function';

export function createUriRegExpPartBuilder(): UriRegExpBuilder {
  const target: UriRegExpBuilder = <UriRegExpBuilder>(() => {});

  const uriParts: UriRegExpParts = new UriRegExpParts();

  return new Proxy<UriRegExpBuilder>(target, {
    apply: (
      _: unknown,
      thisArg: unknown,
      [urlParamType]: [UrlParamType] | []
    ) => {
      if (urlParamType === undefined) {
        return concatUriRegExpParts(...uriParts.getParts());
      }

      uriParts.pop();
      uriParts.addParamPart(urlParamType);

      return thisArg;
    },

    get: (_: unknown, key: string, receiver: UriRegExpBuilder) => {
      uriParts.addPart(key);

      return receiver;
    },
  });
}

class UriRegExpParts {
  private readonly parts: string[] = [];

  public getParts(): string[] {
    return this.parts;
  }

  public addPart(part: string): void {
    this.parts.push(part);
  }

  public pop(): void {
    this.parts.pop();
  }

  public addParamPart(type: UrlParamType): void {
    this.parts.push(this.getRegExpPartByUrlParamType(type));
  }

  private getRegExpPartByUrlParamType(paramType: UrlParamType): string {
    return REG_EXP_PART_BY_URL_PARAM_TYPE.get(paramType) ?? paramType;
  }
}
