<template>
  <div id="gv-__nome-componente__-panel" class="gv-__nome-componente__-panel">
    <gv-title title="__title__" :divId="'gv-__nome-componente__-panel'"></gv-title>
    <div class="gv-__nome-componente__-body gv-inverted-color-scheme"></div>
  </div>
</template>

<script>
import Vue from "vue";

import { Loading, Notification } from "element-ui";

export default {
  name: "gv-__nome-componente__-panel",
  data() {
    return {
      options: GV.config.getToolOptions("gv-__nome-componente__-button"),
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style>
.gv-__nome-componente__-panel {
  position: absolute;
  width: 340px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
}

.gv-__nome-componente__-body {
  padding: 5px;
  width: 330px;
  height: 200px;
}
</style>
