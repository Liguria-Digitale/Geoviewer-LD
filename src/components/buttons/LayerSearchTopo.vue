<template>
  <button
    id="gv-button-layer-search-topo"
    title="Ricerche sui Livelli"
    @click="onClick"
    :class="setClass()"
  />
</template>

<script>
import mountComponent from '../../util/mountComponent';
import Vue from 'vue';
import { Button } from 'element-ui';
Vue.use(Button);
Vue.component('gv-layer-search-topo', () => import('../LayerSearchTopo.vue'));

const name = 'gv-layer-search-topo-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);

    return {
      active: false,
      options: options,
      cssClass: 'gv-layer-search-topo-button gv-button fa fa-search',
      cssActiveClass: 'gv-button-selected',
    };
  },

  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-layer-search-topo',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-layer-search-topo></gv-layer-search-topo>`,
        }),
      });
    },
    setClass() {
      return this.active ? this.cssClass + ' ' + this.cssActiveClass : this.cssClass;
    },
  },
  mounted: function () {},
};

/* export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      control: Control,
      options: options,
      cssClass: "gv-layer-search-topo-button gv-button fa fa-search",
      cssActiveClass: "gv-button-selected"
    };
  },
  mixins: [SwitchActiveButton],
  methods: {
    onClick() {
      this.switchActiveButton();
    },
    setClass() {
      return this.active
        ? this.cssClass + " " + this.cssActiveClass
        : this.cssClass;
    }
  },
  mounted: function() {}
};
 */
</script>

<style>
</style>
