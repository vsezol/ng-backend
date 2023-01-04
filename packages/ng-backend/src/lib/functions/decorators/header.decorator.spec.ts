const mockPatchInput: jest.Mock<MethodHandlerInputPatcher<unknown>> = jest.fn();

jest.mock('./patch-input.decorator', () => ({
  PatchInput: mockPatchInput,
}));

import { HttpRequest } from '@angular/common/http';
import { MethodHandlerInput } from '../../declarations/classes/method-handler-input.class';
import { HttpMethodName } from '../../declarations/enums/http-method-name.enum';
import { MethodHandlerInputPatcher } from '../../declarations/types/method-handler-input-patcher.type';
import { Header } from './header.decorator';

describe('header.decorator', () => {
  const baseRequest = new HttpRequest<unknown>(HttpMethodName.GET, 'FAKE_URL');

  it('should use PatchRequest', () => {
    Header('HEADER_NAME', 'HEADER_VALUE');

    expect(mockPatchInput).toHaveBeenCalledTimes(1);
  });

  it('should pass RequestPatcher function to PatchRequest', () => {
    Header('HEADER_NAME', 'HEADER_VALUE');

    const firstArgument: MethodHandlerInputPatcher<HttpRequest<unknown>> =
      mockPatchInput.mock.lastCall[0];

    expect(typeof firstArgument).toBe('function');
    expect(firstArgument).toHaveLength(1);
  });

  it('should set header by using PatchRequest', () => {
    const headerName = 'HEADER_NAME';
    const headerValue = 'HEADER_VALUE';
    Header(headerName, headerValue);
    const patcher: MethodHandlerInputPatcher<unknown> =
      mockPatchInput.mock.lastCall[0];

    const patchedInput = patcher(
      new MethodHandlerInput({ request: baseRequest })
    );

    expect(patchedInput.request.headers.has(headerName)).toBe(true);
    expect(patchedInput.request.headers.get(headerName)).toBe(headerValue);
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

    const mockPatchRequestCalls = mockPatchInput.mock.calls;
    expect(mockPatchRequestCalls).toHaveLength(2);
    mockPatchRequestCalls.forEach(
      ([patcher]: [MethodHandlerInputPatcher<unknown>], index: number) => {
        const patchedInput = patcher(
          new MethodHandlerInput({ request: baseRequest })
        );

        const [expectedName, expectedValue]: [string, string] = headers[index];
        expect(patchedInput.request.headers.get(expectedName)).toBe(
          expectedValue
        );
      }
    );
  });
});
