<template>
  <button title="Info sui livelli della mappa" @click="onClick" :class="setClass()" />
</template>

<script>
import SwitchActiveButton from '../../mixins/SwitchActiveButton';

import Control from '../../controls/InfoWmsManager';

const name = 'gv-info-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      control: Control,
      options: options,
      cssClass: 'gv-button fa fa-info',
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
  mounted() {
    this.active = this.options.active;
  },
};
</script>

<style></style>
