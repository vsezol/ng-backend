import { UriPart, UrlParamType } from 'ng-backend/internal';

export type UriPartsListBuilder = {
  [key in string]: UriPartsListBuilder;
} & {
  [key in string]: (type: UrlParamType) => UriPartsListBuilder;
} & {
  (): UriPart[];
};
