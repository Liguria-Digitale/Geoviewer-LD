<template>
  <button id="gv-measure" :title="title" @click="onClick" :class="setClass()" />
</template>

<script>
import SwitchActiveButton from '../../mixins/SwitchActiveButton';
import Control from '../../controls/Measure';

const name = 'gv-measure-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      control: null,
      options: options,
      title: 'Misurazioni',
      cssClass: 'gv-button fg-measure',
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
  mounted: function() {
    this.control = Control;
  },
};
</script>

<style></style>
