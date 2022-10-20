<template>
  <div id="gv-map-catalog-panel-canali">
    <div v-if="largeScreen">
      <div class="gv-map-catalog-tree">
        <el-tree
          :data="panel.tree"
          show-checkbox
          @check-change="handleSelectionChange"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <el-button type="primary" @click="submitMultiSel" class="gv-map-catalog-button" size="mini">
        <span>Carica</span>
      </el-button>
    </div>
    <div class="gv-map-catalog-table" v-if="!largeScreen">
      <el-table
        :data="list"
        @current-change="handleTableRowSelect"
        highlight-current-row
        :show-header="false"
        :stripe="true"
        :cell-style="{ padding: '2px' }"
        style="width: 100%"
      >
        <el-table-column prop="text" width="340"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import handleSelectionChange from '../mixins/MapCatalogTree';
import submitMultiSel from '../mixins/MapCatalogTree';
import handleNodeClick from '../mixins/MapCatalogTree';

import getCanali from '../services/getCanali';

Vue.component('gv-map-info-panel', () => import('./MapInfoPanel.vue'));

import { Button, Tree } from 'element-ui';
Vue.use(Button);
Vue.use(Tree);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import TestScreenWidth from '../mixins/TestScreenWidth';

export default {
  name: 'gv-map-catalog-panel-canali',
  props: ['panel'],
  data() {
    return {
      // screenWidth: screen.width,
      // maxScreenWidth: 420,
      list: [],
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      expanded_nodes: [],
      multipleSelection: [],
    };
  },
  mounted() {
    // Carico i tree per i pannelli di tipo tree
    this.loadTree();
  },
  mixins: [handleSelectionChange, submitMultiSel, handleNodeClick, TestScreenWidth],
  methods: {
    loadTree() {
      if (this.panel.options.multiCanale) {
        this.panel.label = `Canali Tematici`;
        this.panel.tree = [];
        if (this.panel.options.canale) {
          const canali = this.panel.options.canale.toString().split(',');
          canali.forEach((canale) => {
            const params = {
              tematici: this.panel.options.tematici,
              canale: canale,
              pub: this.panel.options.pub,
            };
            getCanali(params).then((data) => {
              if (data) {
                this.panel.tree.push(data);
                this.loadList();
              }
            });
          });
        }
        if (this.panel.options.applicazione) {
          const applicazioni = this.panel.options.applicazione.split(',');
          applicazioni.forEach((applicazione) => {
            const params = {
              applicazione: applicazione,
              tematici: this.panel.options.tematici,
              pub: this.panel.options.pub,
            };
            getCanali(params).then((data) => {
              if (data) {
                this.panel.tree.push(data);
                this.loadList();
              }
            });
          });
        }
      } else {
        getCanali(this.panel.options).then((data) => {
          if (data) {
            this.panel.tree = data.children;
            this.panel.label = `Canali Tematici: ${data.text}`;
            this.loadList();
          }
        });
      }
    },
    loadList() {
      const list = [];
      for (const el of this.panel.tree) {
        if (el.leaf) {
          list.push({
            id: el.id,
            text: el.text,
          });
        } else {
          for (const el2 of el.children) {
            if (el2.leaf) {
              list.push({
                id: el2.id,
                text: el2.text,
              });
            } else {
              for (const el3 of el2.children) {
                list.push({
                  id: el3.id,
                  text: el3.text,
                });
              }
            }
          }
        }
        // for (const cat of mc.children) {
        //   for (const map of cat.children) {
        //     list.push({
        //       id: map.id,
        //       text: map.text
        //     })
        //   }
        // }
      }
      this.list = list.sort((a, b) => {
        if (a.text < b.text) {
          return -1;
        }
        if (a.text > b.text) {
          return 1;
        }
        return 0;
      });
    },
    handleTableRowSelect(val) {
      var r = confirm('Sei sicuro?');
      if (r == true) {
        GV.config.addCatMap(`${val.id}`, false, false);
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

.gv-map-catalog-table {
  max-height: 400px;
  height: 400px;
  width: 340px;
  overflow: auto;
}
</style>

<style>
.el-tree-node__label {
  font-size: 12px !important;
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
