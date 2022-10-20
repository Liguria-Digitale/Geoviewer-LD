import axios from 'axios';
import globals from '../globals';

export default function getFeatureXSLT(infoUrl, data) {
  const idLayer = data.layerName ? data.layerName.replace('L', '') : null;
  const titolo = data.layer && data.layer.legend ? data.layer.legend.label : null;
  return axios
    .post(globals.GV_XSL_INFO_SERVICE, {
      data: {
        xslUrl: infoUrl,
        gml: data.gml,
        idLayer: idLayer,
        titolo: titolo,
        featureAttributes: data.properties,
        text: data.text,
      },
    })
    .then(response => response.data);
}
