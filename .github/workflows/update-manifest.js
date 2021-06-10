var fs = require('fs');
var newValues = fs.readFileSync('module-release.json', 'utf8')
newValues.replace(/\$TAG/g, process.argv[2]||'latest')
newValues = JSON.parse(newValues)
var originalManifest = JSON.parse(fs.readFileSync('module.json', 'utf8'))


const output = Object.assign({}, originalManifest, newValues);


fs.writeFileSync('module.json', JSON.stringify(output));