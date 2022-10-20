import axios from 'axios'
import globals from '../globals'

export default function getCatalog(params = {}) {
  let url = globals.GV_CATALOG_SERVICE
  if (params.idMap) {
    url += params.idMap
  }
  params.cat = GV.globals.GV_CATALOG
  return axios.get(url, { params: params }).then(response => response.data.data)
}
