<template>
  <div class="gv-info-wms gv-inverted-color-scheme" id="gv-info-wms-list">
    <gv-title v-draggable title="Risultato Info - Lista" :divId="'gv-info-wms-list'"></gv-title>
    <div class="gv-info-wms-body gv-inverted-color-scheme">
      <el-table
        :data="items"
        ref="infoListTable"
        :show-header="showHeader"
        highlight-current-row
        @row-click="onRowClick"
        size="mini"
        style="width: 100%"
      >
        <el-table-column>
          <template slot-scope="scope">
            <b>{{ scope.row.label }}</b> ({{ scope.row.layer.legend.label }})
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import InfoWmsManager from '../controls/InfoWmsManager';

import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

export default {
  name: 'gv-info-wms-list',
  props: ['items', 'visible'],
  data() {
    return {
      showHeader: false,
      width: 310,
      value: '',
    };
  },
  methods: {
    closePanel: function() {
      this.$el.parentNode.removeChild(this.$el);
      GV.app.map.getLayerByName('InfoWmsHilite').clearLayers();
    },
    onRowClick: function(item) {
      InfoWmsManager.showFeatureInfo(item);
    },
  },
  mounted() {
    GV.eventBus.$on('title-close-panel', event => {
      if (event.divId === 'gv-info-wms-html' || event.divId.startsWith('gvi-info')) {
        this.$refs.infoListTable.setCurrentRow();
      }
    });
  },
};
</script>

<style scoped>
.gv-info-wms {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 310px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
  max-height: 430px;
}

.gv-info-wms-body {
  position: absolute;
  padding: 5px;
  overflow-y: auto;
  width: 300px;
  height: auto;
  max-height: 300px;
}

.gv-info-wms-list-item-span {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 245px;
}
</style>
