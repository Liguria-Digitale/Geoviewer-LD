export default {
  DEFAULT_PROXY: '/geoservices/REST/proxy/proxy?url=',

  GV_MAP_CONFIG_SERVICE: '/geoservices/REST/geoportale/map/',
  GV_LAYER_CONFIG_SERVICE: '/geoservices/REST/config/layer/',
  GV_QUERY_LAYER_VALUE_LIST_SERVICE: '/geoservices/REST/config/query_layer_valuelist/',
  GV_QUERY_LAYER_TOPO_VALUE_LIST_SERVICE: '/geoservices/REST/config/query_layer_topo_valuelist/',
  GV_QUERY_LAYER_SERVICE: '/geoservices/REST/config/query_layer/',
  GV_QUERY_LAYER_TOPO_SERVICE: '/geoservices/REST/config/query_layer_topo/',
  GV_DYN_MAP_CONFIG_SERVICE: '/geoservices/REST/config/map/',
  GV_XSL_INFO_SERVICE: '/geoservices/REST/config/info_xsl?',
  GV_CATALOG_SERVICE: '/geoservices/REST/geoportale/catalogo/',
  GV_CANALI_SERVICE: '/geoservices/REST/config/ag_app_canali_tree/',
  GV_CANALE_CARTE_SERVICE: '/geoservices/REST/config/ag_canale_tree/',
  GV_DOWNLOAD_CONFIG_SERVICE: '/geoservices/REST/download/map/',
  GV_DOWNLOAD_INSERT_SERVICE: '/geoservices/REST/download/insert_richiesta/',
  GV_DOWNLOAD_ESEGUI_RICHIESTA: '/geoservices/REST/download/elabora_richiesta_sincrona/',
  GV_DOWNLOAD_COMUNI_URL: '',
  GV_DOWNLOAD_COMUNI_LAYER: '',
  GV_DOWNLOAD_SQUADRI_URL: '',
  GV_ENTI_SERVICE: '/geoservices/REST/geoportale/enti/',
  GV_METADATA_URL: '/geoservices/REST/metadata/scheda_xml/',
  GV_TRANSFORM_POINT_SERVICE: '/geoservices/REST/coordinate/transform_point/',
  GV_TRANSFORM_BBOX_SERVICE: '/geoservices/REST/coordinate/transform_bbox/',
  GV_TRANSFORM_POLY_SERVICE: '/geoservices/REST/coordinate/transform_poly/',
  GV_ELEVATION: '/geoservices/REST/coordinate/elevation/',
  GV_AG_APP_LISTA_MAPPE: '/geoservices/REST/config/ag_app_lista_mappe/',

  GV_CATALOG: 'pub',

  GV_TERRAIN_PROVIDER_URL: '',
  GV_TERRAIN_PROVIDER_LAYER: '',

  GV_NOMINATIM_URL: 'https://nominatim.openstreetmap.org/',

  MAX_BOUNDS: {
    X_MIN: 43.4,
    Y_MIN: 7.3,
    X_MAX: 44.8,
    Y_MAX: 10.5,
  },

  INFO_WMS_MAX_FEATURES: 10,

  BASE_SCALES: [
    591657550.5,
    295828775.3,
    147914387.6,
    73957193.82,
    36978596.91,
    18489298.45,
    9244649.227,
    4622324.614,
    2311162.307,
    1155581.153,
    577790.5767,
    288895.2884,
    144447.6442,
    72223.82209,
    36111.91104,
    18055.95552,
    9027.977761,
    4513.98888,
    2256.99444,
    1128.49722,
    564.24861,
    282.124305,
  ],

  BASE_LAYERS: {
    BLANK: {
      label: 'Sfondo Bianco',
      icon: '/geoservices/apps/viewer/static/img/legend/bianco.gif',
    },
    OSM: {
      label: 'OpenStreetMap',
      icon: '/geoservices/apps/viewer/static/img/legend/openstreetmap.png',
    },
    ESRI_IMAGERY: {
      label: 'ESRI Imagery',
      icon: '/geoservices/apps/viewer/static/img/legend/esri.gif',
    },
    ESRI_GRAY: {
      label: 'ESRI Gray',
      icon: '/geoservices/apps/viewer/static/img/legend/esri.gif',
    },
    ESRI_DARKGRAY: {
      label: 'ESRI Dark Gray',
      icon: '/geoservices/apps/viewer/static/img/legend/esri.gif',
    },
    ESRI_STREETS: {
      label: 'ESRI Streets',
      icon: '/geoservices/apps/viewer/static/img/legend/esri.gif',
    },
  },
};
