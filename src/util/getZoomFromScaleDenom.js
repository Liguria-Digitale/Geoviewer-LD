import globals from '../globals'

export default function getZoomFromScaleDenom(scaleDenom) {
  const zoom = globals.BASE_SCALES.findIndex(function(scale) {
    return scaleDenom > scale
  })
  return zoom < 0 ? 20 : zoom
}

/*

import globals from '../globals'

export default function getZoomFromScaleDenom (scaleDenom) {
  const zoom = globals.BASE_SCALES.findIndex(function (scale) {
    return scaleDenom > scale
  })
  return zoom - 1
}

*/
