<template>
  <button
    id="gv-button-layer-search"
    title="Ricerca sui Livelli"
    @click="onClick"
    :class="setClass()"
  />
</template>

<script>
import mountComponent from '../../util/mountComponent';

import Vue from 'vue';
import { Button } from 'element-ui';
Vue.use(Button);

Vue.component('gv-layer-search', () => import('../LayerSearch.vue'));

const name = 'gv-layer-search-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);

    return {
      active: false,
      options: options,
      cssClass: 'gv-layer-search-button gv-button fa fa-search',
      cssActiveClass: 'gv-button-selected',
    };
  },

  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-layer-search',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-layer-search></gv-layer-search>`,
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