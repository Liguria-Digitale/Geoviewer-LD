<template>
  <button id="gv-button-add-map" title="Aggiungi Mappe" @click="onClick" :class="setClass()" />
</template>

<script>
import mountComponent from '../../util/mountComponent';

import Vue from 'vue';
import { Button } from 'element-ui';
Vue.use(Button);

Vue.component('gv-map-catalog-panel', () => import('../MapCatalogPanel.vue'));

const name = 'gv-add-map-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);

    return {
      name: name,
      active: false,
      options: options,
      cssClass: 'gv-add-map gv-button fa fa-plus-square-o',
      cssActiveClass: 'gv-button-selected',
    };
  },
  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-map-catalog-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-map-catalog-panel></gv-map-catalog-panel>`,
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