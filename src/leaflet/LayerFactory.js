// import L from 'leaflet';
// require('./MarkerCluster.js');
// require('./NonTiledLayer.js');

import globals from '../globals';
import interpolateString from '../util/interpolateString';
import getParamString from '../util/getParamString';
import getZoomFromScaleDenom from '../util/getZoomFromScaleDenom';
import getGeoJSON from '../services/getGeoJSON';
import getWmsError from '../services/getWmsError';
import toGeoJSON from '@mapbox/togeojson';
import parseXML from '../util/parseXML';

var esriLink = '<a href="https://www.esri.com/">Esri</a>';

// Funzione di costruzione geoJson
function buildGeoJson(data, esParams) {
  'use strict';
  let geoJson;
  if (esParams) {
    var geomField = esParams.geomField || 'location';
    var features = data.hits.hits;
    geoJson = {
      type: 'FeatureCollection',
      totalFeatures: data.hits.total,
      features: [],
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:EPSG::4326',
        },
      },
    };
    features.forEach(function(feature) {
      var coords = feature._source[geomField];
      geoJson.features.push({
        type: 'Feature',
        id: feature._id,
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
        geometry_name: 'GEOMETRY',
        properties: feature._source,
      });
    });
  } else {
    geoJson = typeof data === 'string' ? JSON.parse(data) : data;
  }
  return geoJson;
}

var layerFactory = {
  BLANK(layerConfig) {
    layerConfig.legend = {
      label: 'Sfondo Bianco',
    };
    return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.0,
      maxZoom: 20,
    });
  },

  OSM(layerConfig) {
    layerConfig.legend = {
      label: 'OpenStreetMap',
    };
    return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/copyright" target="blank">OpenStreetMap</a> contributors',
      maxZoom: 21,
    });
  },

  ESRI_IMAGERY(layerConfig) {
    layerConfig.legend = {
      label: 'ESRI Imagery',
    };
    layerConfig.name = layerConfig.type;
    var attr =
      'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community';
    return L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: `&copy; ${esriLink}, ${attr}`,
        maxZoom: 20, //, pane: layerConfig.name
      }
    );
  },

  ESRI_STREETS(layerConfig) {
    layerConfig.legend = {
      label: 'ESRI Streets',
    };
    layerConfig.name = layerConfig.type;
    var attr = 'USGS, NOAA';
    return L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: `&copy; ${esriLink}, ${attr}`,
        maxZoom: 20, //, pane: layerConfig.name
      }
    );
  },

  ESRI_TOPOGRAPHIC(layerConfig) {
    layerConfig.legend = {
      label: 'ESRI Topographic',
    };
    layerConfig.name = layerConfig.type;
    var attr = 'USGS, NOAA';
    return L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: `&copy; ${esriLink}, ${attr}`,
        maxZoom: 20, //, pane: layerConfig.name
      }
    );
  },

  ESRI_GRAY(layerConfig) {
    layerConfig.legend = {
      label: 'ESRI Gray',
    };
    layerConfig.name = layerConfig.type;
    var attr = 'HERE, DeLorme, MapmyIndia, OpenStreetMap contributors';
    return L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: `&copy; ${esriLink}, ${attr}`,
        maxZoom: 16, //, pane: layerConfig.name
      }
    );
  },

  ESRI_DARKGRAY(layerConfig) {
    layerConfig.legend = {
      label: 'ESRI Dark Gray',
    };
    layerConfig.name = layerConfig.type;
    var attr = 'HERE, DeLorme, MapmyIndia, OpenStreetMap contributors';
    return L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: `&copy; ${esriLink}, ${attr}`,
        maxZoom: 16, //, pane: layerConfig.name
      }
    );
  },

  STAMEN_TERRAIN(layerConfig) {
    layerConfig.legend = {
      label: 'Stamen Terrain',
    };
    return L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
      attribution:
        'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    });
  },

  STAMEN_TONER_LIGHT(layerConfig) {
    layerConfig.legend = {
      label: 'Stamen Toner Light',
    };
    return L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution:
        'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
    });
  },

  TMS(layerConfig) {
    const url = layerConfig.tmsParams.url.replace('/tms/', '/tiles/');
    const name = layerConfig.tmsParams.name;
    const attribution = layerConfig.attribution;
    const tmsUrl = `${url}/1.0.0/${name}/{z}/{x}/{y}.png`;
    const maxLevel = layerConfig.maxScale ? getZoomFromScaleDenom(layerConfig.maxScale) - 1 : 20;

    const layer = L.tileLayer(tmsUrl, {
      minZoom: 1,
      maxZoom: maxLevel,
      attribution: attribution,
    });
    layer.setZIndex(layerConfig.zIndex);
    layer.name = name.replace('/webmercator', '');
    return layer;
  },

  WMS(layerConfig) {
    let {
      name,
      cacheMinZoomLevel,
      minScale,
      maxScale,
      wmsParams,
      zIndex,
    } = layerConfig;
    GV.log('layerFactory - Creazione Layer WMS: ' + name);
    let layer = null;

    const isCached = cacheMinZoomLevel ? true : false;
    const format = wmsParams.format;
    const opacity = layerConfig.opacity || 1;
    layerConfig.minZoom = minScale ? getZoomFromScaleDenom(minScale) : 8;
    layerConfig.maxZoom = maxScale ? getZoomFromScaleDenom(maxScale) - 1 : 20;

    let options = {
      transparent: true,
      layers: wmsParams.name,
      format: format,
      styles: wmsParams.styles || '',
      opacity: opacity,
      minZoom: layerConfig.minZoom,
      maxZoom: layerConfig.maxZoom,
      bounds: L.latLngBounds(
        L.latLng(globals.MAX_BOUNDS.X_MIN, globals.MAX_BOUNDS.Y_MIN),
        L.latLng(globals.MAX_BOUNDS.X_MAX, globals.MAX_BOUNDS.Y_MAX)
      ),
      client: 'GV2',
    };
    if (wmsParams.cql_filter) {
      options.cql_filter = wmsParams.cql_filter;
    }
    if (wmsParams.sld) {
      options.sld = wmsParams.sld;
    }

    let url = wmsParams.url;
    if (isCached) {
      const cacheVersion = layerConfig.cacheVersion
      Object.assign(options, {
        tiled: true,
        TILESORIGIN: '-20037508,-20037508',
        tileSize: 256,
        CACHE_VERSION: cacheVersion,
      });
      layer = L.tileLayer.wms(url, options);
      layer.on('tileerror', err => {
        getWmsError(err.tile.currentSrc)
          .then(response => {
            console.error('ERRORE WMS');
            if (response && response.ServiceExceptionReport)
              console.log(response.ServiceExceptionReport.ServiceException);
          })
          .catch(error => console.error(error));
      });
    } else {
      Object.assign(options, {
        tiled: false,
        pane: 'tilePane',
      });
      layer = L.nonTiledLayer.wms(url, options);
      layer.on('error', err => {
        getWmsError(err.target.url)
          .then(response => {
            console.error('ERRORE WMS');
            console.log(response.ServiceExceptionReport.ServiceException);
          })
          .catch(error => console.error(error));
      });
    }

    layer.setZIndex(zIndex);
    layer.type = 'WMS';
    layer.name = name;
    return layer;
  },

  JSON(layerConfig) {
    let {
      data,
      url,
      name,
      wfsParams,
      esParams,
      classes,
      style,
      pointToLayer,
      tooltip,
      popup, // string: template html, viene fatta interpolazione
      basePopup, // boolean: visualizza popup base
      customPopup, // function: funzione che prende in input le props della feature e ritorna una stringa
      cluster,
      subType,
      legend,
      onEachFeature,
      onFeatureSelect,
      filter,
      autoZoom,
    } = layerConfig;
    let clusterLayer = null;
    let options = {};

    if (classes && classes.length > 0) {
      if (layerConfig.geomSubType === 'POINT') {
        options.pointToLayer = function(feature, latlng) {
          var style;
          classes.forEach(function(cls) {
            if (cls.filter && cls.filter.key && cls.filter.value) {
              if (feature.properties[cls.filter.key] === cls.filter.value) {
                style = cls.style;
              }
            } else {
              style = cls.style;
            }
          });
          if (style.iconUrl) {
            var icon;
            switch (style.iconUrl) {
              case 'default':
                icon = L.icon({
                  iconUrl: '/geoservices/apps/viewer/dist/static/img/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [0, -41],
                });
                break;
              case 'default-small':
                icon = L.icon({
                  iconUrl: '/geoservices/apps/viewer/dist/static/img/marker-icon.png',
                  iconSize: [12, 20],
                  iconAnchor: [6, 10],
                  popupAnchor: [0, -20],
                });
                break;
              default:
                icon = L.icon({
                  iconUrl: style.iconUrl,
                  iconSize: style.iconSize,
                  iconAnchor: style.iconAnchor,
                  popupAnchor: style.popupAnchor,
                });
            }
            const alt = tooltip ? interpolateString(tooltip, feature.properties) : '';
            return L.marker(latlng, {
              icon: icon,
              alt: alt,
            });
          } else {
            return L.circleMarker(latlng, style);
          }
        };
      } else {
        options.style = function(feature) {
          var style;
          classes.forEach(function(cls) {
            if (cls.filter && cls.filter.key && cls.filter.value) {
              if (feature.properties[cls.filter.key] === cls.filter.value) {
                style = cls.style;
              }
            } else {
              style = cls.style;
            }
          });
          return style;
        };
      }
      options.filter = function(feature) {
        var visible = false;
        classes.forEach(function(cls) {
          if (!cls.filter) {
            visible = true;
          } else {
            if (cls.filter.key && cls.filter.value) {
              if (feature.properties[cls.filter.key] === cls.filter.value) {
                visible = true;
              }
            }
          }
        });
        return visible;
      };
    }

    if (style) {
      options.style = style;
    }

    if (pointToLayer) {
      options.pointToLayer = pointToLayer;
    }
    if (filter) {
      options.filter = filter;
    }

    function simplePopup(layer) {
      let props = [];
      Object.keys(layer.feature.properties).forEach(key => {
        if (
          key === 'stroke' ||
          key === 'stroke-opacity' ||
          key === 'stroke-width' ||
          key === 'fill' ||
          key === 'fill-opacity'
        ) {
          return;
        }
        const value = layer.feature.properties[key];
        if (typeof value === 'string' || value instanceof String || typeof value === 'number') {
          props.push({
            key: key,
            value: value,
          });
        }
      });
      var popUp = '<div><b>' + legend.label + '</b><br><br></div>';
      popUp += '<div>';
      props.forEach(prop => {
        popUp += prop.key + ':' + prop.value + '<br>';
      });
      popUp += '</div>';
      return popUp;
    }

    if (tooltip || popup || basePopup || customPopup) {
      options.onEachFeature = function(feature, layer) {
        if (tooltip) {
          layer.options.title = interpolateString(tooltip, feature.properties);
        }
        if (popup) {
          layer.bindPopup(interpolateString(popup, feature.properties));
        }
        if (basePopup) {
          layer.bindPopup(simplePopup);
        }
        if (customPopup) {
          layer.bindPopup(customPopup);
        }
      };
    }

    if (onEachFeature) {
      options.onEachFeature = onEachFeature;
    }

    var layer = L.geoJson(null, options);
    layer.name = name;
    layer.geoJson = null;

    if (onFeatureSelect) {
      layer.on('click', e => {
        onFeatureSelect(e.layer.feature, e.layer);
      });
    }

    var parameters;

    if (wfsParams && wfsParams.typeName && wfsParams.url) {
      parameters = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        srsName: 'EPSG:4326',
        outputFormat: 'text/javascript',
        format_options: 'callback: getJson',
        typeName: wfsParams.typeName,
      };
      url = wfsParams.url + getParamString(parameters);
    }

    // Gestione livelli puntuali su ElasticSearch
    if (esParams) {
      parameters = {};
      if (esParams.field) {
        parameters.q = esParams.field + ':';
        if (esParams.query) {
          parameters.q += esParams.query;
        } else {
          parameters.q += '*';
        }
      } else {
        if (esParams.query) {
          parameters.q = esParams.query;
        }
      }
      parameters.pretty = 'true';
      parameters.size = 100000;

      url = GV.config.application.proxy + esParams.url + getParamString(parameters);
    }

    if (cluster) {
      var clusterOptions = {
        showCoverageOnHover: false,
      };
      if (cluster.options) {
        Object.assign(clusterOptions, cluster.options);
      }
      clusterLayer = L.markerClusterGroup(clusterOptions);
      clusterLayer.name = name;
    }

    if (url) {
      getGeoJSON(url)
        .then(response => {
          let geoJson;
          if (subType === 'KML') {
            const xml = parseXML(response.data);
            geoJson = toGeoJSON.kml(xml);
          } else if (subType === 'GPX') {
            const xml = parseXML(response.data);
            geoJson = toGeoJSON.gpx(xml);
          } else {
            geoJson = buildGeoJson(response.data, esParams);
          }
          layer.geoJson = geoJson;
          layer.addData(geoJson);
          if (cluster) {
            clusterLayer.geoJson = layer.geoJson;
            clusterLayer.addLayer(layer);
          }
          layer.fire('ready');
          GV.eventBus.$emit('layer-loaded-json', layer);
          if (autoZoom) {
            GV.app.map.fitBounds(layer.getBounds(), {
              maxZoom: 17,
            });
          }
        })
        .catch(error => console.error(error));
    }

    if (data) {
      layer.geoJson = data;
      layer.addData(data);
      if (cluster) {
        clusterLayer.geoJson = layer.geoJson;
        clusterLayer.addLayer(layer);
      }
      layer.fire('ready');
      GV.eventBus.$emit('layer-loaded-json', layer);
      if (autoZoom) {
        GV.app.map.fitBounds(layer.getBounds(), {
          maxZoom: 17,
        });
      }
    }

    return cluster ? clusterLayer : layer;
  },
};

function create(layerConfig) {
  if (layerFactory[layerConfig.type]) {
    let layer = layerFactory[layerConfig.type](layerConfig);
    layer.legend = layerConfig.legend;
    layer.config = layerConfig;
    return layer;
  } else {
    throw new Error(`Layer di tipo ${layerConfig.type} non gestito`);
  }
}

export { create };
