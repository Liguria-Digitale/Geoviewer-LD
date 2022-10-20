import axios from "axios";

export default function getFeatureInfo(url, layerName) {
  let params = {};
  return axios
    .get(url, {
      params: params
    })
    .then(response => {
      let feature = {
        layerName: layerName,
        id: "1",
        label: "1",
        text: response.data,
        properties: null
      };
      return [feature];
    });
}
