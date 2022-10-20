import axios from 'axios';
import globals from '../globals';

export default function(
  idLayer,
  offset,
  limit,
  column,
  dataType,
  value,
  operator,
  bbox,
  bboxSRS,
  topoFeature,
  topoQuery,
  version
) {
  let url = `${globals.GV_QUERY_LAYER_TOPO_SERVICE}${idLayer}?offset=${offset}&limit=${limit}`;
  if (version) url += `&version=${version}`;
  if (column) url += `&column=${column}`;
  if (dataType) url += `&datatype=${dataType}`;
  if (value) url += `&value=${value}`;
  if (operator) url += `&operator=${operator}`;
  if (bbox) url += `&bbox=${bbox}`;
  if (bboxSRS) url += `&bboxSRS=${bboxSRS}`;
  if (topoFeature && topoQuery) url += `&topo_feature=${topoFeature}&topo_query=${topoQuery}`;

  let params = {};
  return axios.get(url, {
    params: params,
  });
}
