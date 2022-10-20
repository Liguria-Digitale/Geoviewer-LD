<template>
  <div class="gv-layer-search gv-inverted-color-scheme" id="gv-layer-search">
    <gv-title v-draggable :title="title" :divId="'gv-layer-search'" :hide="true"></gv-title>
    <div class="gv-layer-search-body" id="gv-layer-search-body">
      <el-form :model="form" ref="form">
        <el-form-item>
          <el-select
            id="gv-layer-search-layer-select"
            v-model="layer"
            size="mini"
            placeholder="Livello"
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
        <el-form-item>
          <el-select
            id="gv-layer-search-column-select"
            v-model="column"
            size="mini"
            placeholder="Campo"
            no-data-text="Seleziona un livello"
            filterable
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
            class="gv-layer-search-operator-combo"
          >
            <el-option
              v-for="item in operatori"
              :key="item.codice"
              :value="item.label"
              :label="item.codice"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="Valore"
            v-model="valore"
            size="mini"
            id="gv-layer-search-value"
          ></el-input>
        </el-form-item>
        <el-form-item class="gv-layer-search-buttons">
          <el-button
            id="gv-layer-search-value-list-button"
            v-show="showValueListButton"
            size="mini"
            type="primary"
            @click="populateValueList"
            >Lista Valori</el-button
          >
          <el-button
            id="gv-layer-search-submit-button"
            v-show="showSubmitButton"
            type="primary"
            size="mini"
            @click="submit"
            >Ricerca</el-button
          >
        </el-form-item>
        <div id="gv-layer-search-value-list-panel" v-show="showValueList">
          <el-table
            id="gv-layer-search-value-list-table"
            :data="valueList"
            highlight-current-row
            @current-change="onChangeValueList"
            size="mini"
            border
            style="width: 100%"
          >
            <el-table-column
              label="LISTA VALORI"
              style="word-wrap: break-word"
              property="value"
              width="345"
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
        <div id="gv-layer-search-results-panel" v-show="showResults">
          <el-table
            id="gv-layer-search-results-table"
            :data="results"
            highlight-current-row
            @current-change="onChangeResults"
            size="mini"
            border
            style="width: 100%"
          >
            <el-table-column
              label="RISULTATI RICERCA"
              style="word-wrap: break-word"
              property="label"
              width="335"
            ></el-table-column>
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

import mountComponent from '../util/mountComponent';
import globals from '../globals';
import getQueryLayer from '../services/getQueryLayer';
import getQueryLayerValueList from '../services/getQueryLayerValueList';
import capitalize from '../util/capitalize';
import InfoWmsManager from '../controls/InfoWmsManager';
import getWFSFeature from '../services/getWFSFeature';

import {
  Button,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  Notification,
  Table,
  TableColumn,
  Pagination,
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

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

export default {
  name: 'gv-layer-search',
  props: { layerId: String },
  data() {
    const layer = this.layerId ? parseInt(this.layerId) : null;
    return {
      title: 'RICERCA LIVELLI',
      maps: GV.config.maps,
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
      layer: layer,
      columns: [],
      column: null,
      valore: null,
      valueList: [],
      results: [],
      limit: 10,
      total: 0,
    };
  },
  computed: {
    layers() {
      let layers = [];
      this.maps.forEach((map) => {
        map.layers.forEach((layer) => {
          if (layer.dbSchema && layer.dbSchema.columns && layer.dbSchema.columns.length > 0) {
            const columns = layer.dbSchema.columns.map((column) => {
              return {
                codice: column.name,
                label: capitalize(column.name.replace(/_/g, ' ')),
                type: column.type,
              };
            });
            layers.push({
              codice: layer.id,
              label: layer.legend.label,
              columns: columns,
            });
          }
        });
      });
      return layers;
    },
    showValueListButton() {
      return this.layer && this.column;
    },
    showSubmitButton() {
      return this.layer && this.column && this.valore;
    },
  },
  watch: {},
  mounted() {
    // this.layer = this.layerId;
    if (this.layer) this.changeLayer(this.layer);
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
    onChangeResults(item) {
      if (!item) return;
      //TODO zoom + hilite
      InfoWmsManager.addHiliteLayer(GV.app.map);

      const layerName = `L${this.layer}`;
      const layerConfig = GV.config.getLayerConfig(layerName);
      const idAttr = layerConfig.cachePostGIS ? item.idField.toLowerCase() : item.idField;
      const cqlFilter = `${idAttr}='${item.id}'`;

      getWFSFeature(layerConfig.wfsParams, cqlFilter)
        .then((features) => {
          GV.app.map.hiliteFeatures(features);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changeLayer(id) {
      this.column = null;
      this.valore = null;
      this.showValueList = false;
      this.showResults = false;

      this.layers.forEach((layer) => {
        if (layer.codice === id) {
          this.columns = layer.columns;
        }
      });
    },
    populateValueList() {
      const offset = 0;
      this.queryValueList(offset);
    },
    queryValueList(offset) {
      const column = this.column;
      const dataType = this.columns.filter((col) => {
        return col.codice == column;
      })[0].type;
      getQueryLayerValueList(this.layer, column, dataType, offset, this.limit).then((res) => {
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
      //TODO controllo formato columns data
      const offset = 0;
      this.queryResults(offset);
    },
    queryResults(offset) {
      const column = this.column;
      const dataType = this.columns.filter((col) => {
        return col.codice == column;
      })[0].type;
      const operator = this.operatore;
      const value = this.valore;
      getQueryLayer(this.layer, offset, this.limit, column, dataType, value, operator).then(
        (res) => {
          this.results = res.data.data;
          this.total = res.data.count;
          this.showValueList = false;
          this.showResults = true;
          if (this.total > this.limit) {
            this.showPagination = true;
          } else {
            this.showPagination = false;
          }
        }
      );
    },
    cancel() {
      this.cleanUp();
    },
    cleanUp() {
      if (this.closeWindow === 'true') {
        window.close();
      } else {
        document
          .getElementById('gv-layer-search')
          .parentNode.removeChild(document.getElementById('gv-layer-search'));
      }
    },
    collapse: function (event) {
      if (this.show) {
        document.getElementById('gv-layer-search-body').style.display = 'none';
      } else {
        document.getElementById('gv-layer-search-body').style.display = 'block';
      }
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.gv-layer-search {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 50px;
  background-color: #fff;
  z-index: 800;
}

@media only screen and (max-width: 420px) {
  .gv-layer-search {
    margin-left: 0px;
    margin-top: 28px;
  }
}

.gv-layer-search-body {
  margin: 10px;
}

.gv-layer-search-label {
  display: inline-block;
  width: 150px;
}

/* #gv-layer-search-value-list-button {
  float: right;
} */

.gv-layer-search-buttons {
  margin-top: -5px;
}

.gv-layer-search-operator-combo {
  width: 100px;
}
</style>

<style>
#gv-layer-search-value {
  width: 250px;
}

@media only screen and (max-width: 420px) {
  .el-select-dropdown {
    width: 350px;
  }
}
</style>
