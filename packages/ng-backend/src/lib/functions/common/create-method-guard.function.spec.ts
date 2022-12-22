import { createMethodGuard } from './create-method-guard.function';

describe('create-method-guard.function', () => {
  it('should return a function', () => {
    const guard = createMethodGuard('/fake-route');

    expect(typeof guard).toBe('function');
  });

  it('should correctly match the input URI to the full URI', () => {
    const guard = createMethodGuard('/fake-route');

    expect(guard('/fake-base', '/fake-base/fake-route')).toBe(true);
    expect(guard('/fake-base', '/fake-base/fake-route')).toBe(true);
    expect(guard('/fake-base', '/fake-base/fake-route/goodbye')).toBe(false);
    expect(guard('/fake-base', '/hello-world/fake-route')).toBe(false);
  });

  it('should be case-insensitive', () => {
    const guard = createMethodGuard('/fake-route');

    expect(guard('/fake-base', '/FAKE-BASE/FAKE-ROUTE')).toBe(true);
  });

  it('should be slash position insensitive', () => {
    const guard = createMethodGuard('/fake-route/');

    expect(guard('/fake-base/', '/fake-base/fake-route')).toBe(true);
  });

  it('should not recognize input uri that contains slash at the end', () => {
    const guard = createMethodGuard('/fake-route/');

    expect(guard('/fake-base/', '/fake-base/fake-route/')).toBe(false);
  });

  it('should also works if the uri parts does not have slash at the begin', () => {
    const guard = createMethodGuard('fake-route');

    expect(guard('fake-base', 'fake-base/fake-route')).toBe(true);
  });
});
