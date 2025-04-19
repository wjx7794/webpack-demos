const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    author: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
};

function bLoader(content, map, meta) {
  const options = this.getOptions();
  validate(schema, options);
  const prefix = `
  /**
   * Author: ${options.author}
   * Age: ${options.age}
   */
  `;
  console.log(prefix + content);
  return prefix + content;
}

module.exports = bLoader;
