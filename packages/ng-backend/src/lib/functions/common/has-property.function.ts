export const hasProperty = <T extends object, K extends string>(
  input: T,
  property: K
): input is T & Record<K, unknown> => input.hasOwnProperty(property);
