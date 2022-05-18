const path = require('path');
const fs = require('fs/promises');

const pathSource = path.join(__dirname, './files');
const pathToCopy = path.join(__dirname, './files-copy');

async function copyDir(pathDirSource, pathDirToCopy) {
  try {
    await fs.rm(pathDirToCopy, { recursive: true, force: true });
    await fs.mkdir(pathDirToCopy, { recursive: true });

    const collection = await fs.readdir(pathDirSource, { withFileTypes: true });

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

copyDir(pathSource, pathToCopy);
