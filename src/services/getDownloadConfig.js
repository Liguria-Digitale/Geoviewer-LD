
import axios from 'axios'
import globals from '../globals'

export default function (idMap) {
  let url = globals.GV_DOWNLOAD_CONFIG_SERVICE + idMap

  return axios.get(url).then(response => response.data.data)
}