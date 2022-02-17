// vscode-jest の debuggerを調整するためのツール
// https://github.com/jest-community/vscode-jest/issues/518#issuecomment-623203476

const Path = require('path');
const findUp = require('find-up'); // yarn add -D -W find-up

if (process.env.CI === 'vscode-jest-tests') {
  const index = process.argv.indexOf('--fileDirname');
  if (index > 0) {
    const [command, fileDirname] = process.argv.splice(index, 2);
    const match = findUp.sync(['jest.config.js', 'jest.config.json'], {cwd: fileDirname, type: 'file'});

    // if match and it's not outside the workspace:
    if (match && Path.dirname(match) >= process.cwd()) {
      process.argv.push('--config', match);
    }
  }
}

require('jest-cli/bin/jest');
