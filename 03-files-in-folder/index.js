const path = require('path');
const pathJoin = path.join(__dirname, './secret-folder');

const fs = require('fs/promises');

async function readDir() {
  try {
    const files = await fs.readdir(pathJoin, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(__dirname, './secret-folder', file.name);
      const fileNamePure = path.parse(filePath).name;
      const stat = await fs.stat(filePath);

      if (file.isFile()) {
        process.stdout.write(`${fileNamePure} - ${path.extname(file.name).slice(1)} - ${stat.size}b\n`);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

readDir();
