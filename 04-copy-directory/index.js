const path = require('path');
// const pathFiles = path.join(__dirname, './files');

const fs = require('fs/promises');

// async function practice(pathDir) {
//   try {
//     console.log('dir=' + pathDir);
//     const collection = await fs.readdir(pathDir, { withFileTypes: true });
//     for (let file of collection) {
//       if (file.isDirectory()) {
//         let myPath = path.join(pathDir, `./${file.name}`);
//         practice(myPath);
//       } else {
//         console.log(path.join(pathDir, `./${file.name}`));
//       }
//     }

//   } catch (err) {
//     console.error(err.message);
//   }
// }

// const pathFiles = path.join(__dirname, './files');
// practice(pathFiles);


// async function removeDir() {
//   try {
//     await fs.rm(path.join(__dirname, './files-copy'), { recursive: true, force: true });
//   } catch (err) {
//     console.error(err.message);
//     //console.log('Dumb error');
//   }
// }

// removeDir();

fs.rm(path.join(__dirname, './files-copy'), { recursive: true, force: true });
// fs.rm(path.join(__dirname, './files-copy'), { recursive: true, force: true }, () => { });

async function copyDir(pathDirSource, pathDirToCopy) {
  try {
    const collection = await fs.readdir(pathDirSource, { withFileTypes: true });

    //await makeDir(pathDirToCopy);
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

// async function makeDir(d) {
//   //const d = path.join(__dirname, dest);
//   // console.log('d=' + d);

//   fs1.access(d, fs1.constants.F_OK, (err) => {
//     if (err) {
//       fs.mkdir(d);
//     } else {
//       fs.rm(d, { recursive: true, force: true });
//     }
//   });
// }

const pathSource = path.join(__dirname, './files');
const pathToCopy = path.join(__dirname, './files-copy');
copyDir(pathSource, pathToCopy);
