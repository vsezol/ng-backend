import { HttpEvent, HttpEventType } from '@angular/common/http';
import { hasProperty, isEnumValue } from '@ng-backend/utilities';

export const isHttpEvent = (input: unknown): input is HttpEvent<unknown> =>
  typeof input === 'object' &&
  input !== null &&
  input !== undefined &&
  hasProperty(input, 'type') &&
  isEnumValue(HttpEventType, input.type);
