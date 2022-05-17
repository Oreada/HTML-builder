const path = require('path');
const pathJoin = path.join(__dirname, './written.txt');

const fs = require('fs');
let streamWrite = fs.createWriteStream(pathJoin);

streamWrite.on('error', (err) => {
  if (err.code == 'ENOENT') {
    console.log('File was not found');
  } else {
    console.error(err.message);
  }
  process.exit();
});

const process = require('process');

process.stdout.write('Hello, student! Could you write something?\n');

process.on('SIGINT', () => {
  process.exit();
});

process.stdin.on('data', (input) => {
  if (input.toString().trim() == 'exit') {
    process.exit();
  }
  streamWrite.write(input);
});

process.on('exit', () => process.stdout.write('Good luck at the course!'));


