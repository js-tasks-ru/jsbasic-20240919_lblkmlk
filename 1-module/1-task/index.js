function factorial(n) {
  let result = n;

  for (let i = n - 1; i > 0; i--) {
    result = result * i;
  }

  if (result === 0) {
    return 1;
  }

  return result;
}
