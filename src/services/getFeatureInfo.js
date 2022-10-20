import axios from 'axios';

export default function getFeatureInfo(url) {
  let params = {};
  return axios
    .get(url, {
      params: params,
    })
    .then(response => {
      return response.data.features;
    });
}
