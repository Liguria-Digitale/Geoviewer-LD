import axios from 'axios'
import globals from '../globals'

export default function(data) {
  return axios
    .post(globals.GV_DOWNLOAD_INSERT_SERVICE, {
      headers: { Accept: 'text/xml' },
      data: data,
    })
    .then(response => response.data)
}
