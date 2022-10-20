GV.init({
  debug: false,
  idMap: null,
  application: {
    name: 'geoviewer-test',
    mapOptions: {
      click: 'info',
      maxZoom: 19,
      zoom: 9
    },
    layout: {
      legend: {
        options: {
          show: true,
          showAddMap: true,
          showInfoMap: true,
          showLayersTransparency: true,
          showBaseLayerSwitcher: true,
          addMapConfig: {
            panels: {
              wms: {
                label: 'Servizi WMS',
              },
              kml: {
                label: 'KML/GPX/JSON', 
              },
            },
          },
        },
      },
      tools: [
        {
          name: 'gv-geocoder',
          position: 'topleft',
        },
        {
          name: 'gv-scalebar',
          position: 'bottomleft',
        },
      ],
    },
  },
  baseLayers: [
    {
      type: 'ESRI_IMAGERY',
      visible: true,
    },
    {
      type: 'OSM',
    },
    {
      type: 'BLANK',
    },
  ],
  maps: [],
});
