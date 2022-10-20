<template>
  <div class="gv-layer-search-topo gv-inverted-color-scheme" id="gv-layer-search-topo">
    <gv-title
      v-draggable
      :title="title"
      :divId="'gv-layer-search-topo'"
      :noClose="true"
      :collapsible="'gv-layer-search-topo-body'"
      :collapsedWidth="'180px'"
    ></gv-title>
    <div class="gv-layer-search-topo-body" id="gv-layer-search-topo-body">
      <el-form :model="form" ref="form">
        <el-form-item>
          MAPPA:
          <el-select
            id="gv-layer-search-topo-map-select"
            v-model="map"
            size="mini"
            @change="changeMap"
            filterable
          >
            <el-option
              v-for="item in maps"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span>LIVELLO:</span>
          <el-select
            id="gv-layer-search-topo-layer-select"
            v-model="layer"
            size="mini"
            placeholder="Livelli"
            @change="changeLayer"
            filterable
          >
            <el-option
              v-for="item in layers"
              :key="item.codice"
              :label="item.label"
              :value="item.codice"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="showAlfaParams">
          <el-select
            id="gv-layer-search-topo-column-select"
            v-model="column"
            size="mini"
            placeholder="Campo"
            no-data-text="Seleziona un livello"
            filterable
            class="gv-layer-search-topo-column-combo"
          >
            <el-option
              v-for="item in columns"
              :key="item.codice"
              :label="item.label"
              :value="item.codice"
            ></el-option>
          </el-select>
          <el-select
            v-model="operatore"
            size="mini"
            placeholder="Operatore"
            class="gv-layer-search-topo-operator-combo"
          >
            <el-option
              v-for="item in operatori"
              :key="item.codice"
              :value="item.label"
              :label="item.codice"
            ></el-option>
          </el-select>
          <el-input
            style="width: 200px"
            placeholder="Valore"
            v-model="valore"
            size="mini"
            id="gv-layer-search-topo-value"
          ></el-input>
          <el-button
            id="gv-layer-search-topo-value-list-button"
            v-show="showValueListButton"
            size="mini"
            type="primary"
            @click="populateValueList"
            >Lista Valori</el-button
          >
          <el-button
            id="gv-layer-search-topo-clear"
            v-show="showClearButton"
            size="mini"
            type="primary"
            @click="clearAlfaFields"
            >Pulisci</el-button
          >
        </el-form-item>
        <el-form-item>
          <span class="gv-map-download-label">Selezione Territoriale</span>
          <el-select
            id="gv-layer-search-topo-selterr"
            v-model="selezioneTerritoriale"
            size="mini"
            @change="changeSelezioneTerritoriale"
          >
            <el-option
              v-for="item in selezioniTerritoriali"
              :key="item.codice"
              :value="item.codice"
              :label="item.descrizione"
            ></el-option>
          </el-select>
          <span v-show="showSelectComuni" class="gv-map-download-label">Comune</span>
          <el-select
            id="gv-map-download-comuni"
            v-show="showSelectComuni"
            v-model="comune"
            size="mini"
            filterable
          >
            <el-option
              v-for="item in comuni"
              :key="item.codice"
              :value="item.codice"
              :label="item.nome"
            ></el-option>
          </el-select>
          <el-button
            id="gv-map-download-rect-reset"
            v-show="showRectReset"
            type="primary"
            size="mini"
            @click="rectReset"
            >Reimposta</el-button
          >
          <el-button
            id="gv-map-download-comuni-reset"
            v-show="showComuniReset"
            type="primary"
            size="mini"
            @click="comuniReset"
            >Reimposta</el-button
          >
        </el-form-item>
        <el-form-item class="gv-layer-search-topo-buttons">
          <el-button
            id="gv-layer-search-topo-submit-button"
            v-show="showSubmitButton"
            type="primary"
            size="mini"
            @click="submit"
            >Ricerca</el-button
          >
        </el-form-item>
        <div
          id="gv-layer-search-topo-value-list-panel"
          style="width: 350px;"
          v-show="showValueList"
        >
          <el-table
            id="gv-layer-search-topo-value-list-table"
            :data="valueList"
            highlight-current-row
            @current-change="onChangeValueList"
            size="mini"
            border
            style="width: 80%"
          >
            <el-table-column
              label="LISTA VALORI"
              style="word-wrap: break-word"
              property="value"
            ></el-table-column>
          </el-table>
          <el-pagination
            v-show="showPagination"
            small
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>

        <div id="gv-layer-search-topo-results-panel" v-if="showResults">
          <el-table
            id="gv-layer-search-topo-results-table"
            :data="dataTable"
            highlight-current-row
            @cell-click="onSelectResultsRow"
            size="mini"
            border
            style="width: 100%"
            :cell-style="{ padding: '0', maxHeight: '10px' }"
          >
            <el-table-column
              v-for="(column, index) in dataTableLabels"
              :key="index"
              :label="column"
              :min-width="dataTableWidths[index]"
            >
              <template slot-scope="scope">
                <div
                  :title="scope.row[index]"
                  style="height:20px; overflow:hidden; white-space: nowrap; "
                >
                  {{ scope.row[index] }}
                </div>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-show="showPagination"
            small
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handlePageChangeResults"
          ></el-pagination>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import RectDraw from '../mixins/RectDraw.js';

import mountComponent from '../util/mountComponent';
import globals from '../globals';
import getQueryLayer from '../services/getQueryLayerTopo';
import getQueryLayerTopoValueList from '../services/getQueryLayerTopoValueList';
import capitalize from '../util/capitalize';
import InfoWmsManager from '../controls/InfoWmsManager';
import getWFSFeature from '../services/getWFSFeature';
import notification from '../util/notification';
import getGeoJSON from '../services/getGeoJSON';

import {
  Button,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Tooltip,
} from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tooltip);

import { Loading } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

export default {
  name: 'gv-layer-search-topo',
  data() {
    return {
      title: 'RICERCHE SUI LIVELLI',
      configMaps: GV.config.maps,
      // maps: GV.config.maps.filter(map => map.type !== "R"),
      operatori: [
        { codice: '=', label: '=' },
        { codice: '!=', label: '!=' },
        { codice: '<', label: '<' },
        { codice: '>', label: '>' },
        { codice: '<=', label: '<=' },
        { codice: '>=', label: '>=' },
        { codice: 'LIKE', label: 'LIKE' },
      ],
      operatore: '=',
      layers: [],
      map: null,
      layer: null,
      // map: 2258,
      // layer: 8272,
      columns: [],
      column: null,
      valore: null,
      valueList: [],
      // results: [],
      dataTable: [],
      dataTableLabels: [],
      dataTableWidths: [],
      idList: [],
      limit: 10,
      total: 0,
      selezioniTerritoriali: [
        { codice: 0, descrizione: 'Nessuna' },
        { codice: 1, descrizione: 'Rettangolo' },
        { codice: 2, descrizione: 'Selezione per Comune' },
      ],
      selezioneTerritoriale: 0,
      showRectReset: false,
      showComuniReset: false,
      bbox: null,
      comune: null,
      layersWithSameStructure: false,
      comuni: [],
      style: null,
      hlStyle: null,
    };
  },
  computed: {
    maps() {
      return this.configMaps.filter(map => map.type !== 'R');
    },
    showSelectComuni() {
      return this.selezioneTerritoriale === 2;
    },
    showValueListButton() {
      return (this.layer || this.layersWithSameStructure) && this.column;
    },
    showClearButton() {
      return (this.layer || this.layersWithSameStructure) && this.column;
    },
    showAlfaParams() {
      return this.layer || this.layersWithSameStructure;
    },
    showSubmitButton() {
      return this.layer || (this.map && this.layersWithSameStructure);
    },
  },
  watch: {
    configMaps() {
      this.maps.filter(map => map.type !== 'R');
    },
    comune(comune) {
      this.syncComune(comune);
      this.showComuniReset = this.comune ? true : false;
    },
  },
  mixins: [RectDraw],
  mounted() {
    // this.rectAddLayer();
    // imposto stile feature
    this.setFeatureStyle();
    this.addLayerComuni();
  },
  methods: {
    handlePageChange(page) {
      if (this.showResults) return;
      const offset = this.limit * (page - 1);
      this.queryValueList(offset);
    },
    handlePageChangeResults(page) {
      const offset = this.limit * (page - 1);
      this.queryResults(offset);
    },
    onChangeValueList(item) {
      if (item) {
        this.valore = item.value;
        this.showValueList = false;
      }
    },
    onSelectResultsRow(row) {
      if (!row) return;

      InfoWmsManager.addHiliteLayer(GV.app.map);

      let layerName = null;
      if (this.layer) {
        layerName = `L${this.layer}`;
      } else {
        this.layers.forEach(layer => {
          if (row[0] === layer.label) layerName = `L${layer.codice}`;
        });
      }
      const value = row[1];

      const layerConfig = GV.config.getLayerConfig(layerName);
      const wfsParams = layerConfig.wfsParams;
      const idAttr = layerConfig.cachePostGIS
        ? layerConfig.infoOptions.infoIdAttr.toLowerCase()
        : layerConfig.infoOptions.infoIdAttr;
      const cqlFilter = `${idAttr}='${value}'`;

      getWFSFeature(wfsParams, cqlFilter)
        .then(features => {
          GV.app.map.hiliteFeatures(features);
        })
        .catch(error => {
          console.error(error);
        });
    },
    changeMap(id) {
      this.showValueList = false;
      this.showResults = false;
      this.maps.forEach(map => {
        if (map.id === id) {
          this.layers = [];
          this.layers.push({
            codice: null,
            label: 'Tutti i livelli',
            columns: [],
          });
          map.layers.forEach(layer => {
            if (layer.geomType !== 'RASTER') {
              if (layer.dbSchema && layer.dbSchema.columns && layer.dbSchema.columns.length > 0) {
                const columns = layer.dbSchema.columns.map(column => {
                  return {
                    codice: column.name,
                    label: capitalize(column.name.replace(/_/g, ' ')),
                    type: column.type,
                  };
                });
                this.layers.push({
                  codice: layer.id,
                  label: layer.legend.label,
                  columns: columns,
                });
              }
            }
          });
          this.mapLayers = this.layers
            .filter(layer => (layer.codice |= null))
            .map(layer => layer.codice)
            .join(',');
          this.layer = this.layers[0].codice;
          let columns = [];
          this.layers.forEach(layer => {
            const columnsList = layer.columns
              .map(column => column.codice)
              .sort()
              .join(',');
            if (columnsList !== '') columns.push(columnsList);
          });
          this.layersWithSameStructure = this.checkLayersStructure(columns);
          if (this.layersWithSameStructure) this.columns = this.layers[1].columns;
        }
      });
      this.clearAlfaFields();
    },
    checkLayersStructure(columns) {
      let check = true;
      if (columns.length < 2) return true;
      let col = columns[0];
      columns.forEach(el => {
        if (el !== col) check = false;
        col = el;
      });
      return check;
    },
    changeLayer(id) {
      if (!this.layersWithSameStructure) this.clearAlfaFields();
      this.showValueList = false;
      this.showResults = false;

      this.layers.forEach(layer => {
        if (layer.codice === id) {
          this.columns = layer.columns;
        }
      });
    },
    populateValueList() {
      const offset = 0;
      this.queryValueList(offset);
    },
    clearAlfaFields() {
      this.column = null;
      this.valore = null;
    },
    queryValueList(offset) {
      const column = this.column;
      const dataType = this.columns.filter(col => {
        return col.codice == column;
      })[0].type;
      // const layer = this.layer === 0 ? this.layers[1].codice : this.layer;
      const layers = this.layer || this.mapLayers;
      getQueryLayerTopoValueList(layers, column, dataType, offset, this.limit).then(res => {
        this.valueList = res.data.data;
        this.total = res.data.count;
        this.showValueList = true;
        this.showResults = false;
        if (this.total > this.limit) {
          this.showPagination = true;
        } else {
          this.showPagination = false;
        }
      });
    },
    submit() {
      this.showValueList = false;
      this.showResults = false;
      const offset = 0;
      this.queryResults(offset);
    },
    queryResults(offset) {
      let loading = Loading.service({
        target: '#gv-layer-search-topo-body',
        text: 'Ricerca...',
      });
      const column = this.column;
      const dataTypes = this.columns.filter(col => {
        return col.codice == column;
      })[0];
      const dataType = dataTypes && dataTypes[0] ? dataTypes[0].type : null;
      const operator = this.operatore;
      const value = this.valore;
      const topoFeature = this.comune ? 'COMUNI_PER_DOWNLOAD' : null;
      const topoQuery = this.comune ? 'CODICE_COMUNE=' + this.comune : null;
      const layers = this.layer || this.mapLayers;
      const version = '2';
      getQueryLayer(
        layers,
        offset,
        this.limit,
        column,
        dataType,
        value,
        operator,
        this.bbox,
        this.bboxSRS,
        topoFeature,
        topoQuery,
        version
      ).then(res => {
        loading.close();
        if (!res.data.success) {
          notification(res.data.message, 'error');
          return;
        }
        this.dataTable = res.data.dataTable;
        this.idList = res.data.idList;
        this.dataTableLabels = res.data.dataTableLabels;
        this.dataTableWidths = res.data.dataTableWidths;
        this.dataTableLabels.unshift('LIVELLO');
        this.dataTableWidths.unshift('150px');
        this.total = res.data.count;
        this.showValueList = false;
        this.showResults = true;
        if (this.total > this.limit) {
          this.showPagination = true;
        } else {
          this.showPagination = false;
        }
      });
    },
    cancel() {
      this.cleanUp();
    },
    cleanUp() {
      if (this.closeWindow === 'true') {
        window.close();
      } else {
        document
          .getElementById('gv-layer-search-topo')
          .parentNode.removeChild(document.getElementById('gv-layer-search-topo'));
      }
    },
    rectOnDraw(event) {
      if (GV.app.map.type === 'openlayers') {
        this.rectOnDrawOL(event);
      } else {
        this.rectOnDrawLL(event);
      }
    },
    rectOnDrawOL() {
      this.drawnRectangle.getSource().addFeature(
        new ol.Feature({
          geometry: this.dragBoxInteraction.getGeometry(),
          id: 'rect',
        })
      );
      const coords = this.drawnRectangle
        .getSource()
        .getFeatures()[0]
        .getGeometry()
        .getCoordinates();
      // const trasfCoords = coords.map(coord => {
      //   return ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
      // });
      this.bbox = coords.map(coord => {
        return coord.join(',');
      })[0];
      this.bboxSRS = '3857';
      setTimeout(function() {
        GV.config.activeControl.activate();
      }, 10);
    },
    rectOnDrawLL(event) {
      this.drawnRectangle.addLayer(event.layer);
      const xMin = event.layer.getBounds()._southWest.lng;
      const yMin = event.layer.getBounds()._southWest.lat;
      const xMax = event.layer.getBounds()._northEast.lng;
      const yMax = event.layer.getBounds()._northEast.lat;
      this.bbox = `${xMin},${yMin},${xMax},${yMin},${xMax},${yMax},${xMin},${yMax},${xMin},${yMin}`;
      this.bboxSRS = '4326';
      this.showRectReset = true;
      // Riattivo controllo base
      setTimeout(function() {
        GV.config.activeControl.activate();
      }, 10);
    },
    comuniReset() {
      this.comune = null;
    },
    addLayerComuni() {
      const baseUrl = `${globals.DEFAULT_PROXY}${globals.GV_DOWNLOAD_COMUNI_URL}`;
      const url = `${baseUrl}${globals.GV_DOWNLOAD_COMUNI_LAYER}`;
      getGeoJSON(url).then(response => {
        this.loadDataComuni(response.data);
      });
    },
    loadDataComuni(data) {
      if (GV.app.map.getLayerByName('SelezioneComune')) {
        GV.app.map.removeLayer(GV.app.map.getLayerByName('SelezioneComune'));
      }

      if (!data.features) {
        console.error('Layer Comuni con caricato');
        return;
      }
      this.comuni = data.features
        .map(feature => {
          return {
            codice: feature.properties.CODICE_COMUNE || feature.properties.codice_comune,
            nome: feature.properties.NOME_COMUNE || feature.properties.nome_comune,
          };
        })
        .sort(function(a, b) {
          if (a.nome < b.nome) {
            return -1;
          }
          if (a.nome > b.nome) {
            return 1;
          }
          return 0;
        });

      this.layerComuni = data;

      this.changeSelezioneTerritoriale(this.selezioneTerritoriale, true);
    },
    syncComune(comune) {
      const layerComuni = GV.app.map.getLayerByName('SelezioneComune');
      if (!layerComuni) {
        return;
      }
      if (GV.app.map.type === 'openlayers') {
        const features = layerComuni.getSource().getFeatures();
        for (const feature of features) {
          const codice = feature.get('CODICE_COMUNE') || feature.get('codice_comune');
          if (codice === comune) {
            feature.setStyle(this.hlStyle);
          } else {
            feature.setStyle(false);
          }
        }
      } else {
        layerComuni.eachLayer(layer => {
          layer.setStyle(this.style);
        });
        layerComuni.eachLayer(layer => {
          const codice =
            layer.feature.properties.CODICE_COMUNE || layer.feature.properties.codice_comune;
          if (codice === comune) {
            layer.setStyle(this.hlStyle);
          }
        });
      }

      // layerComuni.eachLayer(layer => {
      //   layer.setStyle({ fillOpacity: 0, weight: 1 });
      // });
      // layerComuni.eachLayer(layer => {
      //   const codice =
      //     layer.feature.properties.CODICE_COMUNE || layer.feature.properties.codice_comune;
      //   if (codice === comune) {
      //     layer.setStyle({ fillOpacity: 0, weight: 4 });
      //   }
      // });
    },
    setFeatureStyle() {
      let style;
      if (GV.app.map.type === 'openlayers') {
        style = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [255, 204, 0, 1],
            width: 1,
          }),
          // fill: new ol.style.Fill({
          //   color: [255, 204, 0, 0.1],
          // }),
        });
      } else {
        style = {
          color: '#ffcc00',
          fillOpacity: 0,
          weight: 1,
          opacity: 1,
        };
      }
      this.style = style;

      if (GV.app.map.type === 'openlayers') {
        style = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [255, 204, 0, 1],
            width: 3,
          }),
          fill: new ol.style.Fill({
            color: [255, 204, 0, 0.6],
          }),
        });
      } else {
        style = {
          color: '#ffcc00',
          fillOpacity: 0.6,
          weight: 2,
          opacity: 1,
        };
      }
      this.hlStyle = style;
    },
    changeSelezioneTerritoriale(codice, silent) {
      this.comune = null;
      this.bbox = null;

      if (codice === 1 || codice === 2) {
        GV.config.activeControl.deactivate();
      } else {
        GV.config.activeControl.activate();
      }

      if (codice === 1) {
        this.rectEnable();
      } else {
        this.rectDisable();
        this.showRectReset = false;
      }

      // Selezione per comune
      if (codice === 2) {
        GV.app.map.loadLayers([
          {
            name: 'SelezioneComune',
            type: 'JSON',
            style: this.style,
            visible: true,
            data: this.layerComuni,
            zIndex: 100,
            onFeatureSelect: (feature, layer) => {
              if (this.selezioneTerritoriale !== 2) {
                return;
              }
              this.comune = feature.get
                ? feature.get('CODICE_COMUNE') || feature.get('codice_comune')
                : feature.properties.CODICE_COMUNE || feature.properties.codice_comune;
            },
          },
        ]);
        if (!silent) notification('Selezionare un comune sulla mappa o dalla lista');
      } else {
        const layerComuni = GV.app.map.getLayerByName('SelezioneComune');
        if (layerComuni) {
          GV.app.map.removeLayer(layerComuni);
        }
      }
    },

    collapse: function(event) {
      if (this.show) {
        document.getElementById('gv-layer-search-topo-body').style.display = 'none';
      } else {
        document.getElementById('gv-layer-search-topo-body').style.display = 'block';
      }
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.gv-layer-search-topo {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 50px;
  background-color: #fff;
  z-index: 800;
}

.gv-layer-search-topo-body {
  margin: 10px;
}

/* #gv-layer-search-topo-value-list-button {
  float: right;
} */

.gv-layer-search-topo-buttons {
  margin-top: -5px;
}

.gv-layer-search-topo-operator-combo {
  width: 80px;
}

.gv-layer-search-topo-column-combo {
  width: 180px;
}

#gv-layer-search-topo-results-panel {
  width: 800px;
}
</style>

<style>
#gv-layer-search-topo-value {
  width: 200px;
}
.el-table__body-wrapper {
  overflow-y: hidden !important;
}
</style>
