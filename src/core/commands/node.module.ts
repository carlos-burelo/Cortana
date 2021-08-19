import { Telegraf } from 'telegraf';
import os from 'os';
import { log } from '../libs/messages';
import { OWNER_ID } from '../../config';
import { lang } from '../../database';
import { exectBash, fetch } from '../controllers/node.controller';

export default function (bot: Telegraf) {
  bot.command('os', async (ctx) => {
    try {
      ctx.replyWithHTML(
        `<b>Platform:</b>  <i>${os.platform()}</i>\n` +
          `<b>Type:</b>  <i>${os.type()}</i>\n` +
          `<b>Arch:</b>  <i>${os.arch()}</i>\n` +
          `<b>Release:</b>  <i>${os.release()}</i>\n` +
          `<b>Total Memory</b>  <i>${Math.round(
            os.totalmem() / 1024 / 1024 / 1024
          ).toString()} GB</i>\n` +
          `<b>Username:</b>  <i>${os.userInfo().username}</i>\n`
      );
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/os', l });
    }
  });
  bot.command('sh', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.message.from.id !== OWNER_ID) {
        return ctx.reply(_.global.permissionsDenied);
      }
      let cmd = ctx.message.text.replace(/\/sh\s?/, '');
      if (!cmd || cmd.length < 1) {
        return ctx.reply(_.nodeModule.cmdError);
      }
      await exectBash(ctx, cmd);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/sh', l });
    }
  });
  bot.command('fetch', async (ctx) => {
    try {
      const _ = lang(ctx);
      let url: string = ctx.message.text.replace(/\/fetch\s?/, '');
      if (url.length == 0) {
        return ctx.reply(_.nodeModule.noUrl);
      }
      let regex: RegExp = /\http[s]?:\/\/.+?/gim;
      if (url.match(regex)[0] == null) {
        return ctx.reply(_.nodeModule.invalidUrl);
      }
      await fetch(ctx, url);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/fetch', l });
    }
  });
  bot.command('download', async (ctx) => {});
}
