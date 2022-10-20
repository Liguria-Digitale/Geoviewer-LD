<template>
  <button
    id="gv-button-__nome-componente__"
    title="__title__"
    @click="onClick"
    :class="setClass()"
  />
</template>

<script>
import mountComponent from '../../util/mountComponent';
import Vue from 'vue';

Vue.component('gv-__nome-componente__-panel', () => import('../__nome-file__.vue'));

const name = 'gv-__nome-componente__-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      options: options,
      cssClass: 'gv-button fa fa-file',
      cssActiveClass: 'gv-button-selected',
    };
  },
  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-__nome-componente__-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-__nome-componente__-panel></gv-__nome-componente__-panel>`,
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
