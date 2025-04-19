module.exports = function runtime(params) {
  const { content, y } = params || {};
  const x = y * 10;

  return `${content} \n console.log(${x})`;
};
