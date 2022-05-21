const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const path = require('path');
const pathJoinTemplate = path.join(__dirname, './template.html');
const pathJoinComponents = path.join(__dirname, './components');
const pathJoinProject = path.join(__dirname, './project-dist');
const pathJoinIndexHtml = path.join(pathJoinProject, './index.html');

async function createHtmlWithInsertComponents() {
  await fs.promises.mkdir(pathJoinProject, { recursive: true });
  await fs.promises.writeFile(pathJoinIndexHtml, '', 'utf-8');

  const inStream = fs.createReadStream(pathJoinTemplate);
  const outStream = new stream;
  const rl = readline.createInterface(inStream, outStream);  // line-by-line reading './template.html'

  const files = await fs.promises.readdir(pathJoinComponents, { withFileTypes: true });

  let lines = [];
  rl.on('line', async function (line) {
    lines.push(line);
  });

  rl.on('close', async function () {
    for (let line of lines) {
      let templateValue = line;
      let indexFirst = line.indexOf('{{');
      let indexLast = line.indexOf('}}');

      if (indexFirst == -1 || indexLast == -1) {
        await fs.promises.appendFile(pathJoinIndexHtml, templateValue + '\n', 'utf-8');
      } else {
        let nameFileComponent = line.slice(indexFirst + 2, indexLast);  // header||footer||articles||about...
        for (const file of files) {

          const filePath = path.join(__dirname, './components', file.name);
          const fileNamePure = path.parse(filePath).name;  // name without extension
          if ((nameFileComponent === fileNamePure) && (file.isFile()) && (path.extname(file.name) === '.html')) {
            let regExp = new RegExp(`{{${nameFileComponent}}}`, 'g');
            let componentHtml = await fs.promises.readFile(filePath, 'utf-8');
            templateValue = templateValue.replace(regExp, componentHtml);
            await fs.promises.appendFile(pathJoinIndexHtml, templateValue + '\n', 'utf-8');
            break;
          }
        }
      }
    }
  });
}

createHtmlWithInsertComponents();
