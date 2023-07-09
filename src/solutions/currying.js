function normalAdd(a, b) {
  return a + b;
}

function curryAdd(a) {
  return function (b) {
    return a + b;
  };
}
const curryAdd2 = (a) => (b) => a + b;

curryAdd(1)(5);