var fs = require('fs');
var slugs = JSON.parse(fs.readFileSync('module-slugs.json', 'utf8'));
var newValues = JSON.parse(fs.readFileSync('module-release.json', 'utf8'));
newValues.manifest = `${slugs.releaseUrl}${process.argv[2]||latest}/${slugs.manifestName}`;
newValues.download = `${slugs.releaseUrl}${process.argv[2]||latest}/${slugs.downloadName}`;
var originalManifest = JSON.parse(fs.readFileSync('module.json', 'utf8'));

const output = Object.assign({}, originalManifest, newValues);


fs.writeFileSync('module.json', JSON.stringify(output, {}, 2));