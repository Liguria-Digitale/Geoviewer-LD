<template>
  <div class="multi-legend" id="gv-multi-legend-panel">
    <gv-title
      v-if="title"
      v-draggable
      :title="title"
      :noClose="noClose"
      :divId="'gv-multi-legend-panel'"
    ></gv-title>
    <gv-iframe-panel
      class="gv-iframe-panel"
      visible="true"
      :src="src"
      :height="height"
      :width="width"
    ></gv-iframe-panel>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'gv-multi-legend-panel',
  props: ['title', 'src', 'visible', 'title', 'width', 'height', 'noClose'],
};
</script>

<style scoped>
.multi-legend {
  position: absolute;
  margin-top: 54px;
  margin-left: 10px;
  background-color: #fff;
  z-index: 800;
}

.gv-iframe-panel {
  margin: 10px;
  background-color: #fff;
}
</style>
