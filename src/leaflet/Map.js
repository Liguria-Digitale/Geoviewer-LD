import globals from '../globals';
import * as LayerFactory from './LayerFactory';
// import L from 'leaflet';
import getWFSFeature from '../services/getWFSFeature';
import buildCqlFilter from '../util/buildCqlFilter';
import InfoWmsManager from '../controls/InfoWmsManager';
import getCoordTransform from '../services/getCoordTransform';
import getCoordTransformBbox from '../services/getCoordTransformBbox';

import notification from '../util/notification';
import { Loading } from 'element-ui';

const llMap = {
  type: 'leaflet',
  layers: [],
  baseLayers: [],
  initialExtent: [],
  map: null,
  zoom: null,
  buttons: [],
  mapOptions: {
    type: 'leaflet',
    zoomControl: false,
    center: { lat: 42.191899, lng: 11.277465 },    
    minZoom: 6,
    maxZoom: 20,
  },
  initialize() {
    Object.assign(this.mapOptions, GV.config.application.mapOptions);

    this.map = L.map('gv-map', this.mapOptions);

    this.options = this.map.options;

    this.setInitialExtent();

    this.zoom = this.map._zoom;

    this.setRestrictedExtent();

    this.setLoading();

    this.loadBaseLayers();

    this.loadControls();

    this.eventMngr();

    if (this.options.static) {
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      this.map.boxZoom.disable();
      this.map.keyboard.disable();
      if (this.map.tap) this.map.tap.disable();
    }

    return this;
  },

  // FUNZIONI PROXY SU OGGETTO MAP

  on(event, fn) {
    this.map.on(event, fn);
  },
  off(event) {
    this.map.off(event);
  },
  fitBounds(bounds, opts) {
    this.map.fitBounds(bounds, opts);
  },
  panTo(coords) {
    this.map.panTo(coords);
  },
  setView(center, zoom, opt) {
    // center: se array converto oggetto Leaflet
    const coords = Array.isArray(center) ? { lat: center[0], lng: center[1] } : center;
    this.map.setView(coords, zoom, opt);
  },
  setMinZoom(bounds) {
    this.map.setMinZoom(bounds);
  },
  setMaxBounds(bounds) {
    this.map.setMaxBounds(bounds);
  },
  getBounds() {
    return this.map.getBounds();
  },
  getSize() {
    return this.map.getSize();
  },
  getCenter() {
    return this.map.getCenter();
  },
  getZoom() {
    return this.map.getZoom();
  },
  getBoundsZoom(bounds, inside, padding) {
    return this.map.getBoundsZoom(bounds, inside, padding);
  },
  setZoom(zoom, opt) {
    this.map.setZoom(zoom, opt);
  },
  removeLayer(layer) {
    this.map.removeLayer(layer);
  },
  addLayer(layer) {
    this.map.addLayer(layer);
  },
  flyTo(center, zoom, opt) {
    this.map.flyTo(center, zoom, opt);
  },
  latLngToContainerPoint(latlng) {
    return this.map.latLngToContainerPoint(latlng);
  },
  addControl(control) {
    this.map.addControl(control);
  },
  eachLayer(fn, context) {
    this.map.eachLayer(fn, context);
  },
  addHandler(handler, fn) {
    this.map.addHandler(handler, fn);
  },

  eventMngr() {
    this.on('zoom', () => {
      GV.eventBus.$emit('map-zoom', this.map._zoom);
    });
    GV.eventBus.$on('set-layer-visible', event => {
      this.setLayerVisible(event.layer, event.checked);
      this.setHiliteLayerVisible(event);
    });
    GV.eventBus.$on('set-layer-transparency', event => {
      const layer = this.getLayerByName(event.layerName);
      if (layer && layer.setOpacity) layer.setOpacity(event.opacity);
    });
    GV.eventBus.$on('change-base-layer', event => {
      this.changeBaseLayer(event.layer);
    });
  },

  setHiliteLayerVisible(event) {
    if (!GV.config.hilitedLayer) {
      return;
    }
    GV.config.hilitedLayer.forEach(hl => {
      if (hl === event.layer.name) {
        const layer = this.getLayerByName('InfoWmsHilite');
        layer.eachLayer(m => {
          const opacity = event.checked ? 0.6 : 0.0;
          m.setStyle({
            opacity: opacity,
          });
        });
      }
    });
  },

  projToGeoBounds(extent) {
    var extArray = extent.split(',');
    var swPoint = L.point(extArray[0], extArray[1]);
    var nePoint = L.point(extArray[2], extArray[3]);
    var swLatLng = L.Projection.SphericalMercator.unproject(swPoint);
    var neLatLng = L.Projection.SphericalMercator.unproject(nePoint);
    return L.latLngBounds(swLatLng, neLatLng);
  },

  setExtent(extent) {
    this.initialExtent = this.projToGeoBounds(extent);
    this.fitBounds(this.initialExtent);
  },

  setInitialExtent() {
    GV.log('setInitialExtent');
    const center = this.mapOptions.center
    const zoom = this.mapOptions.minZoom
    this.setView(center, zoom);
  },

  setRestrictedExtent(extent, zoom) {
    const restrictedExtent = extent || this.mapOptions.restrictedExtent;
    if (restrictedExtent) {
      this.restrictedExtent = this.projToGeoBounds(restrictedExtent);
      this.setMaxBounds(this.restrictedExtent);
      if (zoom) {
        GV.app.map.map.options.minZoom = zoom;
      }
      if (extent === this.mapOptions.initialExtent) {
        this.setMinZoom(this.zoom);
      }
      GV.log('setRestrictedExtent', this.restrictedExtent);
    }
  },

  getExtent() {
    var swPoint = this.getBounds().getSouthWest();
    var nePoint = this.getBounds().getNorthEast();
    var swPrj = L.Projection.SphericalMercator.project(swPoint);
    var nePrj = L.Projection.SphericalMercator.project(nePoint);
    return L.bounds(swPrj, nePrj);
  },

  getExtentAsString(bounds) {
    var swPoint = bounds ? bounds.getSouthWest() : this.getBounds().getSouthWest();
    var nePoint = bounds ? bounds.getNorthEast() : this.getBounds().getNorthEast();
    var swPrj = L.Projection.SphericalMercator.project(swPoint);
    var nePrj = L.Projection.SphericalMercator.project(nePoint);
    return swPrj.x + ',' + swPrj.y + ',' + nePrj.x + ',' + nePrj.y;
  },

  setLayerVisible(layerConfig, visible) {
    'use strict';
    if (visible) {
      // Muta lo stato del layer
      layerConfig.visible = true;
      this.loadLayers([layerConfig]);
    } else {
      const layer = this.getLayerByName(layerConfig.name);
      if (layer) {
        this.removeLayer(layer);
      }
    }
  },

  layerInRange(layerConfig) {
    'use strict';
    if (!layerConfig.minScale && !layerConfig.minScale) {
      return true;
    }
    return this.getScale() < layerConfig.minScale && this.getScale() > layerConfig.maxScale;
  },

  loadControls() {
    'use strict';
    if (this.mapOptions.controls) {
      var cntrl;
      this.controls = {};
      this.mapOptions.controls.forEach(control => {
        switch (control.name) {
          case 'scale':
            cntrl = L.control
              .scale({
                imperial: false,
              })
              .addTo(this.map);
            this.controls[control] = cntrl;
            break;
        }
      });
    }
  },

  loadBaseLayers() {
    this.baseLayers = [];
    GV.config.baseLayers.forEach(layerConfig => {
      var layer = LayerFactory.create(layerConfig);
      this.baseLayers[layer.config.type] = layer;
      if (layer && layerConfig.visible) {
        layer.on('loading', () => {
          this.loading(true, layer);
        });
        layer.on('load', () => {
          this.loading(false, layer);
        });
        layer.addTo(this.map);
        this.activeBaseLayer = layer;
        GV.config.activeBaseLayer = layer.config.name;
      }
    });
  },

  loadLayers(layers) {
    layers.forEach(layerConfig => {
      if (!this.getLayerByName(layerConfig.name)) {
        var layer = LayerFactory.create(layerConfig);
        if (layer && layerConfig.visible) {
          layer.on('loading', () => {
            this.loading(true, layer);
          });
          layer.on('load', () => {
            this.loading(false, layer);
          });
          layer.addTo(this.map);
          layer.on('ready', () => {
            if (layerConfig.zoomToLayerExtent) {
              let bounds = new L.latLngBounds();
              layer.eachLayer(_layer => {
                if (_layer.getBounds) {
                  bounds.extend(_layer.getBounds());
                } else {
                  bounds.extend(new L.latLngBounds(_layer._latlng, _layer._latlng));
                }
              });
              if (bounds) this.fitBounds(bounds);
            }
          });
        }
      }
    });
  },
  filterLayer(layerName, filters) {
    const layer = this.getLayerByName(layerName);
    if (!layer) return;
    if (filters) {
      layer.eachLayer(marker => {
        var opacity = 0;
        filters.forEach(function(filter) {
          if (marker.feature.properties[filter.key] === filter.value) {
            opacity = layer.config.opacity || 1;
          }
        });
        marker.setOpacity(opacity);
      });
    } else {
      layer.eachLayer(marker => {
        var opacity = layer.config.opacity || 1;
        marker.setOpacity(opacity);
      });
    }
  },
  getLayerByName(layerName) {
    var foundLayer = null;
    this.eachLayer(layer => {
      if (layer.config && layer.config.name && layer.config.name === layerName) {
        foundLayer = layer;
      }
    });
    return foundLayer;
  },
  changeBaseLayer(layerName) {
    const activeLayerName = GV.config.getActiveBaseLayer().name;
    if (activeLayerName !== layerName) {
      this.baseLayers[layerName].addTo(this.map);
      this.activeBaseLayer = this.baseLayers[layerName];
      this.removeLayer(this.baseLayers[activeLayerName]);
      GV.config.setActiveBaseLayer(layerName);
    }
  },
  getScale() {
    const scaleDenom = 591657550 / Math.pow(2, this.map._zoom);
    return scaleDenom;
  },
  setLoading() {
    this._spinning = 0;
    this.on('layerremove', e => {
      // Clean-up
      if (e.layer.loading) {
        this.loading(false);
      }
      if (typeof e.layer.on !== 'function') {
        return;
      }
      e.layer.off('load');
      e.layer.off('loading');
    });
  },
  loading(state, layer) {
    if (state) {
      if (this._spinning === 0) {
        GV.log('start load: ' + layer.config.name);
        this.map._container.style.cursor = 'progress';
      }
      this._spinning++;
    } else {
      this._spinning--;
      GV.log('end load: ' + layer.config.name);
      if (this._spinning <= 0) {
        GV.log('FINE CARICAMENTO LAYER');
        this.map._container.style.cursor = 'default';
        GV.eventBus.$emit('map-full-loaded', this.map);
      }
    }
  },
  addMarker(markerConfig) {
    if (markerConfig.epsg && markerConfig.epsg != '4326') {
      getCoordTransform(
        markerConfig.epsg,
        '4326',
        markerConfig.location[1],
        markerConfig.location[0]
      ).then(response => {
        if (response.data.points) {
          const lon = response.data.points[0].split(',')[0];
          const lat = response.data.points[0].split(',')[1];
          markerConfig.location = [lat, lon];
          return this.addMarkerToMap(markerConfig);
        }
      });
    } else {
      return this.addMarkerToMap(markerConfig);
    }
  },
  addMarkerToMap(markerConfig) {
    const icon = L.icon({
      iconUrl: '/geoservices/apps/viewer/dist/static/img/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
    });
    const opts = {
      opacity: 0.8,
      icon: icon,
      title: markerConfig.label,
    };
    let marker =
      markerConfig.type === 'circle'
        ? L.circleMarker(markerConfig.location, opts).addTo(this.map)
        : L.marker(markerConfig.location, opts).addTo(this.map);
    this.flyTo(markerConfig.location, markerConfig.zoomLevel || 14);
    return marker;
  },
  find(findOptions) {
    if (findOptions.bbox) {
      this.zoomToBound(findOptions.bbox, findOptions.epsg, findOptions.maxZoom);
      return;
    }
    if ((!findOptions.values || findOptions.values === 'null') && !findOptions.cqlFilter) {
      console.error('Parametri FIND non completi: manca CQL_FILTER o VALUES');
      return;
    }
    const cqlFilter = findOptions.cqlFilter || buildCqlFilter(findOptions);
    const layers = findOptions.layers || GV.config.getLayersNameByMapId(findOptions.map);

    const typeNames = layers.join(',');
    const layerConfig = GV.config.getLayerConfig(layers[0]);
    let wfsParams = layerConfig.wfsParams;
    wfsParams.typeName = typeNames;

    let loading = Loading.service({
      text: 'Ricerca...',
      background: 'rgba(0, 0, 0, 0.8)',
    });

    getWFSFeature(wfsParams, cqlFilter)
      .then(features => {
        this.hiliteFeatures(features, findOptions, layers, loading);
      })
      .catch(error => {
        console.error(error);
        loading.close();
      });
  },
  zoomTo(lat, lon, zoom) {
    this.setView(new L.LatLng(lat, lon), zoom);
  },
  zoomToBound(strBounds, epsg, maxZoom) {
    if (epsg != '4326') {
      const srsIn = epsg;
      const srsOut = '4326';
      getCoordTransformBbox(srsIn, srsOut, strBounds).then(response => {
        if (response.data.data) {
          const sw = response.data.data[0][0].split(',').reverse();
          const ne = response.data.data[1][0].split(',').reverse();
          this.fitBounds([sw, ne]);
        }
      });
    } else {
      const coord = strBounds.split(',');
      const sw = [coord[0], coord[1]];
      const ne = [coord[2], coord[3]];
      this.fitBounds([sw, ne]);
    }
  },
  getContainerPoint(latlng) {
    const point = this.latLngToContainerPoint(latlng);
    return point;
  },
  getBbox() {
    const bounds = GV.app.map.getBounds();
    const sw = GV.app.map.options.crs.project(bounds.getSouthWest());
    const ne = GV.app.map.options.crs.project(bounds.getNorthEast());
    return `${sw.x},${sw.y},${ne.x},${ne.y}`;
  },
  clearLayer() {
    const layer = this.getLayerByName('InfoWmsHilite');
    layer.clearLayers();
  },
  hiliteFeatures(features, findOptions, layers, loading) {
    InfoWmsManager.addHiliteLayer();
    const layer = this.getLayerByName('InfoWmsHilite');
    if (features && features.length > 0) {
      layer.clearLayers();
      layer.addData(features);
      if (!findOptions) {
        this.fitBounds(layer.getBounds(), {});
      } else {
        if (!findOptions.noZoom) {
          const maxZoom = findOptions && findOptions.maxZoom ? findOptions.maxZoom : 15;
          this.fitBounds(layer.getBounds(), {
            maxZoom: maxZoom,
          });
        }
      }
      if (layers) GV.config.hilitedLayer = layers;
    } else {
      if (findOptions && findOptions.notFoundAlert) {
        notification('Nessun Elemento Trovato');
      }
      console.warn('Nessun Elemento Trovato');
    }
    if (loading) loading.close();
  },
};

export default llMap;
