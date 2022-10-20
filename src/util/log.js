export default function log (msg) {
  if (GV.config.debug) {
    console.log(msg)
  }
}

