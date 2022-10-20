export default function getParamString (obj, existingUrl, uppercase) {
  var params = []
  for (var i in obj) {
    params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]))
  }
  return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&')
}
