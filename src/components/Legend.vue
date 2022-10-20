<template>
  <div id="gv-legend" class="gv-inverted-color-scheme">
    <div id="gv-legend-title" class="gv-legend-title gv-color-scheme">
      <b>LEGENDA</b>
      <button
        :class="toggleCollapseClass()"
        size="mini"
        @click="hideLegend"
        title="Nascondi Legenda"
      ></button>
      <el-button
        id="gv-legend-add-map"
        title="Aggiungi Mappe"
        v-show="options.showAddMap"
        @click="addMap"
        class="gv-color-scheme gv-legend-buttons ms ms-layers-add"
        size="mini"
      />
      <el-button
        id="gv-legend-add-map"
        title="Download Mappe"
        v-show="options.showDownloadTotale"
        @click="downloadMaps"
        class="gv-color-scheme gv-legend-buttons el-icon-download"
        size="mini"
      />
    </div>
    <div id="gv-legend-title-collapsed" class="gv-legend-title-collapsed gv-color-scheme">
      <button
        :class="toggleCollapseClass()"
        size="mini"
        @click="hideLegend"
        title="Mostra Legenda"
      ></button>
    </div>
    <!-- MAPS -->
    <div id="gv-legend-wrapper" class="gv-legend-wrapper">
      <gv-legend-maps :maps="maps" :options="options"></gv-legend-maps>
      <div class="gv-legend-footer gv-inverted-color-scheme">
        <gv-base-layer-switcher
          ref="gv-base-layer-switcher"
          v-if="options.showBaseLayerSwitcher"
        ></gv-base-layer-switcher>
      </div>
    </div>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import mountComponent from '../util/mountComponent';

import BaseLayerSwitcher from './BaseLayerSwitcher.vue';
Vue.component('gv-base-layer-switcher', BaseLayerSwitcher);

import LegendMaps from './LegendMaps.vue';
Vue.component('gv-legend-maps', LegendMaps);

Vue.component('gv-map-catalog-panel', () => import('./MapCatalogPanel.vue'));

import { Button } from 'element-ui';
Vue.use(Button);

export default {
  name: 'gv-legend',
  data() {
    return {
      options: GV.config.application.layout.legend.options,
      maps: GV.config.maps,
      show: true,
    };
  },
  mounted() {
    GV.log('gv-legend: mounted');
    GV.legend = this;
    if (this.options.showAddMap) {
      let showMapCatalogPanel = GV.config.idMap || GV.config.agAppMap ? false : true;
      if (this.options.showMapCatalogPanelOnStart) showMapCatalogPanel = true;
      if (this.options.dontShowMapCatalogPanelOnStart) showMapCatalogPanel = false;
      GV.config.loadCatalog({
        showMapCatalogPanel: showMapCatalogPanel,
        filterDownloadCatalog: this.options.filterDownloadCatalog,
      });
    }
    if (this.options.collapsed || window.matchMedia('(max-width: 500px)').matches) {
      this.show = false;
    }
    this.hideLegend();
  },
  methods: {
    hideLegend: function(event) {
      if (this.show) {
        document.getElementById('gv-legend-title').style.display = 'block';
        document.getElementById('gv-legend-title-collapsed').style.display = 'none';
        document.getElementById('gv-legend-wrapper').style.display = 'block';
        document.getElementById('gv-legend').style.width = '260px';
      } else {
        document.getElementById('gv-legend-title').style.display = 'none';
        document.getElementById('gv-legend-title-collapsed').style.display = 'block';
        document.getElementById('gv-legend-wrapper').style.display = 'none';
        document.getElementById('gv-legend').style.width = '26px';
      }
      this.show = !this.show;
    },
    toggleCollapseClass() {
      return this.show
        ? 'gv-legend-collapse gv-color-scheme el-icon-arrow-down'
        : 'gv-legend-collapse gv-color-scheme el-icon-arrow-up';
    },
    addMap: function() {
      mountComponent({
        elId: 'gv-map-catalog-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-map-catalog-panel></gv-map-catalog-panel>`,
        }),
      });
    },
    downloadMaps: function() {
      mountComponent({
        elId: 'gv-download-totale-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-download-totale-panel></gv-download-totale-panel>`,
        }),
      });
    },
  },
};
</script>

<<style>
#gv-legend {
  position: absolute;
  float: right;
  right: 0;
  top: 0;
  margin-right: 10px;
  margin-top: 10px;
  width: 260px;
  z-index: 800;
  max-height: 430px;
}


.gv-legend-collapse {
  cursor: pointer;
  border: 0;
  -webkit-appearance: none;
  float: right;
  font-size: 14px;
  margin-top: 3px;
  opacity: 1;
}

.gv-legend-title :focus {
  outline: -webkit-focus-ring-color auto 0px;
}

.gv-legend-title {
  position: relative;
  display: block;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-right: 0rem;
  padding-left: 0.5rem;
  margin-bottom: -1px;
  color: #ccc;
  cursor: default;
  font-weight: bold;
  font-family: 'Raleway', Arial, sans-serif !important;
  font-size: 14px;
}

.gv-legend-title-collapsed {
  height: 18px;
  padding-top: 0.1rem;
  padding-bottom: 0.3rem;
  padding-right: 0rem;
  padding-left: 0.5rem;
  margin-bottom: -1px;
  color: #ccc;
  cursor: default;
  font-weight: bold;
  font-family: 'Raleway', Arial, sans-serif !important;
  font-size: 14px;
}

@media only screen and (max-width: 420px) {
  #gv-legend {
    margin-right: 0px;
    margin-top: 0px;
  }
  .gv-legend-title-collapsed {
    height: 20px;
    padding-top: 0.1rem;
    padding-bottom: 0.3rem;
    padding-right: 0rem;
    padding-left: 0.5rem;
  }  
}

.gv-legend-title span {
  font-size: 14px;
  font-weight: bold;
}

.gv-legend-close {
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
  float: right;
  font-size: 14px;
  background-color: #24386c !important;
  color: #ccc !important;
  opacity: 1;
}

.gv-legend-buttons {
  cursor: pointer;
  border: 0;
  -webkit-appearance: none;
  float: right;
  line-height: 1;
  font-size: 14px !important;
}

.gv-legend-footer {
  display: block;
  padding: 0.3rem 0.5rem;
  margin-bottom: -1px;
  cursor: default;
}

#gv-legend-body {
  width: 260px;
  max-height: 400px;
  cursor: default;
  overflow: hidden;
}

#gv-legend-body:hover {
  overflow-y: scroll;
}

@media (max-height: 500px) {
  #gv-legend-body {
    overflow-y: scroll;
    max-height: 200px;
  }
}

#gv-legend-wrapper {
  display: block;
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
