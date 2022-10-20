import getUrlParam from './getUrlParam'
export default function() {
  const map = getUrlParam('FIND_MAP') || getUrlParam('ID') || getUrlParam('id')
  const layers = getUrlParam('FIND_LAYERS') ? getUrlParam('FIND_LAYERS').split(',') : null
  const fields = getUrlParam('FIND_FIELDS')
  const values = getUrlParam('FIND_VALUES')
  const cqlFilter = getUrlParam('FIND_CQL_FILTER')
  return {
    map: map,
    layers: layers,
    fields: fields,
    values: values,
    cqlFilter: cqlFilter,
  }
}
