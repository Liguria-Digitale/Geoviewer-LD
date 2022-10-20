<template>
  <div @submit.prevent.stop @keyup.enter="submitKml" id="gv-map-catalog-panel-kml">
    <el-form :model="kmlForm" ref="kml-form">
      <el-form-item>
        <el-input
          style="width: 340px"
          size="mini"
          placeholder="Inserisci la URL di un file KML o GPX o JSON"
          v-model="kmlForm.URL"
        >
          <i
            style="cursor: default"
            slot="suffix"
            class="el-input__icon el-icon-circle-close"
            @click="handleKmlIconClick"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          action="/geoservices/REST/utils/file_upload"
          :limit="1"
          :file-list="kmlForm.fileList"
          :auto-upload="false"
          :on-success="onKmlUploadSuccess"
          ref="kmlUpload"
        >
          <el-button slot="trigger" class="gv-map-catalog-button" size="small" type="primary"
            >Seleziona un file locale di tipo KML/GPX/JSON</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="gv-map-catalog-button" size="mini" @click="submitKml"
          >Carica Livello</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue';

import getKmlUrl from '../services/getKmlUrl';
import getGeoJSON from '../services/getGeoJSON';

import { Button, Form, FormItem, Input, Upload } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

export default {
  name: 'gv-map-catalog-panel-kml',
  props: ['panel'],
  data() {
    return {
      kmlForm: {
        URL: '',
        fileList: [],
        inputStyle: 'width: 350px;',
      },
    };
  },
  mounted() {},
  methods: {
    submitKml() {
      const url = this.kmlForm.URL;
      if (url) {
        getKmlUrl(url).then((data) => {
          const url = data.file;
          const fileName = data.name;
          const type = data.type;
          this.loadKml(url, fileName, type);
        });
      } else {
        this.$refs.kmlUpload.submit();
      }
    },
    onKmlUploadSuccess() {
      var file = this.$refs.kmlUpload.uploadFiles[0].name;
      if (file) {
        const url = '/geoservices/temp/' + file;
        let type = null;
        if (url.indexOf('.kml') > -1) type = 'KML';
        if (url.indexOf('.gpx') > -1) type = 'GPX';
        if (url.indexOf('.json') > -1) type = 'JSON';

        if (!type) {
          console.log('Tipo File non ammesso: I file devono avere estensione kml o gpx o json');
          return;
        }
        const fileName = file.replace('.kml', '').replace('.gpx', '').replace('.json', '');
        this.loadKml(url, fileName, type);
      }
    },
    loadKml(url, fileName, type) {
      this.$refs.kmlUpload.clearFiles();
      this.kmlForm.URL = '';
      GV.config.addMapConfig({
        addLayerConfig: true,
        id: 'kml-gpx-json',
        name: 'KML/GPX/JSON',
        layers: [
          {
            url: url,
            name: fileName,
            title: fileName,
            visible: true,
            type: 'JSON',
            subType: type,
            projection: 'EPSG:4326',
            infoOptions: {
              infoPopUp: 'simple',
              infoWidth: 300,
              infoHeight: 300,
            },
            inRange: true,
            pointToLayer: function (feature, latlng) {
              return L.marker(latlng, {
                icon: L.icon({
                  iconUrl: '/geoservices/apps/viewer/dist/static/img/marker-icon.png',
                  iconSize: [12, 20],
                  iconAnchor: [6, 10],
                  popupAnchor: [0, -20],
                }),
                alt: '',
              });
            },
            zoomToLayerExtent: true,
            basePopup: true,
            legend: {
              label: fileName,
              icon: '/geoservices/apps/viewer/static/img/legend/classi.gif',
            },
          },
        ],
      });
    },
    handleKmlIconClick() {
      this.kmlForm.URL = '';
    },
  },
};
</script>

<style>
.gv-map-catalog-button {
  margin-top: 10px;
  font-size: 12px;
}

.gv-map-catalog-button span {
  font-family: 'Raleway', Arial, sans-serif;
}

#gv-map-catalog-panel-kml {
  width: 360px;
  padding: 10px;
}

@media only screen and (min-width: 420px) {
  #gv-map-catalog-panel-kml {
  }
}

@media only screen and (max-width: 420px) {
  #gv-map-catalog-panel-kml {
  }
}
</style>
