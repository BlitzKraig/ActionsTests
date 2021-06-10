var fs = require('fs');
var newValues = JSON.parse(fs.readFileSync('module-release.json', 'utf8'))
var originalManifest = JSON.parse(fs.readFileSync('module.json', 'utf8'))
const output = Object.assign({}, originalManifest, newValues);
fs.writeFileSync('module.json', JSON.stringify(output));