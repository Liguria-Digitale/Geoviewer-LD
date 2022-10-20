<template>
  <button id="gv-print-button" title="Stampa" @click="onClick" :class="setClass()" />
</template>

<script>
import mountComponent from '../../util/mountComponent';

import Vue from 'vue';
import { Button } from 'element-ui';
Vue.use(Button);

Vue.component('gv-print-panel', () => import('../Print.vue'));

const name = 'gv-print-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);

    return {
      active: false,
      options: options,
      cssClass: 'gv-print-button gv-button fa fa-print',
      cssActiveClass: 'gv-button-selected',
    };
  },

  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-print-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-print-panel></gv-print-panel>`,
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