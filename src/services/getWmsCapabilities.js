import axios from 'axios'
var X2JS = require('../util/X2JS')

function parseCapabilities(xml) {
  return new X2JS().xml_str2json(xml)
}

export default function getWmsCapabilities(url) {
  let params = {}
  const url2 = GV.globals.DEFAULT_PROXY + url
  return axios.get(url2).then(response => {
    const xml = response.data
    const root = parseCapabilities(xml)
    const capabilities = root.WMS_Capabilities || root.WMT_MS_Capabilities
    return capabilities
  })
}
