export default function createSpy(name) {
  const calls = [];

  const spy = function spy(...args) {
    calls.push([this, ...args]);
  };

  spy.calls = calls;

  Object.defineProperty(spy, 'name', {
    get() { return name; },
  });

  return spy;
}
