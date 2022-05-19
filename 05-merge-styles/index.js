const path = require('path');
const pathJoinStyles = path.join(__dirname, './styles');
const pathJoinBundle = path.join(__dirname, 'project-dist', './bundle.css');

const fs = require('fs');

async function joinFilesToOneBundle() {
  try {
    let array = [];
    let fileState = [];
    let streamWriteFile = fs.createWriteStream(pathJoinBundle);

    const files = await fs.promises.readdir(pathJoinStyles, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(__dirname, './styles', file.name);

      if (file.isFile() && (path.extname(file.name) === '.css')) {
        fileState.push(file.name);
        let streamReadFile = fs.createReadStream(filePath);

        streamReadFile.on('readable', function () {
          let data = streamReadFile.read();
          if (data != null) {
            array.push(data.toString());
          }
        });

        streamReadFile.on('end', () => {
          let index = fileState.indexOf(file.name);
          fileState.splice(index, 1);
          if (fileState.length === 0) {
            streamWriteFile.write(array.join('\n'));
          }
        });
      }
    }

  } catch (err) {
    console.error(err.message);
  }
}

joinFilesToOneBundle();
