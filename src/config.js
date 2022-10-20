import Vue from 'vue';
import globals from './globals';
import getConfig from './services/getConfig';
import getCatalog from './services/getCatalog';
import getAgAppListaMappe from './services/getAgAppListaMappe';
import getEnti from './services/getEnti';
import getCoordTransform from './services/getCoordTransform';
import mountComponent from './util/mountComponent';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import getDownloadConfig from './services/getDownloadConfig';
import ConfermaDettaglio from './components/ConfermaDettaglio.vue';
Vue.component('gv-conferma-dettaglio', ConfermaDettaglio);

export default {
  _lastZIndex: 21,
  debug: false,
  containerId: 'gv-container',
  idMap: null,
  title: null,
  findOptions: null,
  zoomTo: null,
  geoserverUrl: null,
  application: {},
  baseLayers: [
    {
      type: 'ESRI_IMAGERY',
      visible: true,
    },
  ],
  activeBaseLayer: 'ESRI_IMAGERY',
  maps: [],
  hilitedLayer: [],

  async init(options) {
    if (!options) {
      throw new Error('Opzioni di inizializzazione non impostate!');
    }

    this.debug = options.debug;
    this.idMap = options.idMap;
    this.findOptions = options.findOptions;
    this.zoomTo = options.zoomTo;
    this.disableTMS = options.disableTMS;
    this.disableCache = options.disableCache;
    this.geoserverUrl = options.geoserverUrl;
    this.agAppMap = options.agAppMapList;

    if (options.application) {
      this.application = options.application;
    }
    if (options.containerId) {
      this.containerId = options.containerId;
    }

    this.application.layout =
      options.application && options.application.layout ? options.application.layout : {};

    if (options.application) {
      this.application.proxy = options.application.proxy || globals.DEFAULT_PROXY;
    }
    if (options.application && options.application.layout && options.application.layout.title) {
      this.title = options.application.layout.title;
    }

    // Gestione BaseLayers
    this.setBaseLayers(options.baseLayers);

    this.initLoadedMaps = 0;
    this.initLoadingMaps = 1;

    if (options.agAppMapList) {
      const appMappList = await getAgAppListaMappe(options.agAppMapList);
      this.agAppMapList = appMappList;
      const idMaps = appMappList.map(map => {
        return map.id;
      });
      this.loadMaps(idMaps);
    }

    if (options.idMap) {
      const idMaps = options.idMap.toString().split(',');
      this.loadMaps(idMaps);
    }

    if (!options.idMap && !options.agAppMap) {
      GV.eventBus.$on('gv-app-mounted', app => {
        options.maps.forEach(mapConfig => {
          this.addMapConfig(mapConfig, null);
        });
        if (this.application && this.application.callback) {
          this.application.callback(app);
        }
      });
    }

    GV.eventBus.$on('map-zoom', event => {
      var layers = this.getLayersConfig();
      layers.forEach(layerConfig => {
        this.setLayerAttribute(layerConfig.name, 'inRange', GV.app.map.layerInRange(layerConfig));
        // Controllo visibilità per livelli openlayers
        if (GV.app.map.type === 'openlayers') {
          const layer = GV.app.map.getLayerByName(layerConfig.name);
          const visible = layerConfig.visible && layerConfig.inRange;
          layer.setVisible(visible);
        }
      });
    });
  },

  loadMaps(idMaps) {
    this.initLoadingMaps = idMaps.length;

    idMaps.forEach(id => {
      this.addCatMap(id, true, false);
    });
    GV.eventBus.$on('gv-config-init', app => {
      if (this.application && this.application.callback) {
        this.application.callback(app);
      }
    });
  },

  setBaseLayers(baseLayers) {
    this.baseLayers = [];
    baseLayers.forEach(layer => {
      layer.name = layer.type;
      layer.label = globals.BASE_LAYERS[layer.type].label;
      layer.icon = globals.BASE_LAYERS[layer.type].icon;
      this.baseLayers.push(layer);
      if (layer.visible) this.activeBaseLayer = layer.name;
    });
  },

  changeBaseLayers(baseLayers) {
    GV.app.map.removeLayer(GV.app.map.activeBaseLayer);
    this.baseLayers.splice(0);
    baseLayers.forEach(layer => {
      layer.name = layer.type;
      layer.label = globals.BASE_LAYERS[layer.type].label;
      layer.icon = globals.BASE_LAYERS[layer.type].icon;
      this.baseLayers.push(layer);
      if (layer.visible) {
        this.activeBaseLayer = layer.name;
        if (GV.baseLayerSwitcher) GV.baseLayerSwitcher.activeBaseLayer = layer.name;
      }
    });

    GV.app.map.loadBaseLayers();
  },

  setLayerconfig(layer, mapConfig) {
    layer.extent_3857 = mapConfig.extent_3857;
    const minScaleLabel = layer.minScale ? ' da 1:' + layer.minScale : ' fino';
    const maxScaleLabel = layer.maxScale ? ' a 1:' + layer.maxScale : '';
    layer.scaleRangeLabel = 'Visibile' + minScaleLabel + maxScaleLabel;

    layer.minScale = layer.minScale === 0 ? 591657550 : layer.minScale;
    layer.inRange = GV.app && GV.app.map ? GV.app.map.layerInRange(layer) : true;
    if (typeof layer.opacity === 'undefined') layer.opacity = 1;
    layer.opacityBase100 = layer.opacity * 100;
    layer.zIndex = this._lastZIndex++;
    this.setLayerType(layer);
    this.setLayerCache(layer);
    return layer;
  },

  setLayerType(layer) {
    if (this.disableTMS && layer.idMap == this.idMap && layer.type === 'TMS') {
      layer.type = 'WMS';
    }
  },

  setLayerCache(layer) {
    if (this.disableCache && layer.idMap == this.idMap && layer.type === 'WMS') {
      layer.cacheMinZoomLevel = null;
    }
  },

  addMapConfig(mapConfig, baseMapConfig) {
    if (mapConfig.ancillaryMaps) {
      mapConfig.ancillaryMaps.forEach(config => {
        config.extent_3857 = null; // imposto a null per inibire zoom su extent
        this.addMapConfig(config, mapConfig);
      });
    }

    // Rimuovo i layer di LIVELLI_SFONDO (gestione sfondi con MAPPE_ACCESSORIE)
    mapConfig.layers = mapConfig.layers.filter(layer => {
      return !layer.flagBaseVectorLayer;
    });

    mapConfig.layers.forEach(layer => {
      this.setLayerconfig(layer, mapConfig);
    });
    mapConfig.layers.reverse();

    //  Aggiungo layer ad una mappa esistente
    if (mapConfig.addLayerConfig && this.getMapConfig(mapConfig.id)) {
      mapConfig.layers.forEach(layer => {
        this.getMapConfig(mapConfig.id).layers.push(layer);
      });
    } else {
      if (this.getMapConfig(mapConfig.id)) {
        return;
      }
      // Gestione visualizzazione layer della AncillaryMap in legenda
      // Se impostato baseMapConfig vuol dire che sto gestendo una mappa AncillaryMap
      // baseMapConfig è la configurazione della mappa base (principale)
      // mapConfig è la configurazione della AncillaryMap
      if (
        baseMapConfig &&
        (this.application.layout.legend.options.hideAncillaryMapLegend ||
          baseMapConfig.hideAncillaryMapLegend)
      ) {
        mapConfig.showLayersInLegend = false;
      } else {
        mapConfig.showLayersInLegend = true;
      }

      this.maps.unshift(mapConfig);
    }

    GV.eventBus.$emit('config-add-map', {
      config: mapConfig,
    });
  },

  setLayerAttribute(layerName, attribute, value) {
    this.maps.forEach(function(map) {
      let layers = map.layers;
      layers.forEach(function(layer) {
        if (layer.name === layerName) {
          layer[attribute] = value;
        }
      });
    });
  },

  removeMap(idMap) {
    const mapConfig = this.getMapConfig(idMap);
    if (!mapConfig) return;
    GV.eventBus.$emit('config-remove-map', {
      config: mapConfig,
    });
    const index = this.maps.findIndex(function(map) {
      return map.id === idMap;
    });
    if (index > -1) {
      this.maps.splice(index, 1);
    }
  },

  removeLayer(idLayer) {
    this.maps.forEach(map => {
      let layerIndex = -1;
      map.layers.forEach(function(layer, index) {
        if (layer.name === idLayer) {
          layerIndex = index;
        }
      });
      if (layerIndex > -1) {
        map.layers.splice(layerIndex, 1);
      }
      if (map.layers.length === 0) {
        this.removeMap(map.id);
      }
    });
    GV.eventBus.$emit('config-remove-layer', {
      config: idLayer,
    });
  },

  addLayerToMap(layerConfig, idMap) {
    let layer = Object.assign({}, layerConfig);
    this.maps.forEach(map => {
      if (map.id === idMap) {
        const mapConfig = this.getMapConfig(idMap);
        if (!this.isLayerInMapConfig(layer, mapConfig)) {
          this.setLayerconfig(layer, mapConfig);
          map.layers.unshift(layer);
        }
      }
    });
    GV.eventBus.$emit('config-add-layer', {
      config: layer,
    });
  },

  isLayerInMapConfig(layerConfig, mapConfig) {
    const layers = mapConfig.layers.filter(layer => {
      return layer.name === layerConfig.name;
    });
    return layers.length > 0;
  },

  setFlagVisible(mapConfig) {
    if (this.agAppMap) {
      var map = this.agAppMapList.filter(el => {
        return el.id === mapConfig.id.toString();
      });
      if (map && map[0] && !map[0].visible) {
        mapConfig.layers.forEach(layer => {
          layer.visible = false;
        });
      }
    }
  },

  async addCatMap(idMap, setBaseLayer, skipConferma) {
    if (this.getMapConfig(idMap)) {
      return this.getMapConfig(idMap);
    }
    try {
      const response = await getConfig(idMap);
      if (!response.data.success) {
        throw new Error('Errore Caricamento Mappa: ' + response.data.message);
      }
      if (!response.data.data) {
        throw new Error('Errore Caricamento Mappa: configurazione non trovata');
      }

      globals.SYS_MANUTENZIONE_DOWNLOAD =
        response.data.sistema && response.data.sistema.manutenzioneDownload;

      const mapConfig = response.data.data;
      if (mapConfig.fileDettaglio && !skipConferma) {
        const label = 'Condizioni di utilizzo';
        mountComponent({
          elId: 'gv-conferma-dettaglio',
          containerId: this.containerId,
          vm: new Vue({
            template: `<gv-conferma-dettaglio idMap="${idMap}" label="${label}" link="${mapConfig.fileDettaglio}"></gv-conferma-dettaglio>`,
          }),
        });
      } else {
        this.loadConfig(mapConfig, setBaseLayer);
      }
      return mapConfig;
    } catch (error) {
      console.error(error);
      Notification.error({
        title: 'Attenzione',
        type: 'error',
        duration: 5000,
        offset: 70,
        position: 'bottom-left',
        message: error.message,
      });
    }
  },

  loadConfig(mapConfig, setBaseLayer) {
    // Gestione flag visible per ALFA_GIS_LISTA_MAPPE
    this.setFlagVisible(mapConfig);

    // Aggiorno array delle mappe
    this.addMapConfig(mapConfig, null);

    // Aggiorno layer base per carte raster (blank)
    if (
      GV.app &&
      GV.app.map &&
      mapConfig.type &&
      mapConfig.type == 'R' &&
      setBaseLayer &&
      this.getBaseLayerConfig('BLANK')
    ) {
      GV.app.map.changeBaseLayer('BLANK');
      if (GV.baseLayerSwitcher) GV.baseLayerSwitcher.activeBaseLayer = 'BLANK';
    }

    // Aggiorno array layer base custom
    if (mapConfig.baseLayers && mapConfig.baseLayers.length > 0) {
      this.changeBaseLayers(mapConfig.baseLayers);
    }

    // Aggiorno layer base attivo
    if (mapConfig.activeBaseLayer) {
      GV.app.map.changeBaseLayer(mapConfig.activeBaseLayer);
      if (GV.baseLayerSwitcher) GV.baseLayerSwitcher.activeBaseLayer = mapConfig.activeBaseLayer;
    }

    if (GV.config.findOptions) {
      GV.app.map.find(GV.config.findOptions);
    }

    if (GV.config.zoomTo) {
      this.zoomToCoord(GV.config.zoomTo);
    }

    // Gestione callback
    this.initLoadedMaps = this.initLoadedMaps + 1;
    if (this.initLoadingMaps === this.initLoadedMaps) {
      GV.eventBus.$emit('gv-config-init', GV.app);
    }
  },
  async zoomToCoord(zoomConfig) {
    if (!zoomConfig.coord) {
      console.error('Parametro COORD non impostato');
      return;
    }
    if (!zoomConfig.epsg) {
      zoomConfig.epsg = 3003;
    }
    if (!zoomConfig.zoom) {
      zoomConfig.zoom = 16;
    }
    const x = zoomConfig.coord.split(',')[0];
    const y = zoomConfig.coord.split(',')[1];
    if (zoomConfig.epsg !== 4326 && zoomConfig.epsg !== 4258) {
      let loading = Loading.service({
        // target: "#gv-layer-search-topo-body",
        text: 'Ricerca...',
        background: 'rgba(0, 0, 0, 0.8)',
      });
      let response = await getCoordTransform(zoomConfig.epsg, '4326', x, y);
      if (response.data.points) {
        const lon = response.data.points[0].split(',')[0];
        const lat = response.data.points[0].split(',')[1];
        GV.app.map.addMarker({
          location: [lat, lon],
          zoomLevel: zoomConfig.zoom,
        });
      }
      loading.close();
    } else {
      GV.app.map.addMarker({
        location: [y, x],
        zoomLevel: zoomConfig.zoom,
      });
    }
  },
  async loadCatalog(params) {
    const catalog = await getCatalog(params);
    if (!catalog) {
      console.error("loadCatalog: Non sono riuscito a caricare il catalogo.")
      return
    }

    this.catalog = this.catalogFull = catalog.children;

    const enti = await getEnti();
    this.enti = enti;

    if (params.showMapCatalogPanel) {
      // Mount Pannello
      mountComponent({
        elId: 'gv-map-catalog-panel',
        toggleEl: false,
        vm: new Vue({
          template: `<gv-map-catalog-panel></gv-map-catalog-panel>`,
        }),
      });
    }
  },

  getLayersConfig(filter) {
    let layers = [];
    this.maps.forEach(function(map) {
      if (filter) {
        const filtered = map.layers.filter(filter);
        filtered.forEach(function(layer) {
          layers.push(layer);
        });
      } else {
        map.layers.forEach(function(layer) {
          layers.push(layer);
        });
      }
    });
    return layers;
  },

  getLayersNameByMapId(idMap) {
    if (!idMap) {
      console.error('Parametro "idMap" non definito');
      return null;
    }
    let layers = [];
    this.maps.forEach(function(map) {
      if (map.id.toString() === idMap) {
        map.layers.forEach(function(layer) {
          if (layer.idMap.toString() === idMap) layers.push(layer.name);
        });
      }
    });
    return layers;
  },

  getLayerConfig(layerName) {
    let foundLayer = null;
    this.maps.forEach(map => {
      map.layers.forEach(layer => {
        if (layer.name === layerName) {
          foundLayer = layer;
        }
      });
    });
    return foundLayer;
  },

  getBaseLayerConfig(layerName) {
    let foundLayer = this.baseLayers.find(function(layer) {
      return layer.name === layerName;
    });
    return foundLayer;
  },

  getMapConfig(idMap) {
    return this.maps.find(function(map) {
      return map.id == idMap;
    });
  },

  getToolOptions(toolName) {
    let options = null;
    if (!this.application.layout || !this.application.layout.tools) {
      return null;
    }
    this.application.layout.tools.forEach(item => {
      if (item.name === toolName && item.options) {
        options = item.options;
      }
    });
    return options;
  },

  getButtonOptions(buttonName) {
    let options = null;
    if (!this.application.layout || !this.application.layout.toolbar) {
      return null;
    }
    this.application.layout.toolbar.items.forEach(item => {
      if (item.name === buttonName && item.options) {
        options = item.options;
      }
    });
    return options;
  },

  getActiveBaseLayer() {
    let activeLayer = null;
    this.baseLayers.forEach(layer => {
      if (layer.visible) {
        activeLayer = layer;
      }
    });
    return activeLayer;
  },

  setActiveBaseLayer(layerName) {
    this.baseLayers.forEach(layer => {
      layer.visible = layer.name === layerName;
    });
  },
};
