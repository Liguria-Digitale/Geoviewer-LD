<template>
  <button id="gv-button-back" title="Ritorno" @click="onClick" :class="setClass()" />
</template>

<script>
const name = 'gv-back-button';

export default {
  data() {
    const options = GV.config.getToolOptions(name);

    return {
      name: name,
      active: false,
      options: options,
      action: options.action,
      url: options.url,
      confirm: options.confirm,
      cssClass: 'gv-back gv-button fa fa-arrow-left',
      cssActiveClass: 'gv-button-selected',
    };
  },
  methods: {
    onClick() {
      if (this.confirm) {
        var r = confirm('Sei sicuro?');
        if (r == true) {
          this.back();
        }
      } else {
        this.back();
      }
    },
    back() {
      if (this.action === 'close') {
        window.close();
      } else {
        if (this.url) {
          window.location = this.url;
        } else {
          history.back();
        }
      }
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
