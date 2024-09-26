function checkSpam(str) {
  let myStr = str.toLowerCase();
  
  if (myStr.indexOf('1xbet') !== -1 || myStr.indexOf('xxx') !== -1) {
   return true;
  }
  return false;
}
