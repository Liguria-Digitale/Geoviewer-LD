import Vue from 'vue'

Vue.directive('draggable', {
  inserted: function (el, binding, vnode) {
    const id = el.id.replace('-title','')
    el.className += ' draggable'
    el.setAttribute('draggable', 'true')
    el.setAttribute('ondragstart', 'GV.dragbox.start(event)')
    el.setAttribute('ondragend', `GV.dragbox.end(event,'${id}')`)
  }
})

