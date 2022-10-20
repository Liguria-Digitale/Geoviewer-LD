import axios from 'axios'
import globals from '../globals'

export default function(applicazione) {
  const url = `${globals.GV_AG_APP_LISTA_MAPPE}${applicazione}`
  return axios.get(url).then(response => response.data.data)
}
