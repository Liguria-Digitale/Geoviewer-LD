/*

  PARAMETRI 
  - target = PROD / STAGING
  - app = nome della dir della applicazione
    se app="LIB" viene fatto deploy della libreria

  UTILIZZO
  npm run deploy <TARGET> <APP>

  D:\Tomcat\webapps\ROOT\geoviewer2\deploy.bat <TARGET> <APP>
  D:\Tomcat\webapps\ROOT\geoviewer2\deploy.bat STAGING LIB
  D:\Tomcat\webapps\ROOT\geoviewer2\deploy.bat STAGING geoportale

*/

require('shelljs/global');
const fs = require('fs');
const path = require('path');
const config = require('../config');

console.log('Deploy Geoviewer2\n\n');

const target = process.argv[2];
const app = process.argv[3];

if (
  target !== 'LOCAL' &&
  target !== 'TEST' &&
  target !== 'PROD' &&
  target !== 'STAGING' &&
  target !== 'PROD-PROT' &&
  target !== 'STAGING-PROT'
) {
  console.log(
    '\n\n ATTENZIONE!!! Parametro "target" non corretto (LOCAL/TEST/PROD/STAGING/PROD-PROT/STAGING-PROT) '
  );
  return;
}
if (app === '') {
  console.log(
    '\n\n ATTENZIONE!!! Parametro "app" deve essere impostato (impostare a "LIB" per deploy libreria) '
  );
  return;
}

console.log(`Deploy in ambiente:${target}\n`);

const version = Date.now().toString();
const type = app === 'LIB' ? 'LIB' : 'APP';

if (type === 'LIB') deployLib(target);
if (type === 'APP') deployApp(target);

function deployLib(target) {

  const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
  console.log('assetsPath', assetsPath);

  if (config.deploy.baseDeployDir[target]) {
    const distPath = path.join(config.deploy.baseDeployDir[target], 'dist/');
    console.log('distPath', distPath);
    console.log(`\n\nDeploy libreria - Versione ${version}\n`);
    // rm('-rf', staticPath);
    cp('-R', assetsPath, distPath);
  }
}

function deployApp(target) {
  const appsDir = '/pages/apps';
  const appsSourceBasePath = path.resolve(__dirname, '..' + appsDir);
  const appSourcePath = path.join(appsSourceBasePath, app);
  console.log('appSourcePath', appSourcePath);

  const appTargetPath = path.join(path.join(config.deploy.baseDeployDir[target], appsDir), app);
  console.log('appTargetPath', appTargetPath);

  // return;

  if (!fs.existsSync(appSourcePath)) {
    console.log(` ATTENZIONE! Applicazione ${appSourcePath} non esiste\n`);
    return;
  }

  console.log(`\nDeploy applicazione ${app}\n`);
  rm('-rf', appTargetPath);
  cp('-R', appSourcePath, appTargetPath);
}
