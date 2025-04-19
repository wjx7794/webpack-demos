const fs = require('fs');
const path = require('path');

const PluginName = 'CleanPlugin';

class CleanPlugin {
  apply(compiler) {
    compiler.hooks.make.tap(PluginName, () => {
      function clearDir(dirPath) {
        console.log('dirPath>>>', dirPath);
        let files = [];
        if (fs.existsSync(dirPath)) {
          files = fs.readdirSync(dirPath);
          files.forEach((f) => {
            const absPath = dirPath + '/' + f;
            if (fs.statSync(absPath).isDirectory()) {
              clearDir(absPath);
            } else {
              fs.unlinkSync(absPath);
            }
          });
        }
      }
      clearDir(path.resolve(__dirname, '../../dist'));
    });
  }
}

module.exports = CleanPlugin;
