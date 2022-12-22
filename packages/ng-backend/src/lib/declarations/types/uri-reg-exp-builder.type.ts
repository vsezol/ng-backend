import { UrlParam } from '../enums/url-param.enum';

export type UriRegExpBuilder = {
  [key in string]: UriRegExpBuilder;
} & {
  [key in UrlParam]: UriRegExpBuilder;
} & {
  (): string;
};
