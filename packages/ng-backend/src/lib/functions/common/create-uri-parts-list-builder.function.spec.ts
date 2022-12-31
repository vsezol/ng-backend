import { DynamicUriPart } from '../../declarations/classes/dynamic-uri-part.class';
import { UriPart } from '../../declarations/classes/uri-part.class';
import { UriPartsListBuilder } from '../../declarations/types/uri-parts-list-builder.type';
import { createUriRegExpPartsBuilder } from './create-uri-parts-list-builder.function';

describe('create-uri-parts-list-builder.function', () => {
  let builder: UriPartsListBuilder;

  beforeEach(() => {
    builder = createUriRegExpPartsBuilder();
  });

  it('should work with multiple parts', () => {
    const regExpPart: UriPart[] = builder.user.friends.and.my.dog();

    expect(regExpPart).toEqual([
      new UriPart('user'),
      new UriPart('friends'),
      new UriPart('and'),
      new UriPart('my'),
      new UriPart('dog'),
    ]);
  });

  it('should return empty string if there are no parts', () => {
    const regExpPart: UriPart[] = builder();

    expect(regExpPart).toEqual([]);
  });

  it('should return parameters regexp parts with other parts', () => {
    const regExpPart: UriPart[] = builder.first
      .param1('any')
      .second.param2('uuid')
      .third();

    expect(regExpPart).toEqual([
      new UriPart('first'),
      new DynamicUriPart('param1', 'any'),
      new UriPart('second'),
      new DynamicUriPart('param2', 'uuid'),
      new UriPart('third'),
    ]);
  });

  it('should works with every param type', () => {
    const uri: UriPart[] = builder.p1('int').p2('float').p3('uuid').p4('any')();

    expect(uri).toEqual([
      new DynamicUriPart('p1', 'int'),
      new DynamicUriPart('p2', 'float'),
      new DynamicUriPart('p3', 'uuid'),
      new DynamicUriPart('p4', 'any'),
    ]);
  });
});
