import { UrlParam } from '../enums/url-param.enum';

export type UriRegExpBuilder = {
  [key in Exclude<string, UrlParam>]: UriRegExpBuilder;
} & {
  [key in UrlParam]: UriRegExpBuilder;
} & {
  (): string;
};
