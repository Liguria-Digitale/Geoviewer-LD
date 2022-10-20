import axios from 'axios';
import globals from '../globals';

export default function(idLayer, column, dataType, offset, limit) {
  let url = `${globals.GV_QUERY_LAYER_TOPO_VALUE_LIST_SERVICE}${idLayer}?column=${column}&datatype=${dataType}&offset=${offset}&limit=${limit}`;
  let params = {};
  return axios.get(url, {
    params: params,
  });
}
