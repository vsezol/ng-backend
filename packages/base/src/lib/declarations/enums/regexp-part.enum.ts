export enum RegExpPart {
  Int = `-?[0-9]+`,
  Float = `-?[0-9]+\\.[0-9]+`,
  // eslint-disable-next-line no-useless-escape
  Slash = `\/`,
  Uuid = `[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}`,
  Any = '.+',
}
