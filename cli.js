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
const moduleIndexPath = (name) => join(__dirname, 'src', 'core', 'modules', name, 'index.ts');
const modulePath = (name) => join(__dirname, 'src', 'core', 'modules', name);
const commandPath = (module, command) =>
  join(__dirname, 'src', 'core', 'modules', module, `${command}.ts`);
const regexGetContentModule = /Bot<Cortana>\)\s{([^]+)}\s\/\/\s\w+\s\w+/;

/**
 * Create module and command(only exist)
 * @param {string} $module Module name
 * @param {string} [$command] Command name [optional]
 */
const createModule = ($module) => {
  // si existe algun comando

  if (existsSync(moduleIndexPath($module))) {
    return console.error(`The ${$module} already exists`);
  }
  // Creating module folder and index.ts file
  mkdirSync(modulePath($module), { recursive: true });
  writeFileSync(moduleIndexPath($module), indexNewFile($module), { encoding: 'utf-8' });
};
/**
 * @param {string} $module Module name
 * @param {string} $command Command name [optional]
 */
const createCommand = ($module, $command) => {
  if (!existsSync(moduleIndexPath($module)) || !existsSync(modulePath($module))) {
    createModule($module);
  } else {
    const currendData = readFileSync(moduleIndexPath($module), 'utf-8');
    const match = currendData.match(regexGetContentModule);
    if (!match || match == null) return console.error('ERROR IN MATCH COMMANDS');
    const currentsCommands = match[1];
    if (currentsCommands.length < 10) {
      const newData = insertInEmptyIndex(currendData, $module, $command);
      writeFileSync(moduleIndexPath($module), newData, 'utf-8');
    } else {
      const newCommands = addNewCommand(currentsCommands, $command);
      const newData = currendData.replace(currentsCommands, newCommands);
      writeFileSync(moduleIndexPath($module), newData, 'utf-8');
    }
    writeFileSync(commandPath($module, $command), commandFileTemplate($command), 'utf-8');
  }
};
const insertInEmptyIndex = (data, $module, $command) => {
  const newData = data.replace(
    empytIndexModule($module),
    empytIndexTemplate($module, commandTemplate($command))
  );
  return newData;
};

// TEMPLATES
const indexNewFile = (name) =>
  `
import { Bot } from 'grammy';
import { Cortana } from '../../../context';
import { helpExist } from '../../libs/messages';

export default function ${name}Module(bot: Bot<Cortana>) {\n
} // ${name} module
`;
const empytIndexTemplate = (name, data) =>
  `export default function ${name}Module(bot: Bot<Cortana>) {\n
    ${data}
} // ${name} module`;
const empytIndexModule = (name) =>
  `export default function ${name}Module(bot: Bot<Cortana>) {\n
} // ${name} module`;
const commandFileTemplate = (cmd) =>
  `import { Cortana } from "../../../context";
import { log } from "../../libs/messages";
export async function ${cmd}Cmd(ctx: Cortana) {
    try {
        return ctx.reply('${cmd} Works');
    } catch (error) {
        const [l] = error.stack.match(/(\d+):(\d+)/);
        log({ctx,error,__filename,l, f:''})
    }
}

export const ${cmd}Help = \`Help for *${cmd}* command\`
`;
const commandTemplate = (cmd) =>
  `\nbot.command('${cmd}', async (ctx) => {
const { ${cmd}Cmd, ${cmd}Help } = await import('./${cmd}');
    if (helpExist(ctx.msg.text)) return ctx.replyWithMarkdownV2(${cmd}Help);
    return await ${cmd}Cmd(ctx);
  });`;
const addNewCommand = (currents, cmd) =>
  currents.replace(currents, (currents += commandTemplate(cmd)));

if (_.module && _.cmd) {
  console.log('Generating command and module ...');
  return createCommand(_.module, _.cmd);
}
if (_.cmd && !_.module) {
  return console.error('Error module is missing');
}

if (_.module) {
  console.log('Generating module ....');
  return createModule(_.module, _.cmd);
}
