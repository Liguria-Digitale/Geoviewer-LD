<template>
  <button id="gv-draw" :title="title" @click="onClick" :class="setClass()" />
</template>

<script>
import SwitchActiveButton from '../../mixins/SwitchActiveButton';
import Control from '../../controls/Draw';

const name = 'gv-draw-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      control: Control,
      options: options,
      title: 'Acquisizione Geometrie',
      cssClass: 'gv-button fas fa-edit',
      cssActiveClass: 'gv-button-selected',
    };
  },
  mixins: [SwitchActiveButton],
  methods: {
    onClick() {
      this.switchActiveButton();
    },
    setClass() {
      return this.active ? this.cssClass + ' ' + this.cssActiveClass : this.cssClass;
    },
  },
  mounted: function() {},
};
</script>

<style></style>
