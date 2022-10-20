<template>
  <button
    id="gv-button-__nome-componente__"
    title="__title__"
    @click="onClick"
    :class="setClass()"
  />
</template>

<script>
import SwitchActiveButton from '../../mixins/SwitchActiveButton';
import Control from '../../controls/__nome-file__';

const name = 'gv-__nome-componente__-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      control: Control,
      options: options,
      cssClass: 'gv-button fa fa-file',
      cssActiveClass: 'gv-button-selected',
    };
  },
  mixins: [SwitchActiveButton],
  methods: {
    onClick() {
      this.switchActiveButton();
      // console.log(this.options)
    },
    setClass() {
      return this.active ? this.cssClass + ' ' + this.cssActiveClass : this.cssClass;
    },
  },
  mounted: function() {},
};
</script>

<style></style>
