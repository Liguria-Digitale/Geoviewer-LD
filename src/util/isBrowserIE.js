export default function isBrowserIE() {
  return navigator.userAgent.indexOf('MSIE ') > 0 ||
    navigator.userAgent.indexOf('Trident') > 0 ||
    navigator.userAgent.indexOf('Edge') > 0
}
