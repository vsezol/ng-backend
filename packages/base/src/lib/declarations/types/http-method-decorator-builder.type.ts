import { UrlParamType } from './url-param-type.type';

type Callable = () => MethodDecorator;

type CallableWithUri = (uri?: string | RegExp) => MethodDecorator;

type HttpMethodDecoratorBuilderBase = {
  [key in string]: HttpMethodDecoratorBuilderBase & Callable;
} & {
  [key in string]: (
    type: UrlParamType
  ) => HttpMethodDecoratorBuilderBase & Callable;
};

/**
 * The type that is implemented by method handlers decorators.
 * It can be used as callable with passing url (string or regexp) or as builder.
 *
 * @returns MethodDecorator
 *
 * @example
 * ```ts
 * const builder: HttpMethodDecoratorBuilder = callSomethingThatImplementsIt();
 * builder('users/all'); // simple-style
 * builder.users.all(); // builder-style
 * ```
 *
 * Builder style supports typed params
 *
 * @example
 * Builder with typed params
 * ```ts
 * const builder: HttpMethodDecoratorBuilder = callSomethingThatImplementsIt();
 * builder.users.id('int').friends.friendId('float')();
 * ```
 * Notice: In other libraries in could be '/users/:id/friends/:friendId' \
 * but these libraries do not support dynamic param types as: int, float, uuid or any
 */
export type HttpMethodDecoratorBuilder = HttpMethodDecoratorBuilderBase &
  CallableWithUri;
