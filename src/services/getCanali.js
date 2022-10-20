import axios from 'axios';
import globals from '../globals';

export default function getCanali(
  params = {
    applicazione: null,
    tematici: 'SI',
    canale: null,
    order: null,
    pub: true,
  }
) {
  if (params.pub === undefined) params.pub = false;
  const url = params.applicazione
    ? `${globals.GV_CANALI_SERVICE}${params.applicazione}/${params.tematici}?pub=${params.pub}&order=${params.order}`
    : `${globals.GV_CANALE_CARTE_SERVICE}${params.canale}?pub=${params.pub}`;
  return axios.get(url).then(response => response.data.data);
}
