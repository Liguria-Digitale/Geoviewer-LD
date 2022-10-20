export default function getProtocol() {
  'use strict'
  return window.location.href.split(':')[0]
}

