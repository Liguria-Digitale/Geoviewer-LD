<template>
  <div id="gv-download-totale-panel" class="gv-inverted-color-scheme">
    <gv-title
      v-draggable
      title="DOWNLOAD"
      :hide="false"
      :divId="'gv-download-totale-panel'"
    ></gv-title>
    <div id="gv-download-totale-wrapper" class="gv-download-totale-wrapper">
      <div id="gv-download-totale-body">
        <el-table
          empty-text="Nessuna mappa scaricabile"
          ref="mapsTable"
          :data="maps"
          :show-header="showHeader"
          size="mini"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="25"></el-table-column>
          <el-table-column label="Carte Scaricabili" width="438">
            <template slot-scope="scope"> ({{ scope.row.name }}) </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="gv-inverted-color-scheme gv-download-totale-footer">
        <el-form :model="form" ref="form">
          <el-form-item>
            <span id="gv-download-totale-label">Email</span>
            <el-input
              id="gv-download-totale-email"
              style="width: 250px;"
              size="mini"
              placeholder="Email"
              type="email"
              v-model="codCliente"
            >
            </el-input>
            <el-button id="gv-download-totale-submit" type="primary" size="mini" @click="submit"
              >Conferma</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import mountComponent from '../util/mountComponent';
Vue.component('gv-title', () => import('./Title.vue'));
import notification from '../util/notification';
import insertRichiestaDownload from '../services/insertRichiestaDownload';

import { Button, Input, Form, FormItem, Notification } from 'element-ui';
Vue.use(Button, Form, FormItem, Notification);
Vue.use(Input);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

export default {
  name: 'gv-download-totale-panel',
  props: ['idMap'],
  data() {
    const maps = GV.config.maps.filter(map => {
      return map.downloadSuInteroTerritorio == true;
    });
    return {
      codCliente: '',
      showHeader: true,
      maps: maps,
      multipleSelection: [],
      buttonDisabled: false,
    };
  },
  mounted() {
    GV.log('gv-download-totale-panel: mounted');
    // Gestione sospensione per menutenzione
    if (GV.globals.SYS_MANUTENZIONE_DOWNLOAD) {
      notification('SISTEMA IN MANUTENZIONE: SERVIZIO TEMPORANEAMENTE SOSPESO');
      this.$el.hidden = true;
      return;
    }

    this.codCliente =
      this.$cookie.get('codCliente') != 'null' ? this.$cookie.get('codCliente') : '';
    this.selectAll();
    Notification({
      title: 'Info',
      type: 'info',
      duration: 5000,
      offset: 70,
      dangerouslyUseHTMLString: true,
      position: 'bottom-left',
      message:
        "Questa funzione permette di effettuare il download delle carte presenti in legenda e scaricabili per l'intero territorio.<br>Le carte vengono scaricate per l'intera copertura, in formato SHAPE e sistema GAUSS-BOAGA",
    });
  },
  methods: {
    selectAll() {
      if (this.maps) {
        this.maps.forEach(map => {
          this.$refs.mapsTable.toggleRowSelection(map);
        });
      } else {
        this.$refs.mapsTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cleanUp() {
      // imposto cookies
      this.$cookie.set('codCliente', this.codCliente, '1Y');
    },
    getMapsList() {
      const mapList = this.multipleSelection
        .map(map => {
          return map.id;
        })
        .join(',');
      return mapList;
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submit() {
      if (!this.codCliente) {
        notification('Indicare Indirizzo Email');
        return;
      }
      if (!this.validateEmail(this.codCliente)) {
        notification('Indirizzo Email non valido');
        return;
      }
      const mapList = this.getMapsList();
      if (mapList === '') {
        notification('Selezionare almeno una carta');
        return;
      }
      //TODO metodo per comporre lista idMap
      const data = {
        flagComposta: true,
        codCliente: this.codCliente,
        codCatalogo: mapList,
        bbox: '',
        bboxSRS: null,
        crsOut: '3003',
        formato: 'SHP',
        fogli: '',
        codTema: '',
        utente_registrato: 'N',
        test: false,
        tipologia: 'CWN2',
        flagDownloadSincrono: 'N',
      };
      insertRichiestaDownload(data).then(resp => {
        if (resp.success) {
          notification(
            `<p>Inserita richiesta numero: ${resp.data.idRichiesta}.</p> <p>Al termine della elaborazione l'esito verrà comunicato via mail</p>`,
            'info'
          );
          const me = this;
          setTimeout(function() {
            me.cleanUp();
          }, 5000);
        } else {
          notification(`<p>Errore inserimento richiesta: ${resp.message}.</p>`, 'error');
        }
      });
    },
  },
};
</script>

<style>
#gv-download-totale-panel {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 90px;
  background-color: #fff;
  z-index: 800;
}

#gv-download-totale-body {
  width: 480px;
  max-height: 400px;
  cursor: default;
  overflow: hidden;
}

#gv-download-totale-body:hover {
  overflow-y: scroll;
  overflow-x: hidden;
}

#gv-download-totale-wrapper {
  display: block;
}

.gv-download-totale-footer {
  height: 42px;
}
#gv-download-totale-submit {
  margin: 10px;
  float: right;
}
#gv-download-totale-label {
  margin: 10px;
}
</style>
