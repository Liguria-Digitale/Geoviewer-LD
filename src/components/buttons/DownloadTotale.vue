<template>
  <button id="gv-download-totale-button" title="Download" @click="onClick" :class="setClass()" />
</template>

<script>
import mountComponent from '../../util/mountComponent';

import Vue from 'vue';
import { Button } from 'element-ui';
Vue.use(Button);

Vue.component('gv-download-totale-panel', () => import('../DownloadTotale.vue'));

const name = 'gv-download-totale-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);

    return {
      active: false,
      options: options,
      cssClass: 'gv-download-totale-button gv-button el-icon-download',
      cssActiveClass: 'gv-button-selected',
    };
  },

  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-download-totale-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-download-totale-panel></gv-download-totale-panel>`,
        }),
      });
    },
    setClass() {
      return this.active ? this.cssClass + ' ' + this.cssActiveClass : this.cssClass;
    },
  },
  mounted: function () {},
};
</script>

<style>
</style>