var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(app) {
  console.log('Lancio ambiente di sviluppo per Applicazione: ' + app);

  var entry = {
    app: './pages/apps/' + app + '/index.dev.js',
  };

  var htmlEntry = 'index.html';
  // var htmlEntry = './pages/apps/' + app + '/index.dev.html';

  Object.keys(entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(entry[name]);
  });

  return merge(baseWebpackConfig, {
    module: {
      loaders: utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
      }),
    },
    // eval-source-map is faster for development
    devtool: 'eval-source-map',
    plugins: [
      //    new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        'process.env': config.dev.env,
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: htmlEntry,
        template: htmlEntry,
        inject: true,
      }),
    ],
  });
};
