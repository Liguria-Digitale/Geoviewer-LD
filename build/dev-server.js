var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../config');
var proxyMiddleware = require('http-proxy-middleware');
require('shelljs/global');

// IMPOSTO APP
var applicazione = process.argv[2];
if (!applicazione) {
  console.log('Parametro Applicazione non impostato. Es: npm run dev geoportale');
  return null;
}

// ---------------

var webpackConfig =
  process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')(applicazione);

if (!webpackConfig) return;

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
  },
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
  console.log('Ambiente di sviluppo per applicazione ' + applicazione + '\n');
});
