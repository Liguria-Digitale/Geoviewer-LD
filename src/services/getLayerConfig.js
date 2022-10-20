import axios from 'axios'
import globals from '../globals'

export default function(idLayer, geoserverUrl) {
  if (!idLayer || idLayer === 'null') {
    throw new Error('Parametro idLayer mancante')
  }

  let params = {}
  if (geoserverUrl) {
    params.geoserverUrl = geoserverUrl
  }

  return axios
    .get(`${globals.GV_LAYER_CONFIG_SERVICE}${idLayer}`, {
      params: params,
    })
    .then(response => response.data.data)
}
