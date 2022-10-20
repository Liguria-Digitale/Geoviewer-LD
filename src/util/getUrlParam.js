export default function getUrlParam(paramName) {
  var results = new RegExp("[\\?&]" + paramName + "=([^&#]*)", "i").exec(
    window.location.href
  );
  if (results && results[1] === "null") results = null;
  return results ? decodeURIComponent(results[1]) : null;
}
