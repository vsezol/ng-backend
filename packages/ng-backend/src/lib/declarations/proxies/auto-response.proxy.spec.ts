const mockAutoResponseFull = jest.fn();
const mockAutoResponseBody = jest.fn();

jest.mock('../../functions/decorators/auto-response-body.decorator', () => ({
  AutoResponseBody: mockAutoResponseBody,
}));

jest.mock('../../functions/decorators/auto-response-full.decorator', () => ({
  AutoResponseFull: mockAutoResponseFull,
}));

import { HttpHeaders } from '@angular/common/http';
import { AutoResponse } from './auto-response.proxy';

describe('auto-response.proxy', () => {
  const body = {
    hello: 'all',
  };

  it('should call AutoResponseFull decorator on apply', () => {
    const headers: HttpHeaders = new HttpHeaders().set('who', 'is this');

    class Fake {
      @AutoResponse({ body, headers })
      public fakeFn() {}
    }

    const responseInit = mockAutoResponseFull.mock.lastCall[0];
    expect(mockAutoResponseFull).toHaveBeenCalledTimes(1);
    expect(responseInit.body).toEqual(body);
    expect(responseInit.headers).toEqual(headers);
  });

  it('should call AutoResponseBody decorator on apply key "body"', () => {
    class Fake {
      @AutoResponse.body(body)
      public fakeFn() {}
    }

    const passedBody = mockAutoResponseBody.mock.lastCall[0];
    expect(mockAutoResponseBody).toHaveBeenCalledTimes(1);
    expect(passedBody).toEqual(body);
  });
});
