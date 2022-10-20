<template>
  <div>
    <div
      v-if="screenWidth > maxScreenWidth"
      class="gv-map-catalog-panel gv-inverted-color-scheme"
      id="gv-map-catalog-panel"
    >
      <gv-title v-draggable :title="title" :hide="true" :divId="'gv-map-catalog-panel'"></gv-title>
      <div class="gv-map-catalog-panel-body">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane v-if="panels.repertorio" :label="panels.repertorio.label" name="repertorio">
            <gv-map-catalog-panel-repertorio
              :panel="panels.repertorio"
            ></gv-map-catalog-panel-repertorio>
          </el-tab-pane>
          <el-tab-pane v-if="panels.canali" :label="panels.canali.label" name="canali">
            <gv-map-catalog-panel-canali :panel="panels.canali"></gv-map-catalog-panel-canali>
          </el-tab-pane>
          <el-tab-pane v-if="panels.wms" :label="panels.wms.label" name="wms">
            <gv-map-catalog-panel-wms :panel="panels.wms"></gv-map-catalog-panel-wms>
          </el-tab-pane>
          <el-tab-pane v-if="panels.kml" :label="panels.kml.label" name="kml">
            <gv-map-catalog-panel-kml :panel="panels.kml"></gv-map-catalog-panel-kml>
          </el-tab-pane>
          <el-tab-pane v-if="panels.risknat" :label="panels.risknat.label" name="risknat">
            <gv-map-catalog-panel-risknat :panel="panels.risknat"></gv-map-catalog-panel-risknat>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div
      v-if="screenWidth < maxScreenWidth"
      class="gv-map-catalog-panel gv-inverted-color-scheme"
      id="gv-map-catalog-panel"
    >
      <!-- <div class="gv-map-catalog-panel gv-inverted-color-scheme" id="gv-map-catalog-panel"> -->
      <gv-title v-draggable :title="title" :hide="true" :divId="'gv-map-catalog-panel'"></gv-title>
      <div class="gv-map-catalog-panels-list-div">
        <el-select
          id="gv-map-catalog-panels-list"
          v-model="activeTab"
          size="mini"
          @change="changePanel"
        >
          <el-option
            v-for="item in panels"
            :key="item.name"
            :value="item.name"
            :label="item.label"
          ></el-option>
        </el-select>
      </div>
      <div class="gv-map-catalog-panel-body">
        <div
          v-show="activeTab == 'repertorio'"
          v-if="panels.repertorio"
          :label="panels.repertorio.label"
          name="repertorio"
        >
          <gv-map-catalog-panel-repertorio
            :panel="panels.repertorio"
          ></gv-map-catalog-panel-repertorio>
        </div>
        <div
          v-show="activeTab == 'canali'"
          v-if="panels.canali"
          :label="panels.canali.label"
          name="canali"
        >
          <gv-map-catalog-panel-canali :panel="panels.canali"></gv-map-catalog-panel-canali>
        </div>
        <div v-show="activeTab == 'wms'" v-if="panels.wms" :label="panels.wms.label" name="wms">
          <gv-map-catalog-panel-wms :panel="panels.wms"></gv-map-catalog-panel-wms>
        </div>
        <div v-show="activeTab == 'kml'" v-if="panels.kml" :label="panels.kml.label" name="kml">
          <gv-map-catalog-panel-kml :panel="panels.kml"></gv-map-catalog-panel-kml>
        </div>
        <div
          v-show="activeTab == 'risknat'"
          v-if="panels.risknat"
          :label="panels.risknat.label"
          name="risknat"
        >
          <gv-map-catalog-panel-risknat :panel="panels.risknat"></gv-map-catalog-panel-risknat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import mountComponent from '../util/mountComponent';
import uri from 'url';
import getWmsCapabilities from '../services/getWmsCapabilities';
import getKmlUrl from '../services/getKmlUrl';
import notification from '../util/notification';
import getGeoJSON from '../services/getGeoJSON';

Vue.component('gv-map-info-panel', () => import('./MapInfoPanel.vue'));0
Vue.component('gv-map-catalog-panel-repertorio', () => import('./MapCatalogPanelRepertorio.vue'));
Vue.component('gv-map-catalog-panel-canali', () => import('./MapCatalogPanelCanali.vue'));
Vue.component('gv-map-catalog-panel-wms', () => import('./MapCatalogPanelWMS.vue'));0
Vue.component('gv-map-catalog-panel-kml', () => import('./MapCatalogPanelKML.vue'));

import { Tabs, TabPane } from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);
import TestScreenWidth from '../mixins/TestScreenWidth';

export default {
  name: 'gv-map-catalog-panel',
  data() {
    const config = GV.config.application.layout.legend.options.addMapConfig;
    let panels = config.panels;
    for (const [key, panel] of Object.entries(panels)) {
      panel.name = key;
    }
    let activeTab = config.activePanel || Object.keys(config.panels)[0];
    return {
      title: 'CATALOGHI CARTOGRAFIE',
      panels: panels,
      activeTab: activeTab,
      // screenWidth: screen.width,
      // maxScreenWidth: 420,
    };
  },
  mounted() {
  },
  mixins: [TestScreenWidth],
  methods: {
    changePanel(panel) {
    },
  },
};
</script>

<style scoped>
.gv-map-catalog-panel {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 50px;
  background-color: #fff;
  z-index: 800;
}

.gv-map-catalog-panels-list-div {
  margin: 10px;
  /* margin-left: 10px; */
}
</style>

<style>
.el-tabs__item.is-active {
  color: #24386c !important;
  font-weight: 800 !important;
}

.el-tabs__header {
  margin: 0 0 5px !important;
}

@media only screen and (min-width: 420px) {
  .gv-map-catalog-panel {
    width: 480px;
  }
}

@media only screen and (max-width: 420px) {
  .gv-map-catalog-panel {
    width: 360px;
    margin-left: 1px !important;
  }
  .el-select-dropdown__item {
    height: 40px;
    font-size: 12px;
    word-wrap: break-word;
    max-width: 300px;
    white-space: normal;
    line-height: 24px;
  }
}
</style>
