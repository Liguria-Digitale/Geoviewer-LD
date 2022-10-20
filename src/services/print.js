import axios from 'axios';

export default function(data) {
  return axios
    .post('/geoservices/REST/print/print', {
      headers: { Accept: 'text/xml' },
      data: data,
    })
    .then(response => response.data);
}
