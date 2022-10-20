import { Loading } from 'element-ui'
export default function startLoadingService(text) {
  let options = GV.globals.LOADING_OPTIONS
  options.text = text
  GV.loadingInstance = Loading.service(options)
}
