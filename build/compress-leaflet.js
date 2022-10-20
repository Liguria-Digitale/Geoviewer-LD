const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');
const cleanCSS = require('@node-minify/clean-css');

minify({
  compressor: uglifyJS,
  input: 'dist/leaflet/leaflet.js',
  output: 'dist/leaflet/leaflet-min.js',
  callback: function(err, min) {},
});

minify({
  compressor: cleanCSS,
  input: 'dist/leaflet/leaflet.css',
  output: 'dist/leaflet/leaflet-min.css',
  callback: function(err, min) {},
});

// minify({
//   compressor: uglifyJS,
//   input: 'dist/openlayers/ol.js',
//   output: 'dist/openlayers/ol-min.js',
//   callback: function(err, min) {},
// });
