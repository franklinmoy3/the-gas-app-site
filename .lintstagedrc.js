const path = require('path');

const buildPrettierCommand = (filenames) =>
  `pnpm format --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildPrettierCommand, buildEslintCommand],
};
