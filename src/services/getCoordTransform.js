import axios from 'axios'
import globals from '../globals'

export default function getCoordTransform(srsIn, srsOut, x, y) {
  let url = `${globals.GV_TRANSFORM_POINT_SERVICE}${srsIn}/${srsOut}/${x},${y}`
  return axios.get(url, {})
}
