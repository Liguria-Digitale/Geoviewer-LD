<template>
  <div @submit.prevent.stop @keyup.enter="submitWms">
    <el-form :inline="true" :model="wmsForm" ref="wms-form">
      <div>
        <el-form-item>
          <el-input
            style="width: 450px;"
            size="mini"
            placeholder="URL Servizio (http://example.org/?&service=WMS&request=GetCapabilities) "
            v-model="wmsForm.URL"
            ref="wmsUrl"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="wmsForm.showLayerList" :label="wmsForm.serviceTitle"></el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button type="primary" class="gv-map-catalog-button" size="mini" @click="submitWms"
            >Lista Livelli</el-button
          >
        </el-form-item>
        <el-form-item v-if="wmsForm.showLayerList" label="Livelli">
          <el-select
            v-model="wmsForm.layerList.name"
            style="width: 350px;"
            size="mini"
            placeholder="Seleziona Livello per caricarlo in mappa"
            @change="onChangeWmsLayerList"
          >
            <el-option
              v-for="layer in wmsForm.layerList"
              :key="layer.name"
              :label="layer.title"
              :value="layer.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue';

import mountComponent from '../util/mountComponent';
import uri from 'url';
import getWmsCapabilities from '../services/getWmsCapabilities';
import notification from '../util/notification';

import { Button, Form, FormItem, Input, Select, Option } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

export default {
  name: 'gv-map-catalog-panel-wms',
  props: ['panel'],
  data() {
    return {
      wmsForm: {
        URL: '',
        serviceTitle: '',
        showLayerList: false,
        layerList: [],
      },
    };
  },
  mounted() {},
  methods: {
    parseUrl(url) {
      const parsed = uri.parse(url, true);
      parsed.search = null;
      // const mapfile = parsed.query["map"] || parsed.query["MAP"];
      // parsed.query = {
      //   SERVICE: "WMS",
      //   REQUEST: "GetCapabilities"
      // };
      // if (mapfile) parsed.query["map"] = mapfile;
      if (!parsed.query['SERVICE'] && !parsed.query['service'] && !parsed.query['Service'])
        parsed.query['SERVICE'] = 'WMS';
      if (!parsed.query['REQUEST'] && !parsed.query['request'] && !parsed.query['Request'])
        parsed.query['REQUEST'] = 'GetCapabilities';

      return uri.format(parsed);
    },
    submitWms() {
      let url = this.$refs.wmsUrl.value;
      if (!url) {
        return;
      }
      url = this.parseUrl(url);

      getWmsCapabilities(url).then(capabilities => {
        this.wmsForm.showLayerList = true;

        const serviceTitle = capabilities.Service.Title;
        // const version = capabilities.WMS_Capabilities.Service._version
        const url =
          // capabilities.Service.OnlineResource["_xlink:href"] ||
          capabilities.Capability.Request.GetMap.DCPType.HTTP.Get.OnlineResource['_xlink:href'];

        let layers = capabilities.Capability.Layer.Layer;
        if (!Array.isArray(layers)) {
          layers = [layers];
        }
        const formats = capabilities.Capability.Request.GetMap.Format;
        let format = null;
        formats.forEach(item => {
          if (item === 'image/jpeg') {
            format = item;
          }
        });
        formats.forEach(item => {
          if (item === 'image/png') {
            format = item;
          }
        });

        this.wmsForm.serviceTitle = 'Servizio: ' + serviceTitle;
        this.wmsForm.layerList = [];

        layers.forEach(layer => {
          const popUpUrl =
            layer.Style && layer.Style.LegendURL && layer.Style.LegendURL.OnlineResource
              ? layer.Style.LegendURL.OnlineResource['_xlink:href']
              : null;

          this.wmsForm.layerList.push({
            serviceTitle: serviceTitle,
            name: layer.Name,
            title: layer.Title,
            type: 'WMS',
            opacity: 1,
            visible: true,
            legend: {
              popUpFlag: popUpUrl ? 1 : 0,
              popUpUrl: popUpUrl,
              label: layer.Title,
              icon: '/geoservices/apps/viewer/static/img/legend/classi.gif',
            },
            wmsParams: {
              url: url,
              format: format,
              name: layer.Name,
              layers: layer.Name,
              transparent: true,
            },
          });
        });
      });
    },
    onChangeWmsLayerList(value) {
      this.wmsForm.layerList.forEach(layer => {
        if (layer.name === value) {
          GV.config.addMapConfig({
            addLayerConfig: true,
            id: layer.serviceTitle,
            name: layer.serviceTitle,
            layers: [layer],
          });
        }
      });
    },
    wmsKeyEnterHandler() {
      submitWms();
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
</style>
