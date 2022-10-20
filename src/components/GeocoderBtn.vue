<template>
  <div id="gv-geocoder-btn-panel" class="gv-geocoder-btn-panel">
    <div class="gv-geocoder-btn-body">
      <gv-geocoder></gv-geocoder>
    </div>
  </div>
</template>
 
<script>
import Vue from "vue";

import { Loading, Notification } from "element-ui";

export default {
  name: "gv-geocoder-btn-panel",
  data() {
    return {
      options: GV.config.getToolOptions("gv-geocoder-btn-button"),
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style>
.gv-geocoder-btn-panel {
  position: absolute;
  width: 340px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 35px;
  z-index: 800;
}

@media only screen and (max-width: 420px) {
  .gv-geocoder-btn-panel {
    margin-left: 00px;
    margin-top: 28px;
  }
}
.gv-geocoder-btn-body {
  width: 330px;
  height: 50px;
}
</style>

