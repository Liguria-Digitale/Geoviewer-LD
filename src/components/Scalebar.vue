<template>
  <div id="gv-scalebar" v-if="largeScreen" class="scalebar">
    <el-select v-model="value" size="mini" placeholder @change="onChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import Vue from 'vue';
import { Select, Option } from 'element-ui';
Vue.use(Select);
Vue.use(Option); 

import TestScreenWidth from '../mixins/TestScreenWidth';

export default {
  data() {
    const options = [
      {
        value: 7,
        label: '1:4.600.000',
      },
      {
        value: 8,
        label: '1:2.300.000',
      },
      {
        value: 9,
        label: '1:1.150.000',
      },
      {
        value: 10,
        label: '1:580.000',
      },
      {
        value: 11,
        label: '1:290.000',
      },
      {
        value: 12,
        label: '1:144.000',
      },
      {
        value: 13,
        label: '1:72.000',
      },
      {
        value: 14,
        label: '1:36.000',
      },
      {
        value: 15,
        label: '1:18.000',
      },
      {
        value: 16,
        label: '1:9.000',
      },
      {
        value: 17,
        label: '1:4.500',
      },
      {
        value: 18,
        label: '1:2.200',
      },
      {
        value: 19,
        label: '1:1.100',
      },
      {
        value: 20,
        label: '1:560',
      },
    ];

    return {
      options: options,
      value: 7,
    };
  },
  mixins: [TestScreenWidth],
  methods: {
    onChange(value) {
      GV.app.map.setZoom(value);
    },
  },
  mounted() {
    GV.eventBus.$on('map-zoom', zoom => {
      this.value = Math.round(zoom)+1;
    });
  },
};
</script>

<style scoped>
.scalebar {
  z-index: 800;
  margin-right: -10px;
  display: inline-block;
}
</style>
