import { Telegraf } from 'telegraf';
import { lang } from '../../database';
import { getFilter, getFilters, setFilter, stopFilter } from '../controllers/fiters.controller';
import { FilterI } from '../types';
import { matchMessage, log } from '../libs/messages';

export default async function (bot: Telegraf) {
  bot.command('filter', async (ctx) => {
    try {
      const _ = lang(ctx);
      let word: string[] | string = ctx.message.text.match(/![^\s]+/gi);
      if (!word) {
        ctx.reply(_.filterModule.noFilterKey);
        return;
      }
      word = word[0].replace(/!/g, '');
      if (!ctx.message.reply_to_message) {
        let text: string = ctx.message.text;
        let regex: RegExp = /(\".*?")/gi;
        let match: string[];
        let filters: string[] = [];
        while ((match = regex.exec(text)) !== null) {
          filters.push(match[1].replace(/"/g, ''));
        }
        if (filters.length == 0) {
          ctx.reply(_.filterModule.setRespFilter);
          return;
        }
        let newFilter: FilterI = {
          id: word,
          type: 'text',
          strings: filters
        };
        await setFilter(ctx, newFilter);
      } else {
        let reply: any = ctx.message.reply_to_message;
        let { content, type } = matchMessage(reply);
        let newFilter: FilterI = {
          id: word,
          type,
          content
        };
        await setFilter(ctx, newFilter);
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/filter', l });
    }
  });
  bot.command('filterinfo', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      let filter: string = ctx.message.text.replace(/\/filterinfo/, '').trim();
      await getFilter(ctx, filter);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/filterinfo', l });
    }
  });
  bot.command('filters', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      await getFilters(ctx);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/filters', l });
    }
  });
  bot.command('stop', async (ctx) => {
    try {
      const _ = lang(ctx);
      if (ctx.chat.type == 'private') {
        return ctx.reply(_.global.noPrivateChat);
      }
      let filter: string = ctx.message.text.split(' ')[1];
      stopFilter(ctx, filter);
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/stop', l });
    }
  });
}
