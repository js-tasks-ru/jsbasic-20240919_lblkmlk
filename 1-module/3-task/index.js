function ucFirst(str) {
  if (str.length === 0) {
    return str;
  }
  let result = str[0].toUpperCase() + str.slice(1);
  return result;
}
