import { HttpEvent, HttpEventType } from '@angular/common/http';
import { hasProperty } from './has-property.function';
import { isEnumValue } from './is-enum-value.function';

export const isHttpEvent = (input: unknown): input is HttpEvent<unknown> =>
  typeof input === 'object' &&
  input !== null &&
  input !== undefined &&
  hasProperty(input, 'type') &&
  isEnumValue(HttpEventType, input.type);
