<template>
  <div class="info-wms-html" :id="id">
    <gv-title v-draggable :title="title" :divId="id"></gv-title>
    <!-- <div v-bar> -->
    <gv-iframe-panel :html="html" :src="src" :height="height" :width="width2"></gv-iframe-panel>
    <!-- </div> -->
  </div>
</template>

<script>
// import Vue from 'vue';
// import Vuebar from 'vuebar';
// Vue.use(Vuebar);
import TestScreenWidth from '../mixins/TestScreenWidth';

export default {
  name: 'gv-info-wms-html',
  props: ['title', 'src', 'html', 'width', 'height', 'id'],
  data() {
    const width2 = this.width;
    return {
      width2: width2,
    };
  },
  mounted() {
    this.width2 = this.screenWidth < 400 ? 360 : this.width;
    GV.eventBus.$on('title-close-panel', (event) => {
      if (event.divId === this.id) {
        GV.app.map.clearLayer('InfoWmsHilite');
      }
    });
  },
  mixins: [TestScreenWidth],
};
</script>

<style scoped>
.info-wms-html {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 80px;
  background-color: #fff;
  z-index: 800;
  /* overflow: hidden; */
}

@media only screen and (max-width: 420px) {
  .info-wms-html {
    margin-left: 1px;
  }
}
</style>
