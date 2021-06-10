var fs = require('fs');
var newValues = JSON.parse(fs.readFileSync('module-release.json', 'utf8'))
var originalManifest = JSON.parse(fs.readFileSync('module.json', 'utf8'))

newValues.replace(/\$TAG/g, process.argv[2]||'latest')

const output = Object.assign({}, originalManifest, newValues);


fs.writeFileSync('module.json', JSON.stringify(output));