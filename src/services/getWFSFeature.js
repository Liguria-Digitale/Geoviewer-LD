import axios from 'axios';
import globals from '../globals';
import { Loading } from 'element-ui';

export default function getWFSFeature(wfsParams, cqlFilter, wfsUrl) {
  if (!wfsUrl && !wfsParams && !wfsParams.url) {
    console.warning('getWFSFeature: URL non impostata');
    return;
  }
  let url = `${GV.globals.DEFAULT_PROXY}${wfsUrl}`;
  if (wfsParams) {
    const baseParams =
      'service=WFS&version=2.0.0&request=GetFeature&srsName=EPSG%3A4326&outputFormat=application%2Fjson';
    url = `${GV.globals.DEFAULT_PROXY}${wfsParams.url}${baseParams}&typeName=${wfsParams.typeName}&cql_filter=${cqlFilter}`;
  }
  let loading = Loading.service({
    text: 'Attendere...',
    background: 'rgba(0, 0, 0, 0.8)',
  });
  return axios
    .get(url)
    .then(response => {
      loading.close();
      return response.data.features;
    })
    .catch(error => {
      loading.close();
      console.error(error);
    });
}
