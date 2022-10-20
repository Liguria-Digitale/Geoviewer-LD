export default function stopLoadingService() {
  if (GV.loadingInstance) {
    GV.loadingInstance.close()
  }
}
