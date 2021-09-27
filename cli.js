const { program } = require('commander');
const { existsSync, writeFileSync, mkdirSync, readFileSync } = require('fs');
const { join } = require('path');

program
  .option('-c, --cmd [name]', 'Generate new command')
  .option('-m, --module [name]', 'Generate new module')
  .option('-l, --locale [code]', 'Generate new translation file');

program.parse(process.argv);

const _ = program.opts();
const localesPath = join(__dirname, 'src', 'core', 'locales');
const modulesPath = join(__dirname, 'src', 'core', 'modules');
const moduleIndexPath = ($module) =>
  join(__dirname, 'src', 'core', 'modules', $module, 'index.ts');
const modulePath = ($module) =>
  join(__dirname, 'src', 'core', 'modules', $module);
const commandPath = ($module, $cmd) =>
  join(__dirname, 'src', 'core', 'modules', $module, `${$cmd}.ts`);
const regexGetContentModule = /\>\)\s{([^]+?)}?$/;
const regexImportIndex = /import\s{[^]+}\sfrom\s["'][^]+["'];/;

const newModuleTemplate = ($module, $cmd) =>
  `import { Bot } from 'grammy';\n` +
  `import { Cortana } from '../../../context';\n` +
  `${$cmd ? newCmdImport($cmd) : ''}\n` +
  `export default function ${$module}Module(bot: Bot<Cortana>) {${
    $cmd ? newCmdTemplate($cmd) : ''
  }}`;

const newCmdTemplate = ($cmd) =>
  `\n\tbot.command('${$cmd}', async (ctx) => {\n` +
  `\t\tif (ctx.help) return ctx.replyWithMarkdownV2(${$cmd}Help);\n` +
  `\t\treturn await ${$cmd}Cmd(ctx);\n` +
  `\t});\n`;
const newCmdImport = ($cmd) =>
  `\nimport { ${$cmd}Cmd, ${$cmd}Help } from './${$cmd}';`;

const newCmdFileTemplate = ($cmd) =>
  `import { Cortana } from '../../../context';\n` +
  `import { log } from '../../libs/messages';\n` +
  `\nexport async function ${$cmd}Cmd(ctx: Cortana) {\n` +
  `\ttry {\n` +
  `\t} catch (error) {\n` +
  `\t\tconst [l] = error.stack.match(/(d+):(d+)/);\n` +
  `\t\tlog({ ctx, error, __filename, l, f: '${$cmd}Cmd()' });\n` +
  `\t}\n` +
  `}\n\n` +
  `export const ${$cmd}Help = \`Help for *${$cmd}* command\`;`;

function createModule($module, $cmd) {
  if (!existsSync(moduleIndexPath($module))) {
    mkdirSync(modulePath($module)); // Creating module folder
    const data = newModuleTemplate($module, $cmd); // Generating index data
    writeFileSync(moduleIndexPath($module), data, 'utf-8'); // Creating index data
    const data2 = newCmdFileTemplate($cmd); // Generating module file data
    writeFileSync(commandPath($module, $cmd), data2, 'utf-8'); // Creating module file
  } else {
    const data = readFileSync(moduleIndexPath($module), 'utf-8');
    const match = data.match(regexImportIndex);
    let currentImports;
    if (match !== null) {
      currentImports = match[0];
      currentImports += newCmdImport($cmd);
    }
    if (data.includes(`${$cmd}Cmd`)) {
      return console.log('The command ', $cmd, ' already exists');
    }
    const match2 = data.match(regexGetContentModule);
    let currentsCommands;
    if (match2 !== null) {
      currentsCommands = match2[1].replace(/}\);\n?}/, '});');
      currentsCommands += newCmdTemplate($cmd);
      currentsCommands += '\n}';
    }
    const newData = data
      .replace(match[0], currentImports)
      .replace(match2[1], currentsCommands);
    writeFileSync(moduleIndexPath($module), newData, 'utf-8');
    writeFileSync(
      commandPath($module, $cmd),
      newCmdFileTemplate($cmd),
      'utf-8'
    );
  }
}

if (!_.cmd || !_.module) {
  return console.error('Error module is missing');
} else {
  console.log('Generating module ....');
  return createModule(_.module, _.cmd);
}
