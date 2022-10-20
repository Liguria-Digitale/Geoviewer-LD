<template>
  <div class="gv-map-download gv-inverted-color-scheme" id="gv-map-download">
    <gv-title
      v-draggable
      :title="title"
      :divId="'gv-map-download'"
      :noClose="true"
      :collapsible="'gv-map-download-body'"
    ></gv-title>
    <div class="gv-map-download-body" id="gv-map-download-body">
      <el-form :model="form" ref="form">
        <span class="gv-map-download-title">{{ config.name }}</span>
        <el-form-item v-show="!config.flagDownloadStatico">
          <span class="gv-map-download-label">Email</span>
          <el-input
            id="gv-map-download-email"
            style="width: 250px"
            size="mini"
            placeholder="Email"
            type="email"
            v-model="codCliente"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span v-if="showSelectLivelli" class="gv-map-download-label">Livello</span>
          <el-select
            id="gv-map-download-livello"
            v-if="showSelectLivelli"
            v-model="livello"
            size="mini"
            placeholder="Scegli un livello"
          >
            <el-option
              v-for="item in livelli"
              :key="item.codice"
              :label="item.nome"
              :value="item.codice"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span v-if="config.flagDownloadPerTemi" class="gv-map-download-label">Tematismo</span>
          <el-select
            id="gv-map-download-temi"
            v-if="config.flagDownloadPerTemi"
            v-model="codTema"
            size="mini"
            placeholder="Tutti i tematismi"
          >
            <el-option
              v-for="item in config.temi"
              :key="item.codice"
              :label="item.tematismo"
              :value="item.codice"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="gv-map-download-label">Sistema di Coordinate</span>
          <el-select id="gv-map-download-crs" v-model="sistemaCoordinate" size="mini">
            <el-option
              v-for="item in config.sistemiCoordinate"
              :key="item.epsg_code"
              :value="item.epsg_code"
              :label="item.proj_descr"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="gv-map-download-label">Formato</span>
          <el-select
            id="gv-map-download-formato"
            v-model="formato"
            size="mini"
            @change="changeFormat"
          >
            <el-option
              v-for="item in config.formati"
              :key="item.cod_formato"
              :value="item.cod_formato"
              :label="item.formato"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="gv-map-download-label">Selezione Territoriale</span>
          <el-select
            id="gv-map-download-selterr"
            v-model="selezioneTerritoriale"
            size="mini"
            @change="changeSelezioneTerritoriale"
          >
            <el-option
              v-for="item in config.selezioneTerritoriale"
              :key="item.codice"
              :value="item.codice"
              :label="item.descrizione"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span v-show="showSelectComuni" class="gv-map-download-label">Selezione Comune</span>
          <el-select
            id="gv-map-download-comuni"
            v-show="showSelectComuni"
            v-model="comune"
            size="mini"
            filterable
          >
            <el-option
              v-for="item in comuni"
              :key="item.codice"
              :value="item.codice"
              :label="item.nome"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span v-show="showSelectFogli" class="gv-map-download-label">Selezione Fogli</span>
          <el-select
            id="gv-map-download-fogli"
            v-show="showSelectFogli"
            v-model="fogli"
            size="mini"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in config.fogli"
              :key="item.codice"
              :value="item.codice"
              :label="item.nome"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            id="gv-map-download-rect-reset"
            v-show="showRectReset"
            type="primary"
            size="mini"
            @click="rectReset"
            >Reimposta Rettangolo</el-button
          >
        </el-form-item>

        <el-form-item class="gv-map-download-buttons">
          <el-button id="gv-map-download-submit" type="primary" size="mini" @click="submit"
            >Conferma</el-button
          >
          <el-button id="gv-map-download-cancel" type="primary" size="mini" @click="cancel"
            >Annulla</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

// require('leaflet-draw');
// require('style!../../node_modules/leaflet-draw/dist/leaflet.draw.css');

import mountComponent from '../util/mountComponent';
import notification from '../util/notification';
import globals from '../globals';
import getGeoJSON from '../services/getGeoJSON';
import insertRichiestaDownload from '../services/insertRichiestaDownload';
import getDownloadRichiesteCache from '../services/getDownloadRichiesteCache';
import RectDraw from '../mixins/RectDraw.js';

Vue.component('gv-download-sincrono-panel', () => import('./DownloadSincrono.vue'));

import { Button, Input, Form, FormItem, Select, Option } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

export default {
  name: 'gv-map-download',
  props: ['idMap', 'closeWindow'],
  data() {
    return {
      title: 'DOWNLOAD',
      sistemiCoordinate: [
        {
          epsg_code: '3003',
          proj_descr: 'ROMA40 - Gauss-Boaga - Fuso Ovest',
        },
        {
          epsg_code: '25832',
          proj_descr: 'ETRF89 - Proiezione UTM - Fuso 32',
        },
        {
          epsg_code: '4258',
          proj_descr: 'ETRF89 - Coordinate Geografiche',
        },
        {
          epsg_code: '4806',
          proj_descr: 'ROMA40 - Coordinate Geografiche',
        },
        {
          epsg_code: '4326',
          proj_descr: 'WGS84 - Coordinate Geografiche',
        },
      ],
      codCliente: '',
      codTema: null,
      formato: null,
      selezioneTerritoriale: null,
      sistemaCoordinate: '3003',
      comune: null,
      bbox: null,
      bboxSRS: null,
      fogli: [],
      comuni: [],
      livelli: [],
      livello: null,
      config: {},
      style: null,
      hlStyle: null,
      showRectReset: false,
      storageKey: 'download',
    };
  },
  computed: {
    showSelectComuni() {
      return this.selezioneTerritoriale === 2;
    },
    showSelectFogli() {
      return this.selezioneTerritoriale === 3;
    },
    showSelectLivelli() {
      return this.livelli.length > 0;
    },
  },
  watch: {
    fogli(fogliSel) {
      this.syncFogli(fogliSel);
    },
    comune(comune) {
      this.syncComune(comune);
    },
  },
  mixins: [RectDraw],
  mounted() {
    // Gestione sospensione per menutenzione
    if (GV.globals.SYS_MANUTENZIONE_DOWNLOAD) {
      notification('SISTEMA IN MANUTENZIONE: SERVIZIO TEMPORANEAMENTE SOSPESO');
      this.$el.hidden = true;
      return;
    }
    // Leggo le richieste in cache
    getDownloadRichiesteCache().then((response) => {
      this.cachedRequests = response;
    });
    // imposto la configurazione
    this.setConfig();
    // imposto stile feature
    this.setFeatureStyle();
    // Leggo cookies
    this.codCliente =
      this.$cookie.get('codCliente') != 'null' ? this.$cookie.get('codCliente') : '';
    // Imposto layer per selezione fogli
    this.addLayerSquadri();
    // Imposto layer per selezione comuni
    this.addLayerComuni();
    // Imposto combo livelli
    if (this.config.flagDownloadLivello) {
      this.livelli = GV.config.getMapConfig(this.idMap).layers.map((layer) => {
        return {
          codice: layer.id,
          nome: layer.legend.label,
        };
      });
      this.livelli.sort((a, b) => {
        if (a.nome < b.nome) {
          return -1;
        }
        if (a.nome > b.nome) {
          return 1;
        }
      });
      if (this.livelli.length === 1) {
        this.livello = this.livelli[0].codice;
      }
    }
    // Imposto formato di default
    if (this.config.formati.length > 0) {
      this.setDefaultFormat(this.config.formati);
    } else {
      notification('Formati non impostati', 'error');
      this.removePanel();
      return;
    }

    this.show = true;
  },
  methods: {
    syncComune(comune) {
      const layerComuni = GV.app.map.getLayerByName('SelezioneComune');
      if (!layerComuni) {
        return;
      }
      if (GV.app.map.type === 'openlayers') {
        const features = layerComuni.getSource().getFeatures();
        for (const feature of features) {
          const codice = feature.get('CODICE_COMUNE') || feature.get('codice_comune');
          if (codice === comune) {
            feature.setStyle(this.hlStyle);
          } else {
            feature.setStyle(false);
          }
        }
      } else {
        layerComuni.eachLayer((layer) => {
          layer.setStyle(this.style);
        });
        layerComuni.eachLayer((layer) => {
          const codice =
            layer.feature.properties.CODICE_COMUNE || layer.feature.properties.codice_comune;
          if (codice === comune) {
            layer.setStyle(this.hlStyle);
          }
        });
      }
    },
    syncFogli(fogliSel) {
      const layerFogli = GV.app.map.getLayerByName('SelezioneSquadri');
      if (!layerFogli) {
        return;
      }
      const style = this.hlStyle;
      if (GV.app.map.type === 'openlayers') {
        const features = layerFogli.getSource().getFeatures();
        for (const feature of features) {
          feature.setStyle(false);
        }
        for (const foglio of fogliSel) {
          for (const feature of features) {
            const codice = feature.get('COD_SQUADRO') || feature.get('cod_squadro');
            if (codice == foglio) {
              feature.setStyle(style);
            }
          }
        }
      } else {
        layerFogli.eachLayer((layer) => {
          layer.setStyle(this.style);
        });
        layerFogli.eachLayer((layer) => {
          fogliSel.forEach((foglio) => {
            const codice =
              layer.feature.properties.COD_SQUADRO || layer.feature.properties.cod_squadro;
            if (codice === foglio) {
              layer.setStyle(this.hlStyle);
            }
          });
        });
      }
    },
    removePanel() {
      const dlPanel = document.getElementById('gv-map-download');
      if (dlPanel) {
        dlPanel.parentNode.removeChild(dlPanel);
      }
    },
    setConfig() {
      if (GV.config.getMapConfig(this.idMap) && GV.config.getMapConfig(this.idMap).downloadConfig) {
        this.config = GV.config.getMapConfig(this.idMap).downloadConfig;
        this.sistemiCoordinate = this.config.sistemiCoordinate;
        this.sistemaCoordinate = this.sistemiCoordinate[0].epsg_code;
        if (this.config.temi && this.config.temi[0] && this.config.temi[0].codice !== 0) {
          this.config.temi.unshift({
            codice: 0,
            tematismo: 'Tutti i tematismi',
          });
        }
      }
    },
    setFeatureStyle() {
      let style;
      if (GV.app.map.type === 'openlayers') {
        style = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [255, 204, 0, 1],
            width: 1,
          }),
          fill: new ol.style.Fill({
            color: [255, 204, 0, 0.1],
          }),
        });
      } else {
        style = {
          color: '#ffcc00',
          fillOpacity: 0,
          weight: 1,
          opacity: 1,
        };
      }
      this.style = style;

      if (GV.app.map.type === 'openlayers') {
        style = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: [255, 204, 0, 1],
            width: 3,
          }),
          fill: new ol.style.Fill({
            color: [255, 204, 0, 0.6],
          }),
        });
      } else {
        style = {
          color: '#ffcc00',
          fillOpacity: 0.6,
          weight: 2,
          opacity: 1,
        };
      }
      this.hlStyle = style;
    },

    setDefaultFormat(formati) {
      const cachedFormat =
        formati.filter((formato) => {
          return formato.cod_formato === this.$cookie.get('formato');
        }).length > 0
          ? this.$cookie.get('formato')
          : null;

      const defaultFormat =
        formati.filter((formato) => {
          return formato.cod_formato === 'SHP';
        }).length > 0
          ? 'SHP'
          : formati[0].cod_formato;

      const formato = cachedFormat || defaultFormat;
      this.changeFormat(formato);
      this.formato = formato;
    },
    addLayerSquadri() {
      let selFogli = false;
      if (!this.config.formati) return;
      this.config.formati.forEach((formato) => {
        formato.selezioneTerritoriale.forEach((selTerr) => {
          if (selTerr.codice === 3) {
            selFogli = true;
          }
        });
      });
      if (selFogli) {
        const baseUrl = `${globals.DEFAULT_PROXY}${globals.GV_DOWNLOAD_SQUADRI_URL}`;
        const url = `${baseUrl}${this.config.livelloSquadri}`;
        getGeoJSON(url).then((response) => {
          this.loadDataSquadri(response.data);
        });
      }
    },
    loadDataSquadri(data) {
      if (GV.app.map.getLayerByName('SelezioneSquadri')) {
        GV.app.map.removeLayer(GV.app.map.getLayerByName('SelezioneSquadri'));
      }

      const filteredFeatures = data.features.filter((feature) => {
        const filter = this.config.fogli.filter((foglio) => {
          const codice = feature.properties.COD_SQUADRO || feature.properties.cod_squadro;
          return foglio.codice === codice;
        });
        return filter.length > 0;
      });
      data.features = filteredFeatures;

      this.layerFogli = data;

      this.changeSelezioneTerritoriale(this.selezioneTerritoriale, true);
    },

    addLayerComuni() {
      let selComune = false;
      if (!this.config.formati) return;
      this.config.formati.forEach((formato) => {
        formato.selezioneTerritoriale.forEach((selTerr) => {
          if (selTerr.codice === 2) {
            selComune = true;
          }
        });
      });
      if (selComune) {
        const baseUrl = `${globals.DEFAULT_PROXY}${globals.GV_DOWNLOAD_COMUNI_URL}`;
        const url = `${baseUrl}${this.config.livelloComuni}`;
        getGeoJSON(url).then((response) => {
          this.loadDataComuni(response.data);
        });
      }
    },
    loadDataComuni(data) {
      if (GV.app.map.getLayerByName('SelezioneComune')) {
        GV.app.map.removeLayer(GV.app.map.getLayerByName('SelezioneComune'));
      }

      if (!data.features) {
        console.error('Layer Comuni con caricato');
        return;
      }
      this.comuni = data.features
        .map((feature) => {
          return {
            codice: feature.properties.CODICE_COMUNE || feature.properties.codice_comune,
            nome: feature.properties.NOME_COMUNE || feature.properties.nome_comune,
          };
        })
        .sort(function (a, b) {
          if (a.nome < b.nome) {
            return -1;
          }
          if (a.nome > b.nome) {
            return 1;
          }
          return 0;
        });

      this.layerComuni = data;

      this.changeSelezioneTerritoriale(this.selezioneTerritoriale, true);
    },
    downloadURI(url) {
      var link = document.createElement('a');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.href = url;
      link.click();
    },
    validateEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submit() {
      // CONTROLLI
      if (!this.config.flagDownloadStatico && !this.codCliente) {
        notification('Indicare Indirizzo Email');
        return;
      }
      if (!this.config.flagDownloadStatico && !this.validateEmail(this.codCliente)) {
        notification('Indirizzo Email non valido');
        return;
      }

      if (this.config.flagDownloadLivello && !this.livello) {
        notification('Selezionare un livello dalla lista');
        return;
      }
      if (this.selezioneTerritoriale === 1 && !this.bbox) {
        notification('Disegnare un rettangolo sulla mappa');
        return;
      }
      if (this.selezioneTerritoriale === 2 && !this.comune) {
        notification('Selezionare un comune dalla lista');
        return;
      }
      if (this.selezioneTerritoriale === 3 && this.fogli.length === 0) {
        notification('Selezionare i fogli di interesse dalla lista o sulla mappa');
        return;
      }
      if (this.config.flagDownloadStatico) {
        this.downloadStatico();
        return;
      }
      const data = {
        codCliente: this.codCliente,
        codCatalogo: this.idMap,
        bbox: this.bbox || '',
        codCom: this.comune,
        bboxSRS: this.bboxSRS,
        crsOut: this.sistemaCoordinate,
        formato: this.formato,
        fogli: this.fogli.join(','),
        codTema: this.codTema || '',
        utente_registrato: 'N',
        flagDownloadSincrono: this.isSyncDownload() ? 'S' : 'N',
        test: false,
      };
      insertRichiestaDownload(data).then((resp) => {
        this.isSyncDownload() ? this.showSyncPanel(resp) : this.sendNotification(resp);
      });
    },
    isSyncDownload() {
      if (this.config.flagDownloadSincrono) return true;

      if (!this.bbox && !this.codTema) {
        const cached = this.cachedRequests.filter((cache) => {
          return (
            cache.codiceCatalogo.toString() === this.idMap &&
            cache.crsOut.toString() === this.sistemaCoordinate &&
            cache.formato === this.formato
          );
        });
        if (cached && cached.length > 0) return true;
      }

      return false;
    },
    showSyncPanel(resp) {
      mountComponent({
        elId: 'gv-download-sincrono-panel',
        containerId: GV.config.containerId,
        vm: new Vue({
          template: `<gv-download-sincrono-panel v-draggable :idRichiesta="idRichiesta"></gv-download-sincrono-panel>`,
          data: {
            idRichiesta: resp.data.idRichiesta,
          },
        }),
      });
    },
    sendNotification(resp) {
      if (resp.success) {
        notification(
          `<p>Inserita richiesta numero: ${resp.data.idRichiesta}.</p> <p>Al termine della elaborazione l'esito verrà comunicato via mail</p>`,
          'info'
        );
        const me = this;
        setTimeout(function () {
          me.cleanUp();
        }, 5000);
      } else {
        notification(`<p>Errore inserimento richiesta: ${resp.message}.</p>`, 'error');
      }
    },
    downloadStatico() {
      const baseUrl = '/dtuff/download_statico/';
      let url = `${baseUrl}/${this.idMap}/${this.formato}/${this.sistemaCoordinate}/${this.selezioneTerritoriale}/`;
      if (this.config.flagDownloadLivello) {
        switch (this.selezioneTerritoriale) {
          case 0:
            url += `${this.livello}.zip`;
            break;
          case 2:
            url += `${this.livello}_${this.comune}.zip`;
            break;
          // case 5:
          //   url += `${this.livello}_${this.macrobacino}.zip`;
          //   break;
        }
      } else {
        url += `${this.idMap}.zip`;
      }

      this.downloadURI(url);
    },
    cancel() {
      this.cleanUp();
    },
    cleanUp() {
      // imposto cookies
      this.$cookie.set('codCliente', this.codCliente, '1Y');
      this.$cookie.set('formato', this.formato, '1Y');
      this.$cookie.set('selezioneTerritoriale', this.selezioneTerritoriale, '1Y');
      this.$cookie.set('sistemaCoordinate', this.sistemaCoordinate, '1Y');
      //this.$cookie.set('codTema', this.codTema, '1Y')

      // rimuovo livelli selezione
      if (GV.app.map.getLayerByName('SelezioneSquadri')) {
        GV.app.map.removeLayer(GV.app.map.getLayerByName('SelezioneSquadri'));
      }
      if (GV.app.map.getLayerByName('SelezioneComune')) {
        GV.app.map.removeLayer(GV.app.map.getLayerByName('SelezioneComune'));
      }

      // rimuovo livello selezione libera
      this.rectDisable();

      // Riattivo controllo
      GV.config.activeControl.activate();

      // rimuovo pannello download
      if (this.closeWindow === 'true') {
        window.close();
      } else {
        const dlPanel = document.getElementById('gv-map-download');
        if (dlPanel) {
          dlPanel.parentNode.removeChild(dlPanel);
        }
      }
    },
    changeFormat(codFormato) {
      const selTerr = this.config.formati
        .filter((formato) => {
          return formato.cod_formato === codFormato;
        })[0]
        .selezioneTerritoriale.filter((sel) => {
          return sel.codice !== 4;
        });

      this.config.selezioneTerritoriale = selTerr;

      const selTerrCached = selTerr.filter((sel) => {
        return sel.codice == this.$cookie.get('selezioneTerritoriale');
      });

      this.selezioneTerritoriale =
        selTerrCached.length > 0 ? selTerrCached[0].codice : selTerr[0].codice;
      this.changeSelezioneTerritoriale(this.selezioneTerritoriale);

      // if (codFormato === 'KML') {
      //   this.sistemaCoordinate = '4326';
      //   this.config.sistemiCoordinate = [
      //     {
      //       epsg_code: '4326',
      //       proj_descr: 'WGS84 - Coordinate Geografiche',
      //     },
      //   ];
      // } else {
      //   this.config.sistemiCoordinate = this.sistemiCoordinate;
      //   const isCached =
      //     this.sistemiCoordinate.filter(sis => {
      //       return sis.epsg_code == this.$cookie.get('sistemaCoordinate');
      //     }).length > 0;
      //   this.sistemaCoordinate = isCached ? this.$cookie.get('sistemaCoordinate') : '3003';
      // }
    },
    rectOnDraw(event) {
      if (GV.app.map.type === 'openlayers') {
        this.rectOnDrawOL(event);
      } else {
        this.rectOnDrawLL(event);
      }
    },
    rectOnDrawOL() {
      this.drawnRectangle.getSource().addFeature(
        new ol.Feature({
          geometry: this.dragBoxInteraction.getGeometry(),
          id: 'rect',
        })
      );
      const coords = this.drawnRectangle
        .getSource()
        .getFeatures()[0]
        .getGeometry()
        .getCoordinates();
      this.bbox = coords.map((coord) => {
        return coord.join(',');
      })[0];
      this.bboxSRS = '3857';
    },
    rectOnDrawLL(event) {
      this.drawnRectangle.addLayer(event.layer);
      const xMin = event.layer.getBounds()._southWest.lng;
      const yMin = event.layer.getBounds()._southWest.lat;
      const xMax = event.layer.getBounds()._northEast.lng;
      const yMax = event.layer.getBounds()._northEast.lat;
      this.bbox = `${xMin},${yMin},${xMax},${yMin},${xMax},${yMax},${xMin},${yMax},${xMin},${yMin}`;
      this.bboxSRS = '4326';
      this.showRectReset = true;
    },
    changeSelezioneTerritoriale(codice, silent) {
      this.comune = null;
      this.bbox = null;
      this.fogli = [];

      if (codice === 1 || codice === 2 || codice === 3 || codice === 5) {
        GV.config.activeControl.deactivate();
      } else {
        GV.config.activeControl.activate();
      }

      if (codice === 1) {
        this.rectEnable();
      } else {
        this.rectDisable();
        this.showRectReset = false;
      }

      // Selezione per comune
      if (codice === 2) {
        if (!this.layerComuni) return;
        GV.app.map.loadLayers([
          {
            name: 'SelezioneComune',
            type: 'JSON',
            style: this.style,
            visible: true,
            data: this.layerComuni,
            zIndex: 100,
            onFeatureSelect: (feature, layer) => {
              if (this.selezioneTerritoriale !== 2) {
                return;
              }
              this.comune = feature.get
                ? feature.get('CODICE_COMUNE') || feature.get('codice_comune')
                : feature.properties.CODICE_COMUNE || feature.properties.codice_comune;
            },
          },
        ]);
        if (!silent) notification('Selezionare un comune sulla mappa o dalla lista');
      } else {
        const layerComuni = GV.app.map.getLayerByName('SelezioneComune');
        if (layerComuni) {
          GV.app.map.removeLayer(layerComuni);
        }
      }

      // Selezione per fogli
      if (codice === 3) {
        if (!this.layerFogli) return;
        const style = this.style;
        GV.app.map.loadLayers([
          {
            name: 'SelezioneSquadri',
            type: 'JSON',
            style: style,
            visible: true,
            data: this.layerFogli,
            zIndex: 100,
            onFeatureSelect: (feature, layer) => {
              if (this.selezioneTerritoriale !== 3) {
                return;
              }
              const codice = feature.get
                ? feature.get('COD_SQUADRO') || feature.get('cod_squadro')
                : feature.properties.COD_SQUADRO || feature.properties.cod_squadro;
              if (this.fogli.indexOf(codice) > -1) {
                this.fogli = this.fogli.filter((item) => item !== codice);
              } else {
                this.fogli.push(codice);
              }
            },
          },
        ]);
        if (!silent) notification('Selezionare un foglio sulla mappa o dalla lista');
      } else {
        const layerSquadri = GV.app.map.getLayerByName('SelezioneSquadri');
        if (layerSquadri) {
          GV.app.map.removeLayer(layerSquadri);
        }
      }
    },
    collapse: function (event) {
      if (this.show) {
        document.getElementById('gv-map-download-body').style.display = 'none';
      } else {
        document.getElementById('gv-map-download-body').style.display = 'block';
      }
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.gv-map-download {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 50px;
  background-color: #fff;
  z-index: 800;
}

.gv-map-download-body {
  margin: 10px;
}

.gv-map-download-label {
  display: inline-block;
  width: 150px;
}

.gv-map-download-title {
  display: inline-block;
  font-weight: 800;
  width: 400px;
  margin-bottom: 20px;
}
.gv-map-download-buttons {
  float: right;
}
.gv-map-download-buttons img {
  float: left;
  margin-right: 150px;
  margin-top: 10px;
}
</style>

<style>
.el-tree-node__label {
  font-size: 12px !important;
}

.el-tabs__item.is-active {
  color: #24386c !important;
}

.el-tabs__header {
  margin: 0 0 5px !important;
}
</style>
