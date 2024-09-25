function truncate(str, maxlength) {
  let result = str;

  if (result.length > maxlength) {
    result = result.slice(0, maxlength - 1) + '…';
  }

  return result;
}
