import axios from 'axios';

export default function getScheda(idMap) {
  let url = `/geoservices/REST/geoportale/scheda/${idMap}`;

  return axios.get(url).then(response => response.data.data);
}
