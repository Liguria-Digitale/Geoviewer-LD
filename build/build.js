// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';

var path = require('path');
var config = require('../config');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');

console.log(
  '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    "  Opening index.html over file:// won't work.\n"
);

var spinner = ora('building for production...');
spinner.start();

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
cp('-R', 'static/', assetsPath);

webpack(webpackConfig, function(err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n'
  );

  const geoviewerPath = 'D:\\Tomcat\\webapps\\geoservices\\apps\\viewer\\dist\\static';
  console.log('\n Copio la distribuzione su geoservices\\apps\\viewer: ' + geoviewerPath);
  rm('-rf', geoviewerPath);
  cp('-R', assetsPath, geoviewerPath);
});
