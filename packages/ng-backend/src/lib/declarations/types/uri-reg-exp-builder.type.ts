import { UrlParamType } from './url-param-type.type';

export type UriRegExpBuilder = {
  [key in string]: UriRegExpBuilder;
} & {
  [key in string]: (type: UrlParamType) => UriRegExpBuilder;
} & {
  (): string;
};
