GV.init({
    debug: true,
    application: {
        mapOptions: {
//            initialExtent: "830036,5402959,1123018,5597635",
            infoWms: true
        },
        layout: {
            controls: [],
            toolbar: [
                {
                    position: "topleft",
                    items: [
                        {name: "fullscreen"},
                        {name: "baselayers"}
                    ]
                }
            ], 
            legend: null
        }
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
            type: 'ESRI_STREETS',
          },
          {
            type: 'ESRI_GRAY',
          },
          {
            type: 'ESRI_DARKGRAY',
          },
          {
            type: 'BLANK',
          },
    ],
    maps: []
});


