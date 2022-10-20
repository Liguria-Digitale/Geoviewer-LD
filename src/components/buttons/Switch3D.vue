<template>
  <button id="gv-button-switch3D" title="Switch3D" @click="onClick" class="gv-button">
    {{ label }}
  </button>
</template>

<script>
const name = 'gv-switch3D-button';

export default {
  name: name,
  data() {
    const options = GV.config.getToolOptions(name);
    return {
      name: name,
      active: false,
      options: options,
      enable3d: null,
      label: null,
    };
  },
  methods: {
    onClick() {
      this.enable3d = !this.enable3d;
      this.setLabel();
      GV.app.map.ol3d.setEnabled(this.enable3d); 
      GV.app.map.ol3dEnabled = this.enable3d
    },
    setLabel() {
      if (this.enable3d) {
        this.label = '2D';
      } else {
        this.label = '3D';
      }
    },
  },
  mounted: function() {
    this.enable3d = GV.config.application.mapOptions.enable3d;
    this.setLabel();
  },
};
</script>

<style>
#gv-button-switch3D {
  font-weight: 600;
}
</style>
