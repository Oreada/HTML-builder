const path = require('path');

const fs = require('fs/promises');

fs.rm(path.join(__dirname, './files-copy'), { recursive: true, force: true });

async function copyDir(pathDirSource, pathDirToCopy) {
  try {
    const collection = await fs.readdir(pathDirSource, { withFileTypes: true });

    await fs.mkdir(pathDirToCopy, { recursive: true });

    for (let file of collection) {
      let mySource = path.join(pathDirSource, `./${file.name}`);
      let myCopy = path.join(pathDirToCopy, `./${file.name}`);
      if (file.isDirectory()) {
        copyDir(mySource, myCopy);
      } else {
        await fs.copyFile(mySource, myCopy);
      }
    }

  } catch (err) {
    console.error(err.message);
  }
}

const pathSource = path.join(__dirname, './files');
const pathToCopy = path.join(__dirname, './files-copy');
copyDir(pathSource, pathToCopy);
