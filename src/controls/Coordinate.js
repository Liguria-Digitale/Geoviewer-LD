import mountComponent from '../util/mountComponent';
import Vue from 'vue';
Vue.component('gv-coordinate-panel', () => import('../components/Coordinate.vue'));

const Control = {
  id: 'coordinate',
  active: false,
  latlng: null,
  activate() {
    GV.log('GV.controls.coordinate.activate');
    this.active = true;
    this.openPanel();
    GV.eventBus.$emit('gv-control-coordinate-activate', this);
  },
  deactivate() {
    GV.log('GV.controls.coordinate.deactivate');
    GV.eventBus.$emit('gv-control-coordinate-deactivate', this);
    this.active = false;
    this.closePanel();
  },
  openPanel() {
    mountComponent({
      elId: 'gv-coordinate-panel',
      containerId: GV.config.containerId,
      toggleEl: true,
      vm: new Vue({
        template: `<gv-coordinate-panel></gv-coordinate-panel>`,
      }),
    });
  },
  closePanel() {
    document.getElementById('gv-coordinate-panel').style.display = 'none';
  },
};

export default Control;
