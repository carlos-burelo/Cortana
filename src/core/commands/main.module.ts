import { Telegraf } from 'telegraf';
import { main } from '../../database';
import { singIn } from '../controllers/main.controller';
import { log } from '../libs/messages';
import _ from '../locales/en';

export default function (bot: Telegraf) {
  bot.command('join', async (ctx) => {
    try {
      singIn(ctx, ctx.from.id);
      ctx.reply(_.global.pendingRequest);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/apply', l });
    }
  });
  bot.action(/join:.+/g, (ctx) => {
    let { data }: any = ctx.callbackQuery;
    let query = data.replace(/join:/g, '');
    let found = main().get('whitelist').find(parseInt(query)).value();
    if (!found || found == undefined) {
      main().get('whitelist').push(parseInt(query)).write();
      ctx.reply('Approved account');
      return ctx.telegram.sendMessage(query, `\`${_.global.requestApproved}\``, {
        parse_mode: 'Markdown'
      });
    }
  });
  bot.action(/decline:.+/g, (ctx) => {
    let { data }: any = ctx.callbackQuery;
    let id: number = parseInt(data.replace(/decline:/g, ''));
    ctx.reply('Account Denied');
    return ctx.telegram.sendMessage(id, `\`${_.global.requestDenied}\``, {
      parse_mode: 'Markdown'
    });
  });
}
