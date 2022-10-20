import globals from '../globals';
import Vue from 'vue';
import mountComponent from '../util/mountComponent';
import parseXML from '../util/parseXML';
import stringFormat from '../util/stringFormat';
import getParamString from '../util/getParamString';
import getFeatureInfo from '../services/getFeatureInfo';
import getFeatureInfoGeojson from '../services/getFeatureInfoGeojson';
import getFeatureInfoText from '../services/getFeatureInfoText';
import getWFSFeature from '../services/getWFSFeature';
import getFeatureXSLT from '../services/getFeatureXSLT';
import notification from '../util/notification';
// import startLoadingService from './util/startLoadingService'
// import stopLoadingService from './util/stopLoadingService'

import * as LayerFactory from '../openlayers/LayerFactory';

var _requestCount = 0;
var _numRequests = 0;
var _features = [];

function _request(event) {
  GV.log('start info request: ' + new Date());

  _requestCount = 0;
  _numRequests = 0;
  _features = [];

  // Ciclo sulle mappe caricate
  GV.config.maps.forEach(function(mapConfig) {
    var infoFormat = 'application/json';
    // Ciclo sui layer caricati sulla mappa
    mapConfig.layers.forEach(function(layerConfig) {
      if (
        layerConfig.type === 'WMS' &&
        layerConfig.queryable &&
        layerConfig.visible &&
        GV.app.map.layerInRange(layerConfig)
      ) {
        queryLayer(layerConfig, infoFormat);
      }
    });
  });

  function queryLayer(layerConfig, infoFormat) {
    if (!layerConfig.wmsParams.infoFormat) layerConfig.wmsParams.infoFormat = infoFormat;
    const wmsUrl = getGetFeatureInfoUrl(layerConfig, event);
    _numRequests++;

    switch (infoFormat) {
      case 'application/json':
        getFeatureInfo(wmsUrl)
          .then(features => _handleResponse(features, layerConfig.name))
          .catch(error => console.error(error));
        break;
      case 'application/geojson':
        getFeatureInfoGeojson(wmsUrl, layerConfig.wmsParams.name)
          .then(features => _handleResponse(features, layerConfig.name))
          .catch(error => console.error(error));
        break;
      case 'text/plain':
        getFeatureInfoText(wmsUrl, layerConfig.wmsParams.name)
          .then(data => _handleResponse(data, layerConfig.name))
          .catch(error => console.error(error));
        break;
    }
  }
}

function getGetFeatureInfoUrl(layerConfig, event) {
  if (GV.app.map.type === 'openlayers') {
    return buildOLWMSOptions(layerConfig, event);
  } else {
    const url =
      layerConfig.infoOptions.infoQueryUrl || globals.DEFAULT_PROXY + layerConfig.wmsParams.url;
    const layers = layerConfig.infoOptions.infoQueryLayers || layerConfig.wmsParams.name;
    const cqlFilter = layerConfig.wmsParams.cql_filter;
    const infoFormat = layerConfig.wmsParams.infoFormat;
    return buildWMSOptions(
      url,
      layers,
      event.latlng,
      infoFormat,
      layerConfig.infoBuffer,
      cqlFilter
    );
  }
}

function buildOLWMSOptions(layerConfig, event) {
  const url = layerConfig.infoOptions.infoQueryUrl || layerConfig.wmsParams.url;
  const queryLayers = layerConfig.infoOptions.infoQueryLayers || layerConfig.wmsParams.name;
  const infoFormat = layerConfig.wmsParams.infoFormat;
  const buffer = layerConfig.infoBuffer || 10;
  const viewProjection = GV.app.map.getView().getProjection();
  const viewResolution = GV.app.map.getView().getResolution();
  const source = new ol.source.ImageWMS({
    url: url,
    params: { LAYERS: layerConfig.wmsParams.name },
    ratio: 1,
    serverType: 'geoserver',
  });
  var infoUrl = source.getFeatureInfoUrl(event.coordinate, viewResolution, viewProjection, {
    INFO_FORMAT: infoFormat,
    QUERY_LAYERS: queryLayers,
    FEATURE_COUNT: 100,
    BUFFER: buffer,
  });
  infoUrl = globals.DEFAULT_PROXY + infoUrl;
  return infoUrl;
}

function buildWMSOptions(url, layers, latlng, infoFormat, infoBuffer, cqlFilter) {
  const point = GV.app.map.getContainerPoint(latlng);
  const size = GV.app.map.getSize();
  const bbox = GV.app.map.getBbox();
  const buffer = infoBuffer === null || infoBuffer === undefined ? 10 : infoBuffer;
  const params = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    crs: 'EPSG:3857',
    styles: '',
    version: '1.3.0',
    bbox: bbox,
    height: size.y,
    width: size.x,
    layers: layers,
    query_layers: layers,
    FEATURE_COUNT: 100,
    buffer: buffer,
    info_format: infoFormat,
    i: parseInt(point.x),
    j: parseInt(point.y),
  };
  if (cqlFilter) {
    params.cql_filter = cqlFilter;
  }
  return url + getParamString(params, url, true);
}

function _handleResponse(features, layerName) {
  _requestCount++;

  if (!features) return;

  features.forEach(function(feature) {
    if (feature.text) {
      feature.layer = GV.app.map.getLayerByName(feature.layerName);
      feature.infoOptions = feature.layer.config.infoOptions;
    } else {
      feature.layerName = layerName;
      feature.layer = GV.app.map.getLayerByName(layerName);
      feature.label = setFeatureLabel(layerName, feature.properties);
      feature.infoOptions = feature.layer.config.infoOptions;
    }
  });
  Array.prototype.push.apply(_features, features);

  if (_requestCount === _numRequests) {
    if (_features.length === 0) {
      GV.log('Nessun elemento trovato');
      return;
    }

    if (_features.length === 1) {
      var listDiv = document.getElementById('gv-info-wms-list');
      if (listDiv) {
        listDiv.parentNode.removeChild(listDiv);
      }
      _showFeatureInfo(_features[0]);
    } else {
      mountComponent({
        elId: 'gv-info-wms-list',
        clear: true,
        vm: new Vue({
          template: `<gv-info-wms-list :items="items"></gv-info-wms-list>`,
          data: {
            items: _features,
          },
        }),
      });
    }

    GV.log('end info request: ' + new Date());
    // stopLoadingService()
  }

  function setFeatureLabel(layerName, attributes) {
    var infoLabelAttr, infoIdAttr;
    infoLabelAttr = getField(layerName, 'infoLabelAttr');
    infoIdAttr = getField(layerName, 'infoIdAttr');
    if (infoLabelAttr && attributes[infoLabelAttr]) {
      return attributes[infoLabelAttr];
    }
    if (infoIdAttr && attributes[infoIdAttr]) {
      return attributes[infoIdAttr];
    }
    return attributes[getFirstAttribute(attributes)];
  }

  function getField(layerName, fieldName) {
    var layerConfig = GV.app.map.getLayerByName(layerName).config;
    return layerConfig && layerConfig.infoOptions && layerConfig.infoOptions[fieldName]
      ? layerConfig.infoOptions[fieldName]
      : null;
  }

  function getFirstAttribute(attributes) {
    for (var i in attributes) {
      if (attributes.hasOwnProperty(i) && typeof i !== 'function') {
        return i;
      }
    }
    return null;
  }
}

function _showFeatureInfo(feature) {
  var type = getType(feature);

  switch (type) {
    case 'text':
      showText(feature);
      break;
    case 'gvi':
      showGvInfo(feature);
      break;
    case 'generico':
      showGenerico(feature);
      break;
    default:
      showHtml(feature);
      break;
  }
  if (!GV.app.map.options.noInfoHiliteFeature) hiliteFeature(feature);
}

function showGvInfo(feature) {
  const featureId = feature.id;
  const layerId = feature.layer.config.id;
  GV.gvInfoFeatures[featureId] = feature;
  const panelId = `gvi-info-${featureId}`;
  const url = `/geoservices/apps/gvi/info/${layerId}/?feature_id=${featureId}`;
  if (!feature.infoOptions.infoTarget || feature.infoOptions.infoTarget === 'panel') {
    showPanel(url, feature.infoOptions, panelId);
  } else {
    openPopup(url, feature.infoOptions);
  }
}

function showHtml(feature) {
  const url = stringFormat(feature.infoOptions.infoUrl, feature.properties);
  if (!feature.infoOptions.infoTarget || feature.infoOptions.infoTarget === 'panel') {
    showPanel(url, feature.infoOptions);
  } else {
    openPopup(url, feature.infoOptions);
  }
}

function showGenerico(feature) {
  const title = feature.layer.legend.label;
  mountComponent({
    elId: 'gv-info-generico',
    vm: new Vue({
      template:
        '<gv-info-generico :properties="properties" :height="height" :width="width" :title="title"></gv-info-generico>',
      data: {
        title: title,
        properties: feature.properties,
        width: feature.infoOptions.infoWidth || 400,
        height: feature.infoOptions.infoHeight || 600,
      },
    }),
  });
}

function showText(feature) {
  const infoOptions = feature.infoOptions;
  const infoUrl = infoOptions.infoUrl;
  const data = {
    text: feature.text.replace(/(?:\r\n|\r|\n)/g, '<br>'),
  };
  getFeatureXSLT(infoUrl, data).then(resp => {
    const url = resp.infoUrl;
    showPanel(url, infoOptions);
  });
}

function getType(feature) {
  const infoUrl = feature.infoOptions.infoUrl;
  if (feature.text) return 'text';
  if (infoUrl === 'gvi') return 'gvi';
  return 'generico';
}

function hiliteFeature(feature) {
  if (feature.layer.config.geomType === 'VECTOR') {
    const layerName = [feature.layerName];
    const layerConfig = feature.layer.config;
    let idAttr = layerConfig.infoOptions.infoIdAttr;
    if (idAttr && layerConfig.cachePostGIS) {
      idAttr = idAttr.toLowerCase();
    }
    let cqlFilter = `${idAttr}='${feature.properties[layerConfig.infoOptions.infoIdAttr]}'`;
    if (feature.layer.config.wmsParams.cql_filter) {
      cqlFilter += ` AND ${feature.layer.config.wmsParams.cql_filter}`;
    }
    getWFSFeature(layerConfig.wfsParams, cqlFilter, null).then(features => {
      const findOptions = { noZoom: true };
      GV.app.map.hiliteFeatures(features, findOptions);
    });
  }
}
// apre una panel div con un documento html
function showPanel(url, configOptions, panelId) {
  const id = panelId || 'gv-info-wms-html';
  mountComponent({
    elId: id,
    vm: new Vue({
      template:
        '<gv-info-wms-html :src="src" :height="height" :width="width" :title="title" :id="id"></gv-info-wms-html>',
      data: {
        title: 'Risultato Info',
        src: url,
        width: configOptions.infoWidth || 400,
        height: configOptions.infoHeight || 400,
        id: id,
      },
    }),
  });
}

function openPopup(url, options) {
  var width = options.infoWidth || 400;
  var height = options.infoHeight || 500;
  var target = '';
  var opts = '';
  if (options.infoTarget !== 'tab') {
    target = options.infoTarget;
    opts = `status=yes, toolbar=yes, menubar=no, width=${width}, height=${height}, resizable=yes, scrollbars=yes`;
  }

  var popup = window.open(url, target, opts);

  var timer = setInterval(function() {
    if (popup.closed) {
      clearInterval(timer);
      GV.app.map.clearLayer('InfoWmsHilite');
    }
  }, 1000);

  if (!popup) {
    notification(
      'Popup bloccata sul browser<br>Per visualizzare info è necessario abilitare popup',
      'info'
    );
    return;
  }
  return popup;
}

function addHiliteLayer() {
  if (GV.app.map.type === 'openlayers') {
    addHiliteLayerOL();
  } else {
    addHiliteLayerLL();
  }
}

function addHiliteLayerOL() {
  const color = [255, 204, 0, 0.6];
  const stroke = new ol.style.Stroke({
    color: color,
    width: 6,
  });
  const styles = {
    Point: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: null,
        stroke: stroke,
      }),
    }),
    MultiPoint: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: null,
        stroke: stroke,
      }),
    }),
    LineString: new ol.style.Style({
      stroke: stroke,
    }),
    MultiLineString: new ol.style.Style({
      stroke: stroke,
    }),
    Polygon: new ol.style.Style({
      stroke: stroke,
    }),
    MultiPolygon: new ol.style.Style({
      stroke: stroke,
    }),
    GeometryCollection: new ol.style.Style({
      stroke: stroke,
      image: new ol.style.Circle({
        radius: 8,
        fill: null,
        stroke: stroke,
      }),
    }),
  };

  GV.app.map.loadLayers([
    {
      name: 'InfoWmsHilite',
      type: 'JSON',
      style: feature => {
        return styles[feature.getGeometry().getType()];
      },
      visible: true,
      zIndex: 1000,
    },
  ]);
}

function addHiliteLayerLL() {
  GV.app.map.loadLayers([
    {
      name: 'InfoWmsHilite',
      type: 'JSON',
      style: {
        color: '#ffcc00',
        fillOpacity: 0,
        weight: 6,
        opacity: 0.6,
      },
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          color: '#ffcc00',
          fillColor: '#ffcc00',
          fill: true,
          fillOpacity: 0.6,
          weight: 6,
          opacity: 0.6,
          alt: '',
        });
      },
      visible: true,
    },
  ]);
}

function onClick(event) {
  _request(event);
}

export default {
  id: 'info-wms-manager',
  active: false,
  firstActivation: true,
  addHiliteLayer: addHiliteLayer,
  getGetFeatureInfoUrl: getGetFeatureInfoUrl,
  features: _features,
  activate: function() {
    GV.log('GV.app.infoWmsManager.activate');

    this.active = true;

    // Aggiungo layer per evidenziazione
    if (GV.app.map) {
      addHiliteLayer(GV.app.map);
    } else {
      GV.eventBus.$on('gv-map-mounted', map => {
        addHiliteLayer(map);
      });
    }

    GV.app.map.on('click', onClick);

    GV.app.infoWmsManager = this;
    GV.config.activeControl = this;
  },
  deactivate: function() {
    GV.log('GV.app.infoWmsManager.deactivate');
    GV.app.map.off('click', onClick);
    this.active = false;
  },
  showFeatureInfo: _showFeatureInfo,
};
