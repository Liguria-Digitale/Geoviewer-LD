<template>
  <div id="gv-map-catalog-panel-repertorio">
    <form @submit.prevent.stop @keyup.enter="submitRepertorio">
      <el-row class="gv-map-catalog-panel-form" type="flex" justify="left">
        <el-col :span="20">
          <el-input
            id="gv-map-catalog-panel-repertorio-search"
            placeholder="Ricerca..."
            v-model="formData.query"
            size="mini"
          >
            <i
              style="cursor:default;"
              slot="suffix"
              class="el-input__icon el-icon-circle-close"
              @click="handleRepertorioIconClick"
            ></i>
          </el-input>
        </el-col>
        <el-col v-if="largeScreen" :span="20">
          <span class="gv-map-catalog-label"></span>
          <el-select
            v-model="formData.ente"
            size="mini"
            filterable
            clearable
            placeholder="tutti gli enti"
            @change="onChangeEnte"
          >
            <el-option
              v-for="item in enti"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </form>
    <div v-if="largeScreen" >
      <div class="gv-map-catalog-tree">
        <el-tree
          id="gv-map-catalog-repertorio-tree"
          :data="panel.tree"
          show-checkbox
          @check-change="handleSelectionChange"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="id"
          accordion
          :render-content="renderContent"
          :default-expanded-keys="expanded_nodes"
        ></el-tree>
      </div>
      <el-button type="primary" @click="submitMultiSel" class="gv-map-catalog-button" size="mini">
        <span>Carica</span>
      </el-button>
    </div>
    <div class="gv-map-catalog-table" v-if="!largeScreen" >
      <el-table
        :data="list"
        @current-change="handleTableRowSelect"
        highlight-current-row
        :show-header=false
        :stripe=true
        :cell-style="{ padding: '2px' }"
        style="width: 100%">
        <el-table-column
          prop="text"
          width="340">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import handleSelectionChange from '../mixins/MapCatalogTree';
import submitMultiSel from '../mixins/MapCatalogTree';
import handleNodeClick from '../mixins/MapCatalogTree';

import mountComponent from '../util/mountComponent';
import uri from 'url';
import getCatalog from '../services/getCatalog';
import notification from '../util/notification';

Vue.component('gv-map-info-panel', () => import('./MapInfoPanel.vue'));

import { Button, Row, Col, Tree, Input, Select, Option } from 'element-ui';
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tree);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import TestScreenWidth from '../mixins/TestScreenWidth';

export default {
  name: 'gv-map-catalog-panel-repertorio',
  props: ['panel'],
  data() {
    if (!GV.config.enti) {
      GV.config.enti = ['Regione Liguria'];
    }
    const enti = GV.config.enti
      .filter(ente => ente !== 'REGIONE LIGURIA')
      .map(ente => {
        return {
          value: ente
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace('Di', 'di'),
        };
      });
    enti.unshift({
      value: 'Regione Liguria',
    });

    // const screenWidth = document.documentElement.clientWidth
    // const maxScreenWidth = 420
    // const largeScreen = screenWidth > maxScreenWidth

    return {
      // screenWidth: screenWidth,
      // maxScreenWidth: maxScreenWidth,
      // largeScreen: largeScreen,
      list: [],
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      catalogoCompleto: true,
      formData: {
        query: '',
        ente: '',
        download: false,
      },
      enti: enti,
      expanded_nodes: [],
      multipleSelection: [],
    };
  },
  mounted() {
    this.loadTree();
  },
  mixins: [handleSelectionChange, submitMultiSel, handleNodeClick,TestScreenWidth],
  methods: {
    onChangeEnte(value) {
      this.submitRepertorio();
    },
    handleTableRowSelect(val) {
      var r = confirm('Sei sicuro?');
      if (r == true) {
        GV.config.addCatMap(`${val.id}`, false, false);
      }
    },    
    submitRepertorio() {
      const filtriImpostati = this.formData.query !== '' || this.formData.ente !== '';
      if (filtriImpostati) {
        const params = {
          q: this.formData.query,
          ente: this.formData.ente.toUpperCase(),
          filterDownloadCatalog: GV.config.application.layout.legend.options.filterDownloadCatalog,
        };
        getCatalog(params).then(data => {
          this.panel.tree = GV.config.catalog = data.children;
          this.panel.tree.forEach(macro => {
            this.expanded_nodes.push(macro.id);
            if (params.ente !== 'REGIONE LIGURIA' || params.q) {
              macro.children.forEach(cat => {
                this.expanded_nodes.push(cat.id);
              });
            }
          });
        });
        this.loadList()
        this.expanded_nodes = ['REPERTORIO ENTI LOCALI'];
        this.catalogoCompleto = false;
      } else {
        if (this.catalogoCompleto) {
          return;
        }
        this.panel.tree = GV.config.catalog = GV.config.catalogFull;
        this.panel.tree.forEach(node => {
          this.expanded_nodes.push(node.id);
        });
        this.loadList()
        this.catalogoCompleto = true;
      }
    },
    handleRepertorioIconClick() {
      this.formData.query = '';
      this.submitRepertorio();
    },
    loadTree() {
      if (GV.config.catalog) {
        this.panel.tree = GV.config.catalog;
        this.panel.tree.forEach(node => {
          this.expanded_nodes.push(node.id);
        });
        this.loadList()
      } else {
        const params = {
          filterDownloadCatalog: GV.config.application.layout.legend.options.filterDownloadCatalog,
        };
        getCatalog(params).then(data => {
          this.panel.tree = GV.config.catalog = GV.config.catalogFull = data.children;
          this.panel.tree.forEach(node => {
            this.expanded_nodes.push(node.id);
          });
          this.loadList()
        });
      }
    },
    loadList() {
      const list = []
      for (const mc of this.panel.tree) {
        for (const cat of mc.children) {
          for (const map of cat.children) {
            list.push({
              id: map.id,
              text: map.text
            })
          }
        }
      }
      this.list = list.sort((a, b) => { 
        if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;        
      })
    },
    renderContent(h, { node, data, store }) {
      if (node.data.type === 'MAPPA') {
        return <span style="font-size: 12px; ">{node.label}</span>;
      }

      if (node.data.type === 'CATEGORIA') {
        return <span style="font-size: 12px; font-weight: bold; ">{node.label}</span>;
      }

      if (node.data.type === 'MACROCATEGORIA') {
        return (
          <span style="font-size: 12px; font-weight: bold; background-color: #ddd; padding: 5px; ">
            {node.label}
          </span>
        );
      }
    },
  },
};
</script>

<style scoped>
.gv-map-catalog-tree {
  max-height: 400px;
  height: 400px;
  width: 480px;
  overflow: auto;
}

#gv-map-catalog-panel-repertorio {
  width: 360px;
}

.gv-map-catalog-table {
  max-height: 400px;
  margin-left: 10px;
  height: 400px;
  width: 340px;
  overflow: auto;
}

/* .gv-map-catalog-panel-form {
  padding: 0px 10px 5px;
  width: 600px;
} */

.gv-map-catalog-label {
  font-size: 12px;
  padding-left: 5px;
  font-family: 'Raleway', Arial, sans-serif;
}

</style>

<style>
.el-tree-node__label {
  font-size: 12px !important;
}

.el-tabs__item.is-active {
  color: #24386c !important;
}

.el-tree-node {
  white-space: normal !important;
  padding: 5px;
}

.gv-map-catalog-button {
  margin-top: 10px;
  font-size: 12px;
}

.gv-map-catalog-button span {
  font-family: 'Raleway', Arial, sans-serif;
}
</style>
