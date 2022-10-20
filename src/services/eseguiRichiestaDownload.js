import axios from 'axios';
import globals from '../globals';

axios.defaults.timeout = 120000;
export default function(idRichiesta) {
  return axios
    .get(`${globals.GV_DOWNLOAD_ESEGUI_RICHIESTA}${idRichiesta}`)
    .then(response => response.data)
    .catch(function(error) {
      return Promise.reject(error);
    });
}
