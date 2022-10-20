<template>
  <div v-show="visible" class="gv-map-info-panel gv-inverted-color-scheme" id="gv-map-info-panel">
    <gv-title
      v-draggable
      :title="title"
      :fullTitle="fullTitle"
      :divId="'gv-map-info-panel'"
    ></gv-title>
    <div class="gv-map-info-panel-body">
      <table>
        <tbody>
          <tr v-for="item in items" :key="item.label">
            <th class="gv-map-info-panel-th gv-color-scheme">{{ item.label }}</th>
            <td>{{ item.value }}</td>
          </tr>
          <tr>
            <th class="gv-map-info-panel-th gv-color-scheme">Note</th>
            <td><div v-html="note"></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-row type="flex" class="row-bg" justify="left">
      <el-col v-if="addToMapButton" :span="8">
        <el-button
          id="gv-map-info-panel-add-map"
          type="primary"
          @click="addToMap"
          class="gv-map-info-button"
          size="mini"
        >
          <span>Carica</span>
        </el-button>
      </el-col>
      <el-col v-if="showDownloadButton()" :span="8">
        <el-button
          v-show="showDownloadButton()"
          id="gv-map-info-panel-download"
          type="primary"
          @click="download"
          class="gv-map-info-button el-icon-download"
          size="mini"
        >
          <span>Download</span>
        </el-button>
      </el-col>
      <el-col>
        <el-button-group v-if="showMetadata" class="gv-button-group">
          <el-button v-if="showWMS" type="primary" disabled size="mini">
            <span>Scheda Metadati:</span>
          </el-button>
          <el-button v-if="showWMS" type="primary" @click="openMetadataPanel('DATA')" size="mini">
            <span>Dataset</span>
          </el-button>
          <el-button v-if="showWMS" type="primary" @click="openMetadataPanel('VS')" size="mini">
            <span>WMS</span>
          </el-button>
          <el-button
            v-show="showWFSButton()"
            type="primary"
            @click="openMetadataPanel('DS')"
            size="mini"
          >
            <span>WFS</span>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import mountComponent from '../util/mountComponent';
import getDownloadConfig from '../services/getDownloadConfig';

import globals from '../globals';

Vue.component('gv-map-metadata-panel', () => import('./MapMetadataPanel.vue'));

import { Button, ButtonGroup, Row, Col } from 'element-ui';
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Row);
Vue.use(Col);

export default {
  name: 'gv-map-info-panel',
  props: ['metaData', 'visible', 'addToMapButton', 'downloadable'],
  data() {
    let items = [];
    var metaData = this.metaData;
    if (metaData) {
      items.push({ label: 'Origine del dato', value: metaData.origine });
      items.push({ label: 'Anno', value: metaData.anno });
      items.push({ label: 'Scala', value: metaData.scala });
    }
    if (metaData && window.matchMedia('(min-height: 500px)').matches) {
      items.push({
        label: 'Rappresentazione',
        value: metaData.rappresentazione,
      });
      items.push({
        label: 'Ellissoide e Datum',
        value: metaData.elissoide_datum,
      });
      items.push({ label: 'Copertura', value: metaData.copertura });
      // items.push({ label: 'Note', value: metaData.note });
    }
    return {
      items: items,
      note: metaData.note,
      idMap: metaData.id.toString(),
      name: metaData.descrizione,
      title: window.matchMedia('(max-width: 600px)').matches
        ? metaData.descrizione.substr(0, 52)
        : metaData.descrizione.substr(0, 68),
      showMetadata: !window.matchMedia('(max-width: 600px)').matches,
      showWMS: metaData.flag_wms,
      width: window.matchMedia('(max-width: 600px)').matches ? 350 : 500,
      fullTitle: metaData.descrizione,
      linkWms: metaData.link_wms,
      linkWfs: metaData.link_wfs,
      linkDownload: metaData.link_download,
    };
  },
  methods: {
    showDownloadButton() {
      return this.downloadable === 'true' && GV.config.getMapConfig(this.idMap);
    },
    showWFSButton() {
      return this.downloadable === 'true';
    },
    closePanel() {
      this.$el.parentNode.removeChild(this.$el);
    },
    download() {
      this.openDownloadPanel(this.idMap);
    },
    openDownloadPanel(idMap) {
      if (document.getElementById('gv-map-download')) {
        const element = document.getElementById('gv-map-download');
        element.parentNode.removeChild(element);
      }
      const closeWindow = false;
      mountComponent({
        elId: 'gv-map-download',
        containerId: GV.config.containerId,
        toggleEl: false,
        vm: new Vue({
          template: `<gv-map-download idMap="${idMap}" closeWindow="${closeWindow}"></gv-map-download>`,
        }),
      });
      this.closePanel();
      this.closeCatalog();
    },
    addToMap() {
      GV.config.addCatMap(this.idMap, false, false);
      this.closePanel();
      this.closeCatalog();
    },
    closeCatalog() {
      let catalog = document.getElementById('gv-map-catalog-panel');
      if (catalog) {
        catalog.style.display = 'none';
      }
    },
    openMetadataPanel(type) {
      const xmlUrl = `${globals.GV_METADATA_URL}${this.idMap}?type=${type}&`;
      const linkWms = this.linkWms;
      const linkWfs = this.linkWfs;
      const prefix = 'Metadati - ';

      mountComponent({
        elId: 'gv-map-metadata-panel',
        clear: true,
        vm: new Vue({
          template: `<gv-map-metadata-panel :xmlUrl="xmlUrl" :title="title" :type="type" :linkWms="linkWms" :linkWfs="linkWfs" ></gv-map-metadata-panel>`,
          data: {
            title: `${prefix}: ${this.title}`,
            type: type,
            xmlUrl: xmlUrl,
            linkWms: linkWms,
            linkWfs: linkWfs,
          },
        }),
      });
    },
  },
};
</script>

<style scoped>
.gv-map-metadata-panel {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 100px;
  background-color: #fff;
  z-index: 800;
  width: 860px;
}

.gv-map-info-panel {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 100px;
  background-color: #fff;
  z-index: 800;
  max-width: 670px;
}

.gv-map-info-panel table {
  border: 1px solid #ddd;
  width: 100%;
  padding: 10px;
}

.gv-map-info-panel-th {
  white-space: nowrap;
  width: auto;
  padding: 5px 5px;
  text-align: left;
  font-weight: 400;
  font-size: 12px;
  border: 1px solid #e5e5e5;
}

.gv-map-info-panel table tr td {
  padding: 5px;
  font-size: 12px;
  border: 1px solid #e5e5e5;
}

.gv-map-info-button {
  font-size: 12px;
}

.gv-map-info-button span {
  font-family: 'Raleway', Arial, sans-serif;
  font-weight: bold;
}

.gv-button-group span {
  font-size: 12px;
  font-family: 'Raleway', Arial, sans-serif;
  font-weight: bold;
}

.gv-map-info-panel-body {
  background-color: #eee;
}

/* @media (pointer: coarse) {
    .gv-map-info-panel-body {
        max-height: 300px;
        overflow: auto;
    }
} */

@media (max-width: 500px) {
  .gv-map-info-panel {
    width: 350px;
    /* overflow: auto; */
  }
}
</style>
