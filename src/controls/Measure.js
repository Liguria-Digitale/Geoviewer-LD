import mountComponent from '../util/mountComponent';
import Vue from 'vue';

const Control = {
  id: 'coordinate',
  active: false,
  latlng: null,
  activate() {
    GV.log('GV.controls.measure.activate');
    GV.eventBus.$emit('gv-control-measure-activate', this);
    this.active = true;
    this.openPanel();
  },
  deactivate() {
    GV.log('GV.controls.measure.deactivate');
    GV.eventBus.$emit('gv-control-measure-deactivate', this);
    this.active = false;
    this.closePanel();
  },
  openPanel() {
    if (GV.app.map.type === 'openlayers') {
      Vue.component('gv-measure-panel', () => import('../components/MeasureOL.vue'));
    } else {
      Vue.component('gv-measure-panel', () => import('../components/Measure.vue'));
    }

    mountComponent({
      elId: 'gv-measure-panel',
      containerId: GV.config.containerId,
      toggleEl: true,
      vm: new Vue({
        template: `<gv-measure-panel></gv-measure-panel>`,
      }),
    });
  },
  closePanel() {
    document.getElementById('gv-measure-panel').style.display = 'none';
  },
};

export default Control;
