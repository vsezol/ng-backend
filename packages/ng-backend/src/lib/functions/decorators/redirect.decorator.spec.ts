const mockPatchRequest: jest.Mock<RequestPatcher<unknown>> = jest.fn();

jest.mock('./patch-request.decorator', () => ({
  PatchRequest: mockPatchRequest,
}));

import { HttpRequest } from '@angular/common/http';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { RequestPatcher } from '../../declarations/types/request-patcher.type';
import { Redirect } from './redirect.decorator';

describe('redirect.decorator', () => {
  const baseUrl = 'BASE_URL';
  const baseRequest = new HttpRequest<unknown>(HttpMethodName.GET, baseUrl);

  it('should use PatchRequest', () => {
    Redirect('FAKE_URL');

    expect(mockPatchRequest).toHaveBeenCalledTimes(1);
  });

  it('should pass RequestPatcher function to PatchRequest', () => {
    Redirect('FAKE_URL');

    const firstArgument: RequestPatcher<HttpRequest<unknown>> =
      mockPatchRequest.mock.lastCall[0];

    expect(typeof firstArgument).toBe('function');
    expect(firstArgument).toHaveLength(1);
  });

  it('should set url by using PatchRequest', () => {
    const newUrl = 'NEW_URL';
    Redirect(newUrl);
    const requestPatcher: RequestPatcher<unknown> =
      mockPatchRequest.mock.lastCall[0];

    const patchedRequest = requestPatcher(baseRequest);

    expect(patchedRequest.url).toBe(newUrl);
  });

  it('should patch url by using PatchRequest', () => {
    const newUrl = 'NEW_URL';
    Redirect((url) => url + newUrl);
    const requestPatcher: RequestPatcher<unknown> =
      mockPatchRequest.mock.lastCall[0];

    const patchedRequest = requestPatcher(baseRequest);

    expect(patchedRequest.url).toBe(baseUrl + newUrl);
  });

  it('can be used multiple times', () => {
    const redirectUriParts = ['FIRST', 'SECOND'];
    class Fake {
      @Redirect((url) => url + redirectUriParts[0])
      @Redirect((url) => url + redirectUriParts[1])
      public fakeFn() {}
    }

    const mockPatchRequestCalls = mockPatchRequest.mock.calls;
    expect(mockPatchRequestCalls).toHaveLength(2);
    mockPatchRequestCalls.forEach(
      ([requestPatcher]: [RequestPatcher<unknown>], index: number) => {
        const patchedRequest = requestPatcher(baseRequest);

        const uriPart = redirectUriParts[index];
        expect(patchedRequest.url).toBe(baseUrl + uriPart);
      }
    );
  });
});
