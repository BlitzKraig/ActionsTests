var fs = require('fs');
console.log(JSON.parse(fs.readFileSync('module-release.json', 'utf8')).version);