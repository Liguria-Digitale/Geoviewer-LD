<template>
  <button
    id="gv-button-geocoder-btn"
    title="Ricerca Indirizzo"
    @click="onClick"
    :class="setClass()"
  />
</template>

<script>
import mountComponent from '../../util/mountComponent';
import Vue from 'vue';

Vue.component('gv-geocoder-btn-panel', () => import('../GeocoderBtn.vue'));

const name = 'gv-geocoder-btn-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      options: options,
      cssClass: 'gv-button fa fa-search',
      cssActiveClass: 'gv-button-selected',
    };
  },
  methods: {
    onClick() {
      mountComponent({
        elId: 'gv-geocoder-btn-panel',
        containerId: GV.config.containerId,
        toggleEl: true,
        vm: new Vue({
          template: `<gv-geocoder-btn-panel></gv-geocoder-btn-panel>`,
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

