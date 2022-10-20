let startpos = null

// Disabilito drop su elementi di tipo INPUT=text
window.document.body.setAttribute('ondrop', `GV.dragbox.drop(event)`)

export default {
  
  start(ev) {
    startpos = [ev.screenX, ev.screenY]
    ev.dataTransfer.setData('text/plain', ev.target.id)
  },
  end(ev, elId) {
    var el = document.getElementById(elId)
    var style = window.getComputedStyle(el, null)
    var endpos = [ev.screenX, ev.screenY]
    el.style.top = Number(style.top.replace('px', '')) + (endpos[1] - startpos[1]) + 'px'
    el.style.left = Number(style.left.replace('px', '')) + (endpos[0] - startpos[0]) + 'px'
  },
  drop(ev) {
    if (ev.target.type === 'text') {
      ev.preventDefault()
    }
  },
}
