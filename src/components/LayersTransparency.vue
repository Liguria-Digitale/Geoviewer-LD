<template>
  <div id="gv-layers-transparency" class="gv-inverted-color-scheme">
    <gv-title
      v-draggable
      title="TRASPARENZA LAYER"
      :hide="false"
      :divId="'gv-layers-transparency'"
    ></gv-title>
    <div id="gv-layers-transparency-wrapper" class="gv-layers-transparency-wrapper">
      <div id="gv-layers-transparency-body">
        <ul class="gv-layers-transparency-list-group">
          <li v-for="layer in layers" :layer="layer" :class="getClass(layer)" :key="layer.id">
            <span class="gv-transparency-layer-title-span">{{ layer.legend.label }}</span>
            <div class="gv-transparency-layer-slider">
              <el-slider @change="onChange(layer)" v-model="layer.opacityBase100"></el-slider>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import mountComponent from '../util/mountComponent';
Vue.component('gv-title', () => import('./Title.vue'));

import { Slider } from 'element-ui';
Vue.use(Slider);

export default {
  name: 'gv-layers-transparency',
  props: ['idMap'],
  data() {
    return {
      width: 380,
      layers: GV.config.getMapConfig(this.idMap).layers,
    };
  },
  mounted() {
    GV.log('gv-layers-transparency: mounted');
  },
  methods: {
    getClass: function (layer) {
      return layer.inRange
        ? 'gv-list-transparency-layer-item'
        : 'gv-list-transparency-layer-item gv-list-transparency-layer-disabled-item';
    },
    onChange(layer) {
      const opacity = layer['opacityBase100'] / 100;
      GV.eventBus.$emit('set-layer-transparency', {
        layerName: layer.name,
        opacity: opacity,
      });
    },
  },
};
</script>

<style>
.gv-layers-transparency-list-group {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  /* width: 440px; */
}

.gv-list-transparency-layer-item {
  position: relative;
  display: block;
  /* padding: 0.1rem 0.5rem; */
  padding-left: 0.3rem;
  height: 38px;
  border: 1px solid #ddd;
}

.gv-list-transparency-layer-disabled-item {
  opacity: 0.3;
  filter: alpha(opacity=30);
}

.gv-transparency-layer-slider {
  position: relative;
  display: block;
  padding-left: 0.3rem;
  margin-bottom: -2px;
  margin-top: -2px;
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

.gv-layer-visibility-span {
  position: absolute;
  top: 16%;
  left: 29px;
}

.gv-transparency-layer-title-span {
  position: absolute;
  top: 50%;
  left: 5px;
  margin-top: -7px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
}

.gv-transparency-layer-slider {
  position: absolute;
  top: 16%;
  left: 210px;
  width: 120px;
}

.gv-layers-transparency-footer {
  display: block;
  padding: 0.3rem 0.5rem;
  margin-bottom: -1px;
  cursor: default;
}

#gv-layers-transparency {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 90px;
  z-index: 800;
}

#gv-layers-transparency-title {
  height: 30px;
}

#gv-layers-transparency-body {
  width: 360px;
  max-height: 400px;
  cursor: default;
  overflow: hidden;
}

/* #gv-layers-transparency-body:hover {
  overflow-y: scroll;
} */

@media (max-height: 500px) {
  #gv-layers-transparency-body {
    overflow-y: scroll;
    max-height: 200px;
  }
}

#gv-layers-transparency-wrapper {
  display: block;
}
</style>
