export function ObjectToQueryString(obj) {
  let keys = Object.keys(obj);
  if (keys.length === 0) {
    return "";
  }
  let queryString = keys
    .reduce(function (a, k) {
      a.push(k + "=" + obj[k]);
      return a;
    }, [])
    .join("&");
  return `?${queryString}`;
}
