'use strict';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const testFormat = async () => {
  try {
    await exec('npx prettier --list-different "**/*.js" "**/*.ts" "**/*.md"');
  } catch (err) {
    // The last char of stdout is '\n', so we need to slice out the empty line
    return err.stdout.toString().split('\n').slice(0, -1);
  }

  return false;
};

module.exports = testFormat;
