import mountComponent from './mountComponent'

export default function(options) {
  'use strict'
  let { componentId, props, data, toggleEl } = options

  mountComponent({
    componentId: componentId,
    containerId: GV.config.containerId,
    toggleEl: toggleEl,
    vm: new Vue({
      template: `<${componentId} ${props}></${componentId}>`,
      data: data,
    }),
  })
}
