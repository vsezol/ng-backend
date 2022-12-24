const mockPatchRequest: jest.Mock<RequestPatcher<unknown>> = jest.fn();

jest.mock('./patch-request.decorator', () => ({
  PatchRequest: mockPatchRequest,
}));

import { HttpRequest } from '@angular/common/http';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { RequestPatcher } from '../../declarations/types/request-patcher.type';
import { Header } from './header.decorator';

describe('header.decorator', () => {
  const baseRequest = new HttpRequest<unknown>(HttpMethodName.GET, 'FAKE_URL');

  it('should use PatchRequest', () => {
    Header('HEADER_NAME', 'HEADER_VALUE');

    expect(mockPatchRequest).toHaveBeenCalledTimes(1);
  });

  it('should pass RequestPatcher function to PatchRequest', () => {
    Header('HEADER_NAME', 'HEADER_VALUE');

    const firstArgument: RequestPatcher<HttpRequest<unknown>> =
      mockPatchRequest.mock.lastCall[0];

    expect(typeof firstArgument).toBe('function');
    expect(firstArgument).toHaveLength(1);
  });

  it('should set header by using PatchRequest', () => {
    const headerName = 'HEADER_NAME';
    const headerValue = 'HEADER_VALUE';
    Header(headerName, headerValue);
    const requestPatcher: RequestPatcher<unknown> =
      mockPatchRequest.mock.lastCall[0];

    const patchedRequest = requestPatcher(baseRequest);

    expect(patchedRequest.headers.has(headerName)).toBe(true);
    expect(patchedRequest.headers.get(headerName)).toBe(headerValue);
  });

  it('should set multiply headers by using PatchRequest decorator', () => {
    const headers: [string, string][] = [
      ['HEADER1', 'VALUE1'],
      ['HEADER2', 'VALUE2'],
    ];
    class Fake {
      @Header(...headers[0])
      @Header(...headers[1])
      public fakeFn() {}
    }

    const mockPatchRequestCalls = mockPatchRequest.mock.calls;
    expect(mockPatchRequestCalls).toHaveLength(2);
    mockPatchRequestCalls.forEach(
      ([requestPatcher]: [RequestPatcher<unknown>], index: number) => {
        const patchedRequest = requestPatcher(baseRequest);

        const [expectedName, expectedValue]: [string, string] = headers[index];
        expect(patchedRequest.headers.get(expectedName)).toBe(expectedValue);
      }
    );
  });
});
