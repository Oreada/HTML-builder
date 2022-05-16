const path = require('path');
const pathJoin = path.join(__dirname, './text.txt');
const fs = require('fs');

let stream = new fs.ReadStream(pathJoin);

stream.on('readable', function () {
  let data = stream.read();
  if (data != null) {
    console.log(data.toString());
  }
});

stream.on('error', function (err) {
  if (err.code == 'ENOENT') {
    console.log('File was not found');
  } else {
    console.error(err);
  }
});
