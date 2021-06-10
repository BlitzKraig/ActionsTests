var fs = require('fs');
var newValues = JSON.parse(fs.readFileSync('module-release.json', 'utf8'))
console.log(process.argv[2]);
var originalManifest = JSON.parse(fs.readFileSync('module.json', 'utf8').replace(new RegExp(process.argv[2]||'\\$TAG', 'g'), process.argv[3]||'latest'))
const output = Object.assign({}, originalManifest, newValues);


fs.writeFileSync('module.json', JSON.stringify(output, {}, 2));