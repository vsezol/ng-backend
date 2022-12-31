import { UriPart } from '../api';
import { UrlParamType } from './url-param-type.type';

export type UriPartsListBuilder = {
  [key in string]: UriPartsListBuilder;
} & {
  [key in string]: (type: UrlParamType) => UriPartsListBuilder;
} & {
  (): UriPart[];
};
