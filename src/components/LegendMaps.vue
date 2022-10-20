<template>
  <div v-bar>
    <div id="gv-legend-maps">
      <ul v-for="map in maps" class="gv-list-group" :key="map.id">
        <div class="gv-list-legend-map-item gv-inverted-color-scheme">
          <li>{{ map.name }}</li>
          <div class="gv-legend-map-tools gv-inverted-color-scheme">
            <el-button
              title="Mostra/Nascondi Livelli in Legenda"
              @click="toggleLayers(map)"
              v-if="!options.noToggleLayers"
              :class="getToggleLayersClass(map)"
              size="mini"
            ></el-button>
            <el-button
              :id="'gv-legend-scheda-' + map.id"
              title="Visualizza Scheda"
              v-if="checkInfoMap(map)"
              @click="showMapInfoPanel(map)"
              class="gv-inverted-color-scheme gv-legend-map-tools-button"
              icon="el-icon-document"
              size="mini"
            ></el-button>
            <el-button
              :id="'gv-legend-delete-' + map.id"
              title="Elimina Mappa"
              v-if="!options.noDeleteButton"
              @click="remove(map)"
              class="gv-inverted-color-scheme gv-legend-map-tools-button"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-button
              :id="'gv-legend-transparency-' + map.id"
              title="Trasparenza Livelli"
              v-if="options.showLayersTransparency"
              @click="layerTransparency(map)"
              class="gv-inverted-color-scheme gv-legend-map-tools-button"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
            <el-button
              :id="'gv-legend-download-' + map.id"
              title="Download Mappa"
              v-if="isDownloadable(map)"
              @click="download(map)"
              class="gv-inverted-color-scheme gv-legend-map-tools-button"
              icon="el-icon-download"
              size="mini"
            ></el-button>
          </div>
        </div>
        <!-- LIVELLI -->
        <gv-legend-layers
          v-show="showMapLayers(map)"
          :map="map"
          :options="options"
        ></gv-legend-layers>
      </ul>
    </div>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import mountComponent from '../util/mountComponent';

import LegendLayers from './LegendLayers.vue';
Vue.component('gv-legend-layers', LegendLayers);

Vue.component('gv-map-info-panel', () => import('./MapInfoPanel.vue'));
Vue.component('gv-map-catalog-panel', () => import('./MapCatalogPanel.vue'));
Vue.component('gv-map-download', () => import('./Download.vue'));

import Vuebar from 'vuebar';
Vue.use(Vuebar);

import { Button } from 'element-ui';
Vue.use(Button);

export default {
  name: 'gv-legend-maps',
  props: ['options'],
  data() {
    return {
      maps: GV.config.maps,
      // options: GV.config.application.layout.legend.options,
    };
  },
  mounted() {
    GV.log('gv-legend-maps: mounted');
    if (this.options.showDownloadPanelOnLoad && GV.config.idMap) {
      GV.eventBus.$on('gv-config-init', config => {
        this.openDownloadPanel(GV.config.idMap);
      });
    }
  },
  methods: {
    showMapLayers(map) {
      return map.showLayersInLegend;
    },
    toggleLayers(map) {
      map.showLayersInLegend = !map.showLayersInLegend;
    },
    getToggleLayersClass(map) {
      return map.showLayersInLegend
        ? 'gv-inverted-color-scheme gv-legend-map-tools-button el-icon-arrow-up'
        : 'gv-inverted-color-scheme gv-legend-map-tools-button el-icon-arrow-down';
    },
    isDownloadable(map) {
      if (this.options.noDownloadButton) return false;
      if (GV.globals.GV_CATALOG === 'pub' && map.flagDownload) return true;
      if (GV.globals.GV_CATALOG === 'int' && (map.flagDownloadExtranet || map.flagDownload))
        return true;
      return false;
    },
    checkInfoMap(map) {
      return this.options.showInfoMap && GV.config.getMapConfig(map.id).metaData;
    },
    checkDeleteMap(map) {
      return !this.options.hideDeleteButton;
    },
    showMapInfoPanel: function(map) {
      const metaData = GV.config.getMapConfig(map.id).metaData;
      const downloadable = this.isDownloadable(map);
      mountComponent({
        elId: 'gv-map-info-panel',
        containerId: GV.config.containerId,
        clear: true,
        vm: new Vue({
          template: `<gv-map-info-panel visible="true" :metaData="metaData" addToMapButton="true" downloadable="${downloadable}"></gv-map-info-panel>`,
          data: { metaData: metaData },
        }),
      });
    },
    remove: function(map) {
      GV.config.removeMap(map.id);
    },
    download(map) {
      this.openDownloadPanel(map.id);
    },
    openDownloadPanel(idMap) {
      if (document.getElementById('gv-map-download')) {
        const element = document.getElementById('gv-map-download');
        element.parentNode.removeChild(element);
      }
      const closeWindow = this.options.downloadPanelCloseMode === 'closeWindow';
      mountComponent({
        elId: 'gv-map-download',
        containerId: GV.config.containerId,
        toggleEl: false,
        vm: new Vue({
          template: `<gv-map-download idMap="${idMap}" closeWindow="${closeWindow}"></gv-map-download>`,
        }),
      });
    },
    layerTransparency: function(map) {
      mountComponent({
        elId: 'gv-layers-transparency',
        containerId: GV.config.containerId,
        toggleEl: false,
        vm: new Vue({
          template: `<gv-layers-transparency idMap="${map.id}"></gv-layers-transparency>`,
        }),
      });
    },
  },
};
</script>

<<style>
.gv-list-group {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  background-color: #fff;
  width: 260px;
}

.gv-legend-map-tools {
  position: relative;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 260px;
}

.gv-list-legend-map-item {
  position: relative;
  display: block;
  padding: 0.1rem 0.5rem;
  margin-bottom: -1px;
  border: 1px solid #ddd;
  font-size: 13px;
  font-weight: bold;
}

.gv-list-legend-map-item li {
  list-style-type: none;
}

.gv-legend-map-tools-button {
  position: relative;
  right: 0;
  bottom: 0;
  font-size: 14px;
  padding: 2px 2px;
}

.gv-legend-map-tools span {
  font-family: 'Raleway', Arial, sans-serif !important;
  font-size: 12px;
  font-weight: bold;
}

#gv-legend-maps {
  width: 260px;
  max-height: 400px;
  cursor: default;
  overflow: hidden;
}

#gv-legend-maps:hover {
  overflow-y: scroll;
}

@media (max-height: 500px) {
  #gv-legend-maps {
    overflow-y: scroll;
    max-height: 200px;
  }
}

.el-input__suffix {
  right: 25px;
  transition: all 0.3s;
  pointer-events: none;
  color: #24386c;
}
.el-table .cell {
  word-break: normal !important;
  line-height: 15px !important;
}
</style>
