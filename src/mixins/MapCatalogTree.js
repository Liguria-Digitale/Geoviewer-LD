import Vue from 'vue';
import mountComponent from '../util/mountComponent';
import getScheda from '../services/getScheda';
import notification from '../util/notification';

export default {
  methods: {
    handleSelectionChange(data, checked, indeterminate) {
      if (data.children && !indeterminate) {
        if (checked) {
          data.children.forEach(child => {
            if (!child.children) this.addToSelection(child.id);
          });
        } else {
          data.children.forEach(child => {
            if (!child.children) this.removeFromSelection(child.id);
          });
        }
      } else {
        if (checked) {
          this.addToSelection(data.id);
        } else {
          this.removeFromSelection(data.id);
        }
      }
    },
    addToSelection(idMap) {
      const index = this.multipleSelection.indexOf(idMap);
      if (index == -1) {
        this.multipleSelection.push(idMap);
      }
    },
    removeFromSelection(idMap) {
      const index = this.multipleSelection.indexOf(idMap);
      if (index > -1) {
        this.multipleSelection.splice(index, 1);
      }
    },
    submitMultiSel() {
      if (this.multipleSelection.length > 10) {
        notification(
          `Selezionare un massimo di 10 mappe. Ne hai selezionate ${this.multipleSelection.length}`
        );
        return;
      }
      this.multipleSelection.forEach(idMap => {
        GV.config.addCatMap(`${idMap}`, false, false);
      });
    },
    isDownloadable(map) {
      if (GV.globals.GV_CATALOG === 'pub' && map.flag_download) return true;
      if (GV.globals.GV_CATALOG === 'int' && (map.flag_download_extranet || map.flag_download))
        return true;
      return false;
    },
    handleNodeClick(data) {
      const idMap = data.id;
      if (!idMap) {
        return;
      }
      getScheda(idMap).then(metaData => {
        if (!metaData) {
          console.error('Scheda non trovata');
          return;
        }
        const downloadable = this.isDownloadable(metaData);
        mountComponent({
          elId: 'gv-map-info-panel',
          clear: true,
          vm: new Vue({
            template: `<gv-map-info-panel visible="true" :metaData="metaData" addToMapButton="true" downloadable="${downloadable}"></gv-map-info-panel>`,
            data: { metaData: metaData },
          }),
        });
      });
    },
  },
  mounted: function() {},
};
