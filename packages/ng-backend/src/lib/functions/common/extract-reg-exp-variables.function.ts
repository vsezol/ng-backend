export const extractRegExpVariables = (url: string, regExp: RegExp) =>
  Array.from(url.matchAll(regExp))?.[0]?.slice(1) ?? [];
