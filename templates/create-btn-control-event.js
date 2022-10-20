import mountComponent from '../util/mountComponent'
import Vue from 'vue'
Vue.component('gv-__nome-componente__-panel', () =>
  import('../components/__nome-file__.vue'))

const Control = {
  id: '__nome-componente__',
  active: false,
  latlng: null,
  activate() {
    GV.log('GV.controls.__nome-componente__.activate')
    this.openPanel()
    GV.eventBus.$emit("gv-control-__nome-componente__-activate", this);
    this.active = true
  },
  deactivate() {
    GV.log('GV.controls.__nome-componente__.deactivate')
    GV.eventBus.$emit("gv-control-__nome-componente__-deactivate", this);
    this.active = false
    this.closePanel()
  },
  openPanel() {
    mountComponent({
      elId: 'gv-__nome-componente__-panel',
      containerId: GV.config.containerId,
      toggleEl: true,
      vm: new Vue({
        template: `<gv-__nome-componente__-panel></gv-__nome-componente__-panel>`,
      }),
    })
  },
  closePanel() {
    document.getElementById('gv-__nome-componente__-panel').style.display = 'none'
    //Hide del pannello
  },
}

export default Control
