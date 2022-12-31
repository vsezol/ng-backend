export class UriPart {
  public get stringValue() {
    return this.name;
  }

  constructor(public readonly name: string) {}
}
