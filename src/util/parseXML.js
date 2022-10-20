import isBrowserIE from './isBrowserIE'

export default function parseXML (data) {
  try {
    let xml = null
    if (isBrowserIE()) {
      let xmlDoc = new ActiveXObject('Microsoft.XMLDOM')
      xmlDoc.async = 'false'
      xmlDoc.loadXML(data)
      xml = xmlDoc
    } else {
      var parser = new DOMParser()
      xml = parser.parseFromString(data, 'text/xml')
    }
    return xml
  } catch (exception) {
    console.error(exception)
  }
}
