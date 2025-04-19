const runtime = require('./loader-runtime.js');

function eLoader(content, map, meta) {
  return `${runtime({
    content,
    y: Math.random(),
  })}`;
}

module.exports = eLoader;
