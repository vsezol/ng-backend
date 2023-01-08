import { UriPart } from '../classes/uri-part.class';
import { UrlParamType } from './url-param-type.type';

export type UriPartsListBuilder = {
  [key in string]: UriPartsListBuilder;
} & {
  [key in string]: (type: UrlParamType) => UriPartsListBuilder;
} & {
  (): UriPart[];
};
