import mountComponent from '../util/mountComponent';
import Vue from 'vue';
Vue.component('gv-measure-ol-panel', () => import('../components/MeasureOl.vue'));

const Control = {
  id: 'coordinate',
  active: false,
  latlng: null,
  activate() {
    GV.log('GV.controls.measure-ol.activate');
    GV.eventBus.$emit('gv-control-measure-ol-activate', this);
    this.active = true;
    this.openPanel();
  },
  deactivate() {
    GV.log('GV.controls.measure-ol.deactivate');
    GV.eventBus.$emit('gv-control-measure-ol-deactivate', this);
    this.active = false;
    this.closePanel();
  },
  openPanel() {
    mountComponent({
      elId: 'gv-measure-panel',
      containerId: GV.config.containerId,
      toggleEl: true,
      vm: new Vue({
        template: `<gv-measure-ol-panel></gv-measure-ol-panel>`,
      }),
    });
  },
  closePanel() {
    document.getElementById('gv-measure-panel').style.display = 'none';
  },
};

export default Control;
