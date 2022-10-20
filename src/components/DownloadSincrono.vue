<template>
  <div class="download-sincrono" :id="divId">
    <div class="gv-panel-title gv-color-scheme">
      <span title="DOWNLOAD SINCRONO" class="gv-color-scheme">{{ title }}</span>
      <el-button
        class="gv-close gv-color-scheme"
        icon="el-icon-close"
        type="button"
        @click="closePanel"
        title="Chiudi Panello"
      ></el-button>
    </div>
    <div class="download-sincrono-body" id="gv-download-sincrono-body">
      <gv-iframe-panel
        class="gv-iframe-panel"
        :src="src"
        height="400"
        width="600"
      ></gv-iframe-panel>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import mountComponent from '../util/mountComponent';
import eseguiRichiestaDownload from '../services/eseguiRichiestaDownload';
import notification from '../util/notification';

import { Loading } from 'element-ui';
Vue.use(Loading);

export default {
  name: 'gv-download-sincrono-panel',
  props: ['idRichiesta'],
  data() {
    return {
      divId: `gv-download-sincrono-panel-${this.idRichiesta}`,
      src: null,
      title: 'DOWNLOAD SINCRONO',
    };
  },
  beforeDestroy() {},
  methods: {
    closePanel() {
      var r = confirm('Sei sicuro?');
      if (r == true) {
        this.close();
      }
    },
    close() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  mounted() {
    const target = document.getElementById(this.divId);
    const loading = Loading.service({
      text: 'Preparazione dei file in corso...',
      target: target,
    });

    eseguiRichiestaDownload(this.idRichiesta)
      .then(resp => {
        if (loading) loading.close();
        this.src = resp.dataUrl;
        notification(
          `<p>L'esecuzione è terminata, puoi scaricare i file. Riceverai comunque una mail con il link per lo scarico dei file</p>`
        );
      })
      .catch(error => {
        this.close();
        if (error.toString().startsWith('Error: timeout')) {
          notification(
            `<p>L'esecuzione è andata in timeout. Riceverai una mail al termine della elaborazione con il link per lo scarico dei file</p>`,
            'warning'
          );
        } else {
          notification(
            `<p>Attenzione. Ci sono stati problemi nell'esecuzione della richiesta </p>`,
            'error'
          );
        }
      });
  },
};
</script>

<style scoped>
.download-sincrono {
  position: absolute;
  margin-top: 100px;
  margin-left: 100px;
  background-color: #fff;
  z-index: 800;
}

.download-sincrono-body {
  width: 600;
  height: 400;
  min-width: 600;
  min-height: 400;
}

.gv-iframe-panel {
  margin: 10px;
  background-color: #fff;
}

.gv-panel-title {
  position: relative;
  display: block;
  padding: 0.3rem 0.5rem;
  margin-bottom: -1px;
  color: #ccc;
  font-weight: bold;
}

.gv-close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
  float: right;
  font-size: 1rem;
  line-height: 1;
  font-weight: bold;
  color: #ffffff;
  margin-left: 5px;
  margin-right: 3px;
  margin-top: 3px;
  opacity: 0.5;
}
</style>
