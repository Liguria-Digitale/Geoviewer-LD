import mountComponent from '../util/mountComponent'
import Vue from 'vue'
Vue.component('gv-layer-search-topo', () => import('../components/LayerSearchTopo.vue'))

const Control = {
  id: 'coordinate',
  active: false,
  latlng: null,
  activate() {
    GV.log('GV.controls.layersearch.activate')
    GV.eventBus.$emit('gv-control-layersearch-activate', this)
    this.active = true
    this.openPanel()
  },
  deactivate() {
    GV.log('GV.controls.layersearch.deactivate')
    GV.eventBus.$emit('gv-control-layersearch-deactivate', this)
    this.active = false
    this.closePanel()
  },
  openPanel() {
    mountComponent({
      elId: 'gv-layer-search-topo',
      containerId: GV.config.containerId,
      toggleEl: true,
      vm: new Vue({
        template: `<gv-layer-search-topo></gv-layer-search-topo>`,
      }),
    })
  },
  closePanel() {
    document.getElementById('gv-layer-search-topo').style.display = 'none'
  },
}

export default Control
