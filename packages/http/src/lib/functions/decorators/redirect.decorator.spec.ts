/* eslint-disable @typescript-eslint/no-unused-vars */
const mockPatchInput: jest.Mock<MethodHandlerInputPatcher<unknown>> = jest.fn();

jest.mock('./patch-input.decorator', () => ({
  PatchInput: mockPatchInput,
}));

import { HttpRequest } from '@angular/common/http';
import {
  HttpMethodName,
  MethodHandlerInput,
  MethodHandlerInputPatcher,
} from '@ng-backend/base';

import { Redirect } from './redirect.decorator';

describe('redirect.decorator', () => {
  const baseUrl = 'BASE_URL';
  const baseRequest = new HttpRequest<unknown>(HttpMethodName.GET, baseUrl);

  it('should use PatchRequest', () => {
    Redirect('FAKE_URL');

    expect(mockPatchInput).toHaveBeenCalledTimes(1);
  });

  it('should pass RequestPatcher function to PatchRequest', () => {
    Redirect('FAKE_URL');

    const patcher: MethodHandlerInputPatcher<unknown> = getLastPatcher();

    expect(typeof patcher).toBe('function');
    expect(patcher).toHaveLength(1);
  });

  it('should set url by using PatchRequest', () => {
    const newUrl = 'NEW_URL';
    Redirect(newUrl);

    const patchedInput = getLastPatcher()(
      new MethodHandlerInput({ request: baseRequest })
    );

    expect(patchedInput.request.url).toBe(newUrl);
  });

  it('should patch url by using PatchRequest', () => {
    const newUrl = 'NEW_URL';
    Redirect((url) => url + newUrl);

    const patchedInput = getLastPatcher()(
      new MethodHandlerInput({ request: baseRequest })
    );

    expect(patchedInput.request.url).toBe(baseUrl + newUrl);
  });

  it('can be used multiple times', () => {
    const redirectUriParts = ['FIRST', 'SECOND'];
    class Fake {
      @Redirect((url) => url + redirectUriParts[0])
      @Redirect((url) => url + redirectUriParts[1])
      public fakeFn() {}
    }

    const mockPatchRequestCalls = mockPatchInput.mock.calls;
    expect(mockPatchRequestCalls).toHaveLength(2);
    mockPatchRequestCalls.forEach(
      ([patcher]: [MethodHandlerInputPatcher<unknown>], index: number) => {
        const patchedInput = patcher(
          new MethodHandlerInput({ request: baseRequest })
        );

        const uriPart = redirectUriParts[index];
        expect(patchedInput.request.url).toBe(baseUrl + uriPart);
      }
    );
  });

  function getLastPatcher(): MethodHandlerInputPatcher<unknown> {
    return mockPatchInput.mock.lastCall[0];
  }
});
