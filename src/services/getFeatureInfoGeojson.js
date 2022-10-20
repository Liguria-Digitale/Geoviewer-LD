import axios from 'axios'

function addLayerName(data, layerName) {
  let features = data.features

  data.features.forEach((feature, index) => {
    feature.id = `${layerName}.${index}`
  })

  return features
}
export default function getFeatureInfo(url, layers) {
  let params = {}
  return (
    axios
    .get(url, {
      params: params,
    })
    //.then(response => response.data.features)
    .then(response => {
      const data = response.data
      const features = addLayerName(data, layers)
      return features
    })
  )
}
