import { HttpEvent, HttpEventType } from '@angular/common/http';
import { hasProperty } from '../type-guards/has-property.function';
import { isEnumValue } from '../type-guards/is-enum-value.function';

export const isHttpEvent = (input: unknown): input is HttpEvent<unknown> =>
  typeof input === 'object' &&
  input !== null &&
  input !== undefined &&
  hasProperty(input, 'type') &&
  isEnumValue(HttpEventType, input.type);
