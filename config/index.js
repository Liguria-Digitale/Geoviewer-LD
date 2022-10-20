// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../../../dist/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/geoservices/**': 'http://localhost:8080/',
      },
    cssSourceMap: false,
  },
  deploy: {
    baseDeployDir: {
      LOCAL: '',
      TEST: '',
      STAGING: '',
      PROD: '',
    },
    backUpDir: '_BACKUP/',
  },
};
