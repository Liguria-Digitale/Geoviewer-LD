<template>
  <button id="gv-help3D-button" title="Help Navigazione 3D" @click="onClick" :class="setClass()" />
</template>

<script>
import mountComponent from '../../util/mountComponent';

import Vue from 'vue';
import { Button } from 'element-ui';
Vue.use(Button);

// Vue.component('gv-help3D-panel', () => import('../Help3D.vue'));
Vue.component('gv-help3D-panel', () => import('../Help3D.vue'));

const name = 'gv-help3D-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      active: false,
      options: options,
      cssClass: 'gv-help3D-button gv-button fa fa-question',
      cssActiveClass: 'gv-button',
    };
  },

  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-help3D-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-help3D-panel></gv-help3D-panel>`,
        }),
      });
    },
    setClass() {
      return this.active ? this.cssClass + ' ' + this.cssActiveClass : this.cssClass;
    },
  },
  mounted: function () {
    if (this.options.showOnStart) {
      mountComponent({
        elId: 'gv-help3D-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-help3D-panel></gv-help3D-panel>`,
        }),
      });
    }
  },
};
</script>

<style>
</style>
