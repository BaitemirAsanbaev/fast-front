const commander = require("commander");
const fs = require("fs");
const path = require("path");

const program = new commander.Command();

program
  .command("create <title>")
  .option("-h, --header", "Include an H1 header in the content")
  .action((title, options) => {
    const folderPath = path.join(__dirname, "pages");

    // Check if the "pages" folder exists; if not, create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const jsxFileName = `${title}Page.jsx`;
    const jsxFilePath = path.join(folderPath, jsxFileName);

    let jsxContent = `import classes from './${title}Page.module.scss';\n\n`;
    jsxContent += `export default function ${title}Page() {\n`;
    jsxContent += `  return (\n`;
    jsxContent += `    <div className={classes.${title}Page}>\n`;
    if (options.header) {
      jsxContent += `      <h1>${title}</h1>`;
    } else {
      jsxContent += `      ${title}Page`;
    }

    jsxContent += `\n    </div>\n  );\n}\n`;

    const scssFileName = `${title}Page.module.scss`;
    const scssFilePath = path.join(folderPath, scssFileName);
    const scssContent = `.${title}Page {
  display:flex;
  flex-direction:column;
  align-items:center;
}`;

    fs.writeFile(jsxFilePath, jsxContent, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Created ${jsxFileName} in the "pages" folder.`);
    });

    fs.writeFile(scssFilePath, scssContent, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Created ${scssFileName} in the "pages" folder.`);
    });
  });

program.parse(process.argv);
