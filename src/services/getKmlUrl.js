
import axios from 'axios'
import globals from '../globals'

export default function getKmlUrl (kmlUrl) {
  let url = (kmlUrl.indexOf("kmz") > -1) ?  '/geoservices/REST/utils/kmz_upload_and_unzip/?url=' : '/geoservices/REST/utils/kml_upload/?url='
  url = url + kmlUrl
  return axios.get(url).then(response => response.data)
}
