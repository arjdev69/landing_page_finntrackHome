/* global module, require */

// O adaptador precisa exportar CommonJS para o ESLint 9 e o jsx-a11y 6.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const modern = require('minimatch-modern');

function minimatch(path, pattern, options) {
  return modern.minimatch(path, pattern, options);
}

Object.assign(minimatch, modern);
module.exports = minimatch;
