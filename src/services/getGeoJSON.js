import axios from 'axios'

export default function getGeoJSON(url) {
  let params = {}

  return axios.get(url, {
    params: params,
  })
}
