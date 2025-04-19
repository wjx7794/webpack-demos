const path = require('path');
const fs = require('fs');

function dLoader(content, map, meta) {
  const callback = this.async();
  const headerPath = path.resolve(__dirname, '../header.js');

  this.addDependency(headerPath);

  fs.readFile(headerPath, 'utf-8', function (err, header) {
    if (err) return callback(err);
    callback(null, header + '\n' + content);
  });
}

module.exports = dLoader;
