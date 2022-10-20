export default function (str, data) {
  var templateRe = /\{ *([\w_\-]+) *\}/g
  return str.replace(templateRe, function (str, key) {
    var value = data[key]

    if (value === undefined) {
      throw new Error('No value provided for variable ' + str)
    } else if (typeof value === 'function') {
      value = value(data)
    }
    return value
  })
}
