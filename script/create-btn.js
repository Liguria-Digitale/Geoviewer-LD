/*

  PARAMETRI 
  - comp-name = nome del componente
  - map-event = evento mappa da gestire

  UTILIZZO
  node script/create-btn <comp-name> <map-event>

*/

require('shelljs/global');
const fs = require('fs');
const byline = require('byline');

const basePath = ''
const name = process.argv[2];
const mapEvent = process.argv[3] || null;
const nomeFile = CamelCase(name);
const title = getTitle(name);

console.log('Creo componenti per bottone: ', name, ' - evento:', mapEvent);

elaboraComponente('button');
elaboraComponente('panel');
if (mapEvent) {
  elaboraComponente('control');
}

elaboraTools(name, nomeFile);

//--------------------------------------------------//

function elaboraComponente(type) {
  const ext = type === 'control' ? 'js' : 'vue';
  const file = mapEvent ? `${type}-event` : type;
  const src = `${basePath}/templates/create-btn-${file}.${ext}`;
  var linesIn = [];
  var stream = byline(
    fs.createReadStream(src, {
      encoding: 'utf8',
    }),
    {
      keepEmptyLines: true,
    }
  );
  stream.on('data', line => {
    linesIn.push(line);
  });
  stream.on('finish', () => {
    console.log('Fine lettura ' + src);
    scriviComponente(type, linesIn);
  });

  // cp(src, dst)
}

function scriviComponente(type, linesIn) {
  const ext = type === 'control' ? 'js' : 'vue';

  let dst;
  switch (type) {
    case 'button':
      dst = `${basePath}/src/components/buttons/${nomeFile}.${ext}`;
      break;
    case 'panel':
      dst = `${basePath}/src/components/${nomeFile}.${ext}`;
      break;
    case 'control':
      dst = `${basePath}/src/controls/${nomeFile}.${ext}`;
      break;
  }

  var linesOut = [];
  linesIn.forEach(line => {
    const line2 = line
      .replace(/__nome-componente__/g, name)
      .replace(/__title__/g, title)
      .replace(/__map-event__/g, mapEvent)
      .replace(/__nome-file__/g, nomeFile);
    linesOut.push(line2);
  });
  const file = fs.createWriteStream(dst);
  file.on('error', function(err) {});
  linesOut.forEach(line => {
    file.write(line + '\n');
  });
  console.log('Fine scrittura ' + dst);
  file.end();
}

function elaboraTools() {
  var linesIn = [];
  var stream = byline(
    fs.createReadStream(`${basePath}/src/tools.js`, {
      encoding: 'utf8',
    }),
    {
      keepEmptyLines: true,
    }
  );
  stream.on('data', line => {
    linesIn.push(line);
  });
  stream.on('finish', () => {
    console.log('Fine lettura src/tools.js');
    writeTools(linesIn);
  });
}

function writeTools(linesIn) {
  var linesOut = [];
  linesIn.forEach((line, index) => {
    if (line.startsWith('// ---')) {
      const bntName = `"gv-${name}-button"`;
      linesOut.push(`// Bottone ${nomeFile}`);
      linesOut.push(`tools.push({name: ${bntName}});`);
      linesOut.push(`import ${nomeFile} from "./components/buttons/${nomeFile}.vue";`);
      linesOut.push(`Vue.component(${bntName}, ${nomeFile});`);
      linesOut.push(``);
    }
    linesOut.push(line);
  });
  const file = fs.createWriteStream('../src/tools.js');
  file.on('error', function(err) {});
  linesOut.forEach(line => {
    file.write(line + '\n');
  });
  console.log('Fine lettura src/tools.js');

  file.end();
}

function CamelCase(s) {
  if (typeof s !== 'string') return '';
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}

function getTitle(s) {
  if (typeof s !== 'string') return '';
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s.replace(/-([a-z])/g, function(g) {
    return ' ' + g[1].toUpperCase();
  });
}
