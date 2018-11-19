export function shallowEqualArrays<T extends J[], J>(a: T, b: T) {
  if (a === b) {
    return true;
  }

  var len = a.length;

  if (b.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};
