const path = require('path');
const pathJoin = path.join(__dirname, './text.txt');
const fs = require('fs');

let streamRead = new fs.ReadStream(pathJoin);

streamRead.on('readable', function () {
  let data = streamRead.read();
  if (data != null) {
    console.log(data.toString());
  }
});

streamRead.on('error', function (err) {
  if (err.code == 'ENOENT') {
    console.log('File was not found');
  } else {
    console.error(err);
  }
});
