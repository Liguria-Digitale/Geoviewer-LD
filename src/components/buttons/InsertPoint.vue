<template>
  <button
    id="gv-button-insert-point"
    title="Localizza Punto"
    @click="onClick"
    :class="setClass()" 
  />
</template>

<script>
import mountComponent from '../../util/mountComponent';
import Vue from 'vue';

Vue.component('gv-insert-point-panel', () => import('../InsertPoint.vue'));

const name = 'gv-insert-point-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      options: options,
      cssClass: 'gv-button fa fa-edit',
      cssActiveClass: 'gv-button-selected',
    };
  },
  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-insert-point-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-insert-point-panel></gv-insert-point-panel>`,
        }),
      });
    },
    setClass() {
      return this.active ? this.cssClass + ' ' + this.cssActiveClass : this.cssClass;
    },
  },
  mounted: function() {},
};
</script>

<style></style>

