import axios from 'axios';

export default function() {
  let url = `/geoservices/REST/download/richieste_cache`;
  return axios.get(url).then(response => response.data.data);
}
