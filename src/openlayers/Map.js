import * as LayerFactory from './LayerFactory';
import getWFSFeature from '../services/getWFSFeature';
import buildCqlFilter from '../util/buildCqlFilter';
import InfoWmsManager from '../controls/InfoWmsManager';
import getCoordTransform from '../services/getCoordTransform';
import createElement from '../util/createElement';
import globals from '../globals';

import notification from '../util/notification';
import { Loading } from 'element-ui';

const olMap = {
  type: 'openlayers',
  layers: [],
  baseLayers: [],
  initialExtent: [],
  map: null,
  zoom: null,
  loading: 0,
  loaded: 0, 
  buttons: [],
  ol3dEnabled: false,
  options: {
    type: 'openlayers',
    zoomControl: false,
    minZoom: 7,
    maxZoom: 20,
  },
  initialize() {
    Object.assign(this.options, GV.config.application.mapOptions);

    // Gestione restricted extent
    const viewOptions = {};
    if (this.options.restrictedExtent) {
      viewOptions.extent = this.extentToArray(this.options.restrictedExtent);
    }

    this.map = new ol.Map({
      target: 'gv-map',
      layers: [],
      controls: [new ol.control.Attribution()],
      view: new ol.View(viewOptions),
    });

    this.createPopupDiv();
    this.setInitialExtent();
    this.zoom = this.getView().getZoom();
    this.setLoading();
    this.loadBaseLayer();
    this.eventMngr();

    if (this.options.ol3d) {
      this.loadCesium();
    }

    return this;
  },
  loadCesium() {
    require('../cesium/GeoserverTerrainProvider');

    const ol3d = new olcs.OLCesium({ map: this.map });
    this.scene = ol3d.getCesiumScene();
    var terrainProvider = new Cesium.GeoserverTerrainProvider({
      url: globals.GV_TERRAIN_PROVIDER_URL, 
      layerName: globals.GV_TERRAIN_PROVIDER_LAYER,
    });
    this.scene.terrainProvider = terrainProvider;

    if (this.options.enable3d) {
      ol3d.setEnabled(true);
      this.ol3dEnabled = true
    } 
    this.ol3d = ol3d;
  },
  switch3d() {
    this.ol3dEnabled = !this.ol3dEnabled
    this.ol3d.setEnabled(this.ol3dEnabled);    
  },
  setLoading() {
    GV.eventBus.$on('layer-load', event => {
      ++this.loading;
    });
    GV.eventBus.$on('layer-loaded', event => {
      ++this.loaded;
      if (this.loading === this.loaded) {
        this.loading = 0;
        this.loaded = 0;
        GV.log('FINE CARICAMENTO MAPPA');
        GV.eventBus.$emit('map-full-loaded', this.map);
      }
    });
  },
  eventMngr() {
    this.map.on('moveend', e => {
      const newZoom = this.getView().getZoom();
      if (this.zoom != newZoom) {
        GV.eventBus.$emit('map-zoom', newZoom);
        this.zoom = newZoom;
      }
    });
    this.map.on('rendercomplete', e => {});
    GV.eventBus.$on('set-layer-visible', event => {
      this.setLayerVisible(event.layer, event.checked);
      this.setHiliteLayerVisible(event.layer, event.checked);
    });
    GV.eventBus.$on('set-layer-transparency', event => {
      this.setLayerOpacity(event.layerName, event.opacity);
    });
    GV.eventBus.$on('change-base-layer', event => {
      this.changeBaseLayer(event.layer);
    });
  },
  addInteraction(intercation) {
    this.map.addInteraction(intercation);
  },
  removeInteraction(interaction) {
    this.map.removeInteraction(interaction);
  },
  getView() {
    return this.map.getView();
  },
  getOverlays() {
    return this.map.getOverlays();
  },
  removeOverlay(ovl) {
    this.map.removeOverlay(ovl);
  },
  setLayerOpacity(layerName, opacity) {
    const layer = this.getLayerByName(layerName);
    if (layer && layer.setOpacity) layer.setOpacity(opacity);
  },
  setExtent(extent) {
    const ext = this.extentToArray(extent);
    this.fit(ext);
  },
  extentToArray(extent) {
    const extFloat = extent.split(',').map(ex => {
      return parseFloat(ex);
    });
    return extFloat;
  },
  setInitialExtent() {
    GV.log('setInitialExtent');
    const center = this.mapOptions.center
    const zoom = this.mapOptions.minZoom
    this.setView(center, zoom);
  },
  setView(center, zoom) {
    // center: se oggetto Leaflet converto in array
    const coords = Array.isArray(center) ? center : [center.lng, center.lat];
    this.getView().setCenter(ol.proj.fromLonLat(coords));
    this.getView().setZoom(zoom);
  },
  getExtent() {
    var swPoint = this.getBounds().getSouthWest();
    var nePoint = this.getBounds().getNorthEast();
    var swPrj = L.Projection.SphericalMercator.project(swPoint);
    var nePrj = L.Projection.SphericalMercator.project(nePoint);
    return L.bounds(swPrj, nePrj);
  },
  getExtentAsString() {
    return this.getView()
      .calculateExtent()
      .join(',');
  },
  setLayerVisible(layerConfig, visible) {
    const layer = this.getLayerByName(layerConfig.name);
    layer.setVisible(visible);
    layerConfig.visible = visible;
  },
  setHiliteLayerVisible(layerConfig, visible) {
    if (!GV.config.hilitedLayer) {
      return;
    }
    for (const hl of GV.config.hilitedLayer) {
      if (hl[0] === layerConfig.name) {
        const layer = this.getLayerByName('InfoWmsHilite');
        layer.setVisible(visible);
      }
    }
  },
  layerInRange(layerConfig) {
    if (!layerConfig.minScale && !layerConfig.minScale) {
      return true;
    }
    return this.getScale() < layerConfig.minScale && this.getScale() > layerConfig.maxScale;
  },
  loadBaseLayer() {
    GV.config.baseLayers.forEach(layerConfig => {
      if (layerConfig.visible) {
        this.setBaseLayer(layerConfig);
      }
    });
  },
  setBaseLayer(layerConfig) {
    if (layerConfig.name === 'BLANK') {
      GV.config.activeBaseLayer = 'BLANK';
      return;
    }
    var layer = LayerFactory.create(layerConfig, this);
    if (layer) {
      layer.config.baseLayer = true;
      this.map.getLayers().insertAt(0, layer);
      this.activeBaseLayer = layer;
      GV.config.activeBaseLayer = layer.config.name;
    }
  },
  changeBaseLayer(layerName) {
    if (GV.config.activeBaseLayer !== layerName) {
      const layer = this.getLayerByName(GV.config.activeBaseLayer);
      this.removeLayer(layer);
      const layerConfig = GV.config.getBaseLayerConfig(layerName);
      this.setBaseLayer(layerConfig);
    }
  },
  getLayerByName(layerName) {
    var foundLayer = null;
    this.map.getLayers().forEach(layer => {
      if (layer.name && layer.name === layerName) {
        foundLayer = layer;
      }
    });
    return foundLayer;
  },
  getScale() {
    const scaleDenom = 591657550 / Math.pow(2, this.getView().getZoom());
    return scaleDenom;
  },
  getZoom() {
    return this.getView().getZoom();
  },
  setZoom(zoom) {
    this.getView().setZoom(zoom);
  },
  getCenter() {
    // RITORNA coppia coordinate wgs84 in formate leaflet lat/lon
    return ol.proj.transform(this.getView().getCenter(), 'EPSG:3857', 'EPSG:4326').reverse();
  },
  removeLayer(layer) {
    this.map.removeLayer(layer);
  },
  addLayer(layer) {
    this.map.addLayer(layer);
  },
  addOverlay(overlay) {
    this.map.addOverlay(overlay);
  },
  getTarget() {
    return this.map.getTarget();
  },
  getEventPixel(pixel) {
    return this.map.getEventPixel(pixel);
  },
  getSize() {
    return this.map.getSize();
  },
  fit(extent, opt) {
    let geom = ol.geom.Polygon.fromExtent(extent);
    // if (opt && opt.buffer) {
    //   geom.scale(opt.buffer);
    // }
    geom.scale(1.2);
    this.getView().fit(geom, opt);
  },
  createPopupDiv() {
    createElement({ elId: 'ol-popup', containerId: 'body' });
    createElement({ elId: 'ol-popup-closer', containerId: 'ol-popup' });
    createElement({ elId: 'ol-popup-content', containerId: 'ol-popup' });
  },
  loadLayers(layers) {
    let switch3d = false
    layers.forEach(layerConfig => {
      if (this.getLayerByName(layerConfig.name)) {
        return;
      }
      var layer = LayerFactory.create(layerConfig, this);
      if (layer) {
        if (this.ol3dEnabled && layerConfig.type === 'JSON' && layerConfig.name !== 'InfoWmsHilite' && layerConfig.name !== 'RisknatDataset') {
          switch3d = true
          this.switch3d()
        }
        this.addLayer(layer);

        GV.config.setLayerAttribute(layerConfig.name, 'inRange', this.layerInRange(layerConfig));
        const visible = layerConfig.visible && this.layerInRange(layerConfig);
        layer.setVisible(visible);        
        
        if (layerConfig.type === 'JSON') {
          const vectorSource = layer.getSource();
          vectorSource.once('change', () => {
            if (vectorSource.getState() === 'ready') {
              if (layerConfig.zoomToLayerExtent && layer.getSource().getFeatures().length > 0) {
                this.fit(vectorSource.getExtent(), { maxZoom: 15 });
              }
              if (switch3d) {
                this.switch3d()
              }
            }
          });
        }
      }
    });
  },
  clearLayer(layerName) {
    const layer = this.getLayerByName(layerName);
    const source = layer.getSource();
    source.clear();
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
    const coords = Array.isArray(markerConfig.location)
      ? markerConfig.location
      : [markerConfig.location.lng, markerConfig.location.lat];
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(coords)),
      name: markerConfig.label,
    });

    feature.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: '/geoservices/apps/viewer/dist/static/img/marker-icon.png',
        }),
      })
    );

    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [feature],
      }),
      zIndex: 1000,
    });
    this.addLayer(vectorLayer);

    this.fit(feature.getGeometry().getExtent(), {
      maxZoom: markerConfig.zoomLevel || 15,
    });
    return vectorLayer
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
  // TODO TEST
  zoomTo(lat, lon, zoom) {
    this.setView([lon, lat], zoom);
  },
  zoomToBound(extent, epsg, maxZoom) {
    if (epsg != '3857') {
      const ext = this.extentToArray(extent);
      const prj = new ol.proj.Projection({
        code: `EPSG:${epsg}`,
      });
      const trExt = ol.proj.transformExtent(ext, prj, 'EPSG:3857');
      this.fit(trExt, {
        maxZoom: maxZoom || 15,
      });
    } else {
      this.setExtent(extent);
    }
  },
  on(event, fn) {
    this.map.on(event, fn);
  },
  off(event, fn) {
    this.map.un(event, fn);
  },
  forEachFeatureAtPixel(pixel, callback, options) {
    this.map.forEachFeatureAtPixel(pixel, callback, options);
  },
  hiliteFeatures(features, findOptions, layers, loading) { 
    InfoWmsManager.addHiliteLayer();
    const layer = this.getLayerByName('InfoWmsHilite');
    if (features && features.length > 0) {
      const source = layer.getSource();
      source.clear();
      for (const feature of features) {
        const olFeature = new ol.format.GeoJSON().readFeature(feature, { 
          featureProjection: 'EPSG:3857',
        });
        source.addFeature(olFeature);
      }
      if (findOptions && !findOptions.noZoom) {
        const maxZoom = findOptions && findOptions.maxZoom ? findOptions.maxZoom : 15;
        this.fit(layer.getSource().getExtent(), {
          maxZoom: maxZoom,
        });
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

export default olMap;
