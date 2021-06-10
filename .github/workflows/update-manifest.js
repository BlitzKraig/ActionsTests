var fs = require('fs');
var slugs = JSON.parse(fs.readFileSync('module-slugs.json', 'utf8'));
var newValues = JSON.parse(fs.readFileSync('module-versions.json', 'utf8'));
newValues.manifest = `${slugs.releaseUrl}${process.argv[2]||newValues.version}/${slugs.manifestName}`;
newValues.download = `${slugs.releaseUrl}${process.argv[2]||newValues.version}/${slugs.downloadName}`;
var originalManifest = JSON.parse(fs.readFileSync('module.json', 'utf8'));

const output = Object.assign({}, originalManifest, newValues);


fs.writeFileSync('module.json', JSON.stringify(output, {}, 2));

var changelog = fs.readFileSync('latest-changes.md', 'utf8');
changelog += `

Manifest Link: ${newValues.manifest}`

fs.writeFileSync('latest-changes.md', changelog);