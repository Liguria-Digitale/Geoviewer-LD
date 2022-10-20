import axios from 'axios'
import globals from '../globals'

export default function getElevation(srs, x, y) {
  let url = `${globals.GV_ELEVATION}${srs}/${x},${y}`
  return axios.get(url, {})
}
