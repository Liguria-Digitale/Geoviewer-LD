<template>
  <div id="gv-legend-layer-table">
    <el-table
      :data="map.layers"
      :show-header="false"
      size="mini"
      empty-text=" "
      :row-class-name="layerClassName"
      style="width: 100%; line-height: 23px; font-weight: 400"
    >
      <!-- style="width: 100%; line-height: 23px; font-weight: 400" -->
      <el-table-column align="center" width="30">
        <template slot-scope="scope">
          <img
            :alt="scope.row.legend.label"
            :src="iconUrl(scope.row)"
            width="20"
            @click="showLegendPanel(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" v-if="layerVisibilityCheck" width="25">
        <template slot-scope="scope">
          <span>
            <el-checkbox
              class="gv-layer-visibility-cb"
              v-model="scope.row.visible"
              @change="setLayerVisible(scope.row)"
              :disabled="!scope.row.inRange"
              >layer-visibility</el-checkbox
            >
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        class-name="gv-inverted-color-scheme-light"
        style="word-break: normal;"
        property="legend.label"
      >
      </el-table-column> -->
      <el-table-column class-name="gv-inverted-color-scheme-light" style="word-break: normal">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="left-start"
            v-show="!scope.row.inRange"
            offset="10"
            popper-class="gv-layer-popover"
          >
            <p>{{ scope.row.scaleRangeLabel }}</p>
            <div class="gv-legend-popover-button">
              <el-button
                title="Ricerca sul livello"
                @click="layerSearch(scope.row)"
                class="gv-color-scheme gv-legend-map-tools-button"
                icon="el-icon-search"
                size="mini"
                v-show="options.layerPopover && options.layerPopover.find"
              ></el-button>
            </div>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.legend.label }}
            </div>
          </el-popover>
          <el-popover
            trigger="hover"
            popper-class="popover-scala"
            placement="left-start"
            v-if="options.layerPopover && scope.row.inRange"
            width="150"
            offset="15"
          >
            <div class="gv-legend-transparency-layer-slider">
              <el-slider
                @change="setLayerTransparency(scope.row)"
                v-model="scope.row.opacityBase100"
              ></el-slider>
            </div>
            <el-row class="row-bg gv-legend-popover-buttons" type="flex" justify="left">
              <div class="gv-legend-popover-button">
                <el-button
                  title="Ricerca sul livello"
                  @click="layerSearch(scope.row)"
                  class="gv-color-scheme gv-legend-map-tools-button"
                  icon="el-icon-search"
                  size="mini"
                  v-show="options.layerPopover && options.layerPopover.find"
                ></el-button>
              </div>
              <div class="gv-legend-popover-button">
                <el-checkbox
                  class="gv-layer-visibility-cb"
                  v-model="scope.row.visible"
                  @change="setLayerVisible(scope.row)"
                  >layer-visibility</el-checkbox
                >
              </div>
            </el-row>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.legend.label }}
            </div>
          </el-popover>
          <div
            slot="reference"
            class="name-wrapper"
            v-show="!options.layerPopover && scope.row.inRange"
          >
            {{ scope.row.legend.label }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import mountComponent from '../util/mountComponent';

Vue.component('gv-multi-legend-panel', () => import('./MultiLegendPanel.vue'));
Vue.component('gv-layers-transparency', () => import('./LayersTransparency.vue'));
Vue.component('gv-layer-search-legend', () => import('./LayerSearchLegend.vue'));

import { Select, Option, Button, Table, TableColumn, Popover, Slider, Row, Col, Checkbox } from 'element-ui';
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);

export default {
  name: 'gv-legend-layers',
  props: ['map', 'options'],
  data() {
    const layerVisibilityCheck = this.options.hideLayerVisibilityCheck ? false : true;
    return {
      layerVisibilityCheck: layerVisibilityCheck,
    };
  },
  mounted() {
    GV.log('gv-legend-layers: mounted');
  },
  methods: {
    iconUrl(layer) {
      return layer.legend.icon;
    },
    getClass(layer) {
      return layer.inRange
        ? 'gv-list-legend-layer-item'
        : 'gv-list-legend-layer-item gv-list-legend-layer-disabled-item';
    },
    layerClassName({ row, rowIndex }) {
      return row.inRange
        ? 'gv-list-legend-layer-item'
        : 'gv-list-legend-layer-item gv-list-legend-layer-disabled-item';
    },
    setLayerVisible(layer) {
      GV.eventBus.$emit('set-layer-visible', {
        layer: layer,
        checked: layer.visible,
      });
      this.setLayerTransparency(layer);
    },
    setLayerTransparency(layer) {
      const opacity = layer['opacityBase100'] / 100;
      GV.eventBus.$emit('set-layer-transparency', {
        layerName: layer.name,
        opacity: opacity,
      });
    },
    layerSearch(layer) {
      mountComponent({
        elId: 'gv-layer-search-legend',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-layer-search-legend layerId=${layer.id}></gv-layer-search-legend>`,
        }),
      });
    },
    showLegendPanel(layer) {
      if (layer.inRange && (layer.multiClasse || layer.flagRemote || layer.legend.popUpFlag)) {
        var url = null,
          // html = null,
          width,
          height;
        if (layer.legend.popUpUrl && layer.legend.popUpFlag) {
          // se impostato attributo legendPopupUrl apro una finestra con il documento
          url = `${GV.globals.DEFAULT_PROXY}${layer.legend.popUpUrl}`;
          width = window.matchMedia('(max-width: 450px)').matches
            ? 300
            : layer.legend.popUpWidth || 600;
          height = window.matchMedia('(max-height: 620px)').matches
            ? 400
            : layer.legend.popUpHeight || 600;
        } else {
          // se livello multiclasse apro una finestra con la legenda dei livelli multiclasse
            url = `${GV.globals.DEFAULT_PROXY}${layer.wmsParams.url}LAYER=${layer.name}&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&`;
            if (layer.wmsParams.styles) {
              url += `STYLES=${layer.wmsParams.styles}&`;
            }
            width = window.matchMedia('(max-width: 450px)').matches ? 300 : 400;
            height = 350;
        } 
        mountComponent({
          elId: 'gv-multi-legend-panel',
          containerId: GV.config.containerId,
          vm: new Vue({
            template: `<gv-multi-legend-panel visible="true" :src="src" :height="height" :width="width" :title="title"></gv-multi-legend-panel>`,
            data: {
              // title: `LEGENDA - ${layer.legend.label}`,
              title: `LEGENDA`,
              src: url,
              // html: html,
              width: width,
              height: height,
            },
          }),
        });
      }
    },
  },
};
</script>

<style>
.gv-list-legend-layer-item {
  opacity: 1;
  filter: alpha(opacity=100);
}

.gv-list-legend-layer-disabled-item {
  opacity: 0.3;
  filter: alpha(opacity=30);
}

.gv-legend-layer-icon {
  padding-top: 3px;
}

.gv-legend-layer-icon img {
  width: 24px;
  height: 24px;
}

.gv-legend-map-tools-button {
  position: relative;
  right: 0;
  bottom: 0;
  font-size: 14px;
  /* color: #24386C !important;
  background-color: #CCC !important;
  border-color: #CCC !important; */
  padding: 2px 2px;
}

/* .gv-legend-map-tools {
  position: relative;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 260px;
}

.gv-legend-map-tools span {
  font-family: 'Raleway', Arial, sans-serif !important;
  font-size: 12px;
  font-weight: bold;
}
 */
.gv-layer-visibility-span {
  position: absolute;
  top: 16%;
  left: 29px;
}

.gv-layer-title-span {
  position: absolute;
  top: 50%;
  left: 55px;
  margin-top: -7px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;
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

.popover-scala {
  line-height: 0 !important;
}

.el-popover__title {
  color: #2d2f33;
  font-size: 14px !important;
  line-height: 0 !important;
  margin-bottom: 8px !important;
}

.gv-legend-transparency-layer-slider {
  margin-left: 5px;
  margin-right: 10px;
}

.gv-legend-popover-button {
  margin-right: 10px;
}

.gv-legend-popover-buttons {
  background-color: #fff !important;
  padding: 5px 5px 5px 5px !important;
}

.gv-layer-popover {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
  line-height: 0.4 !important;
  font-size: 12px !important;
  min-width: 50px !important;
}
</style>
