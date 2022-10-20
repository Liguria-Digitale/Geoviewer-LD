<template>
  <div id="gv-draw-panel" class="gv-draw-panel">
    <gv-title :title="title" :divId="'gv-draw-panel'" v-draggable :noClose="true"></gv-title>
    <div id="gv-draw-panel-body" class="gv-draw-panel-body gv-inverted-color-scheme">
      <div class="gv-draw-panel-result gv-inverted-color-scheme">
        <div id="gv-draw-panel-draw"></div>
      </div>
    </div>
    <el-row type="flex" class="row-bg" justify="left">
      <el-button
        id="gv-draw-submit"
        title="Salva i dati sul DB"
        @click="submit"
        class="gv-color-scheme"
        size="mini"
        >Salva su DB</el-button
      >
      <el-button
        id="gv-draw-cancel"
        v-show="cancelButton"
        title="Ritorno alla applicazione"
        @click="cancel"
        class="gv-color-scheme"
        size="mini"
        >Annulla</el-button
      >
      <el-button
        id="gv-draw-cancel"
        v-show="refreshButton"
        title="Ricarica dati salvati sul DB"
        @click="refresh"
        class="gv-color-scheme"
        size="mini"
        >Ricarica</el-button
      >
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import getCoordTransform from '../services/getCoordTransform';
import getCoordTransformPoly from '../services/getCoordTransformPoly';
import getWFSFeature from '../services/getWFSFeature';

import { Button, Row, Col, Loading, Notification } from 'element-ui';
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);

export default {
  name: 'gv-draw-panel',
  data() {
    const options = GV.config.getToolOptions('gv-draw-button');
    return {
      options: options,
      title: 'Acquisizione Geometrie',
      defaultColor: '#3388ff',
      results: [],
      requestCount: 0,
      numRequests: 0,
      drawnItems: null,
      editing: false,
      deletedItems: [],
      submitButton: options.buttons && options.buttons.submit,
      cancelButton: options.buttons && options.buttons.cancel,
      refreshButton: options.buttons && options.buttons.refresh,
    };
  },
  computed: {},
  methods: {
    cancel() {
      if (this.options.cancel) this.options.cancel(this.results);
    },
    refresh() {
      var r = confirm(
        "L'operazione cancella eventuali modifiche non salvate su DB.\n\nSei sicuro?"
      );
      if (r == true) {
        this.results = [];
        this.deletedItems = [];
        if (this.options.initWfsRequests) this.addLayerFeatures(this.options.initWfsRequests);
      }
      return;
    },
    submit() {
      var r = confirm('Sei sicuro?');
      if (r == true) {
        this.submitOK();
      }
      return;
    },
    submitOK() {
      if (this.editing) {
        Notification({
          title: 'Attenzione',
          type: 'warning',
          duration: 5000,
          offset: 70,
          dangerouslyUseHTMLString: true,
          position: 'bottom-left',
          message: 'Modifiche in corso, salva o annulla le modifiche prima di inviare i dati',
        });
        return;
      }
      this.requestCount = 0;
      this.results = Object.keys(this.drawnItems._layers).map(key => {
        return {
          type: this.drawnItems._layers[key].options.type,
          properties: this.drawnItems._layers[key].options.properties,
          id: this.drawnItems._layers[key].options.id,
          layerName: this.drawnItems._layers[key].options.layerName,
          latlngs:
            this.drawnItems._layers[key].options.type === 'point'
              ? this.drawnItems._layers[key]._latlng
              : this.drawnItems._layers[key]._latlngs,
        };
      });
      this.numRequests = this.results.length;
      if (this.results.length === 0 && this.deletedItems.length === 0) {
        Notification({
          title: 'Attenzione',
          type: 'warning',
          duration: 5000,
          offset: 70,
          position: 'bottom-left',
          message:
            "Nessuna geometria da salvare, insersci le geometrie oppure premi il tasto 'Annulla'",
        });
        return;
      }

      this.loading = Loading.service({
        text: 'Salvataggio...',
        background: 'rgba(0, 0, 0, 0.8)',
      });
      if (this.results.length === 0) {
        this.options.submit(this.results, this.deletedItems, this.loading);
      } else {
        this.results.forEach(item => {
          this.convertCoords(item);
        });
      }
    },
    submitRefresh() {
      this.results = [];
      this.deletedItems = [];
      if (this.options.initWfsRequests) this.addLayerFeatures(this.options.initWfsRequests);
    },
    checkEndRequests() {
      // Se sono finite le conversioni faccio submit
      if (this.requestCount === this.numRequests) {
        this.options.submit(this.results, this.deletedItems, this.loading, this.submitRefresh);
      }
    },
    convertCoords(item) {
      switch (item.type) {
        case 'point':
          this.convertCoordsPoint(item);
          break;
        case 'polyline':
          this.convertCoordsLine(item);
          break;
        case 'polygon':
          this.convertCoordsPolygon(item);
          break;
      }
    },
    convertCoordsPoint(item) {
      if (this.options.epsg === '4326') {
        this.requestCount++;
        item.geom = [item.latlngs.lng.toFixed(6), item.latlngs.lat.toFixed(6)];
        this.checkEndRequests();
      } else {
        getCoordTransform('4326', this.options.epsg, item.latlngs.lng, item.latlngs.lat).then(
          response => {
            this.requestCount++;
            if (response.data.points) {
              item.geom = response.data.points[0].split(',');
            }
            this.checkEndRequests();
          }
        );
      }
    },
    convertCoordsLine(item) {
      let resultLine = [];
      item.latlngs.forEach(latlng => {
        resultLine.push([latlng.lng, latlng.lat]);
      });
      if (this.options.epsg === '4326') {
        this.requestCount++;
        item.geom = resultLine;
        this.checkEndRequests();
      } else {
        const data = {
          srsIn: '4326',
          srsOut: this.options.epsg,
          poly: resultLine,
        };
        getCoordTransformPoly(data).then(response => {
          this.requestCount++;
          item.geom = response.poly;
          this.checkEndRequests();
        });
      }
    },
    convertCoordsPolygon(item) {
      let resultLine = [];
      item.latlngs.forEach(poly => {
        poly.forEach(latlng => {
          resultLine.push([latlng.lng, latlng.lat]);
        });
      });
      if (this.options.epsg === '4326') {
        this.requestCount++;
        item.geom = resultLine;
        this.checkEndRequests();
      } else {
        const data = {
          srsIn: '4326',
          srsOut: this.options.epsg,
          poly: resultLine,
        };
        getCoordTransformPoly(data).then(response => {
          this.requestCount++;
          item.geom = response.poly;
          this.checkEndRequests();
        });
      }
    },
    setEditOptions() {
      let editOptions = null;
      if (this.options.tools.edit) {
        if (this.options.tools.edit.edit || this.options.tools.edit.remove) {
          editOptions = {
            featureGroup: this.drawnItems,
            poly: {
              allowIntersection: false,
            },
          };
          if (!this.options.tools.edit.remove) {
            editOptions.remove = false;
          }
          if (!this.options.tools.edit.edit) {
            editOptions.edit = false;
          }
          L.EditToolbar.Delete.include({
            removeAllLayers: false,
          });
        }
      }
      return editOptions;
    },
    setDrawOptions() {
      let drawOptions = null;
      if (this.options.tools.draw) {
        drawOptions = {
          rectangle: false,
          marker: false,
          circle: false,
        };

        if (this.options.tools.draw.point) {
          drawOptions.circlemarker = {
            type: 'point',
            radius: 4,
            color: this.options.color || this.defaultColor,
          };
        } else {
          drawOptions.circlemarker = false;
        }
        if (this.options.tools.draw.polyline) {
          drawOptions.polyline = {
            shapeOptions: {
              type: 'polyline',
              color: this.options.color || this.defaultColor,
            },
          };
        } else {
          drawOptions.polyline = false;
        }
        if (this.options.tools.draw.polygon) {
          drawOptions.polygon = {
            shapeOptions: {
              type: 'polygon',
              color: this.options.color || this.defaultColor,
            },
            allowIntersection: false,
          };
        } else {
          drawOptions.polygon = false;
        }
      }
      return drawOptions;
    },
    addDrawControl() {
      let editOptions = this.setEditOptions();
      let drawOptions = this.setDrawOptions();

      this.controlDraw = new L.Control.Draw({
        draw: drawOptions,
        edit: editOptions,
      });
      GV.app.map.addControl(this.controlDraw);

      this.addDrawToolbar();
      this.addEditToolbar();
    },
    addDrawToolbar() {
      if (this.options.tools.draw) {
        var drawPanel = document.getElementById('gv-draw-panel-draw');
        drawPanel.appendChild(this.controlDraw._toolbars['draw']._toolbarContainer);
        drawPanel.appendChild(this.controlDraw._toolbars['draw']._actionsContainer);
        if (this.options.tools.draw.point) {
          document.getElementsByClassName('leaflet-draw-draw-circlemarker')[0].className =
            'gv-draw-buttons ms ms-draw-point';
        }
        if (this.options.tools.draw.polyline) {
          document.getElementsByClassName('leaflet-draw-draw-polyline')[0].className =
            'gv-draw-buttons ms ms-draw-line';
        }
        if (this.options.tools.draw.polygon) {
          document.getElementsByClassName('leaflet-draw-draw-polygon')[0].className =
            'gv-draw-buttons ms ms-draw-polygon';
        }
      }
    },
    addEditToolbar() {
      if (this.options.tools.edit) {
        var drawPanel = document.getElementById('gv-draw-panel-draw');
        if (this.options.tools.edit.edit || this.options.tools.edit.remove) {
          drawPanel.appendChild(this.controlDraw._toolbars['edit']._toolbarContainer);
          drawPanel.appendChild(this.controlDraw._toolbars['edit']._actionsContainer);
        }
        if (this.options.tools.edit.edit) {
          const el = document.getElementsByClassName('leaflet-draw-edit-edit')[0];
          el.className = 'gv-draw-buttons fa fa-edit';
        }
        if (this.options.tools.edit.remove) {
          const el = document.getElementsByClassName('leaflet-draw-edit-remove')[0];
          el.className = 'gv-draw-buttons fa fa-trash';
        }
      }
    },
    addLayerFeatures(initWfsRequests) {
      this.drawnItems.clearLayers();
      initWfsRequests.forEach(request => {
        getWFSFeature(null, null, request.wfsURL)
          .then(features => {
            features.forEach(feature => {
              this.createGeometry(feature, request.layerName);
            });
            const bounds = this.drawnItems.getBounds();
            if (bounds._northEast && bounds._southWest) {
              GV.app.map.fitBounds(this.drawnItems.getBounds(), {
                maxZoom: 17,
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    createGeometry(feature, layerName) {
      // Creo geometrie a partire da GeoJSON
      let geom = null;
      switch (feature.geometry.type) {
        case 'Point':
          geom = L.circleMarker(L.latLng(feature.geometry.coordinates.reverse()), {
            type: 'point',
            color: this.options.color || this.defaultColor,
            radius: 4,
            weight: 4,
            opacity: 0.5,
            fillOpacity: 0.5,
            id: feature.id,
            layerName: layerName,
            properties: feature.properties,
          });
          if (geom) geom.addTo(this.drawnItems);
          break;
        case 'LineString':
          const polyline = this.reverseCoordsLine(feature.geometry.coordinates);
          geom = L.polyline(polyline, {
            type: 'polyline',
            color: this.options.color || this.defaultColor,
            id: feature.id,
            layerName: layerName,
            properties: feature.properties,
          });
          if (geom) geom.addTo(this.drawnItems);
          break;
        case 'MultiLineString':
          console.warn('ATTENZIONE: geometria di tipo MultiLineString', feature);
          // feature.geometry.coordinates.forEach(el => {
          //   geom = L.polygon(this.reverseCoordsLine(el), {
          //     type: "polyline",
          //     color: this.options.color || this.defaultColor,
          //     id: feature.id,
          //     layerName: layerName,
          //     properties: feature.properties
          //   });
          //   if (geom) geom.addTo(this.drawnItems);
          // });
          break;
        case 'Polygon':
          const poly = this.reverseCoordsPoly(feature.geometry.coordinates);
          geom = L.polygon(poly, {
            type: 'polygon',
            color: this.options.color || this.defaultColor,
            id: feature.id,
            layerName: layerName,
            properties: feature.properties,
          });
          if (geom) geom.addTo(this.drawnItems);
          break;
        case 'MultiPolygon':
          console.warn('ATTENZIONE: geometria di tipo MultiPolygon', feature);
          // feature.geometry.coordinates.forEach(el => {
          //   geom = L.polygon(this.reverseCoordsPoly(el), {
          //     type: "polygon",
          //     color: this.options.color || this.defaultColor,
          //     id: feature.id,
          //     layerName: layerName,
          //     properties: feature.properties
          //   });
          //   if (geom) geom.addTo(this.drawnItems);
          // });
          break;
      }
    },
    reverseCoordsLine(geom) {
      let reversedGeom = [];
      geom.forEach(el => {
        const coords = el.reverse();
        reversedGeom.push(coords);
      });
      return reversedGeom;
    },
    reverseCoordsPoly(geom) {
      let reversedGeom = [];
      geom.forEach(el => {
        const coords = el.map(coord => {
          return [coord[1], coord[0]];
        });
        reversedGeom.push(coords);
      });
      return reversedGeom;
    },
    hideLayer() {
      this.drawnItems.eachLayer(layer => {
        layer.getElement().style.display = 'none';
      });
    },
    showLayer() {
      this.drawnItems.eachLayer(layer => {
        layer.getElement().style.display = 'block';
      });
    },
  },
  mounted: function() {
    GV.app.map.on('draw:created', e => {
      e.layer.addTo(this.drawnItems);
    });
    GV.eventBus.$on('gv-control-draw-deactivate', ev => {
      GV.app.map.off('draw:created');
      this.hideLayer();
    });
    GV.eventBus.$on('gv-control-draw-activate', ev => {
      GV.app.map.on('draw:created', e => {
        e.layer.addTo(this.drawnItems);
      });
      this.showLayer();
      this.submitRefresh();
    });

    GV.app.map.on('draw:editstart', e => {
      this.editing = true;
    });
    GV.app.map.on('draw:editstop', e => {
      this.editing = false;
    });

    GV.app.map.on('draw:deletestart', e => {
      this.editing = true;
    });
    GV.app.map.on('draw:deletestop', e => {
      this.editing = false;
    });

    GV.app.map.on('draw:drawstart', e => {
      this.editing = true;
    });
    GV.app.map.on('draw:drawstop', e => {
      this.editing = false;
    });

    GV.app.map.on('draw:deleted', e => {
      Object.keys(e.layers._layers).forEach(key => {
        const item = {
          type: e.layers._layers[key].options.type,
          properties: e.layers._layers[key].options.properties,
          id: e.layers._layers[key].options.id,
          layerName: e.layers._layers[key].options.layerName,
          latlngs:
            e.layers._layers[key].options.type === 'point'
              ? e.layers._layers[key]._latlng
              : e.layers._layers[key]._latlngs,
        };
        this.deletedItems.push(item);
      });
    });

    // GV.eventBus.$on('draw-saved-data', ev => {
    //   // effettuo refresh
    //   if (this.options.initWfsRequests) this.addLayerFeatures(this.options.initWfsRequests);
    // });

    this.drawnItems = L.featureGroup();
    this.drawnItems.addTo(GV.app.map);

    if (this.options.initWfsRequests) this.addLayerFeatures(this.options.initWfsRequests);

    this.addDrawControl();

    // rispulisco eventuali hilite
    GV.app.map.getLayerByName('InfoWmsHilite').clearLayers();
  },
};
</script>

<style>
.gv-draw-panel {
  position: absolute;
  width: 260px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
}

.gv-draw-panel-body {
  padding: 10px;
  overflow-y: auto;
  width: 240px;
  height: 80px;
}

.gv-draw-panel-result {
  position: absolute;
  padding-left: 3px;
  margin: 0px;
  width: 230px;
}

.gv-draw-buttons {
  width: 20px;
  float: left;
  margin: 4px;
}

.gv-draw-buttons-reset {
  width: 36px;
  padding-left: 2px;
}

.leaflet-bar {
  box-shadow: none;
}
.leaflet-draw-actions {
  left: 2px;
  top: 54px !important;
}
.leaflet-draw-actions a {
  padding: 7px;
  margin: 2px;
}
.leaflet-draw-actions li:last-child a {
  -webkit-border-radius: 0 0 0 0;
  border-radius: 0 0 0 0;
}

.leaflet-draw-actions li:first-child a {
  margin-left: 4px;
}
.leaflet-draw-toolbar a {
  background-image: none;
}
.leaflet-draw-toolbar .leaflet-draw-draw-polyline {
  background-position: -2px -2px;
}

.leaflet-bar a:first-child {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.leaflet-bar a:last-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-right: 20px;
}
</style>
