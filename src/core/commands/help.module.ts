import { Telegraf } from 'telegraf';
import { isAllowed, noAccess, lang } from '../../database';
import { createButtons } from '../libs/buttons';
import { editMessage, log } from '../libs/messages';

export default async function (bot: Telegraf) {
  const {
    helpModule: { modules: $ }
  } = lang('en');
  bot.command('help', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const { helpModule: _ } = lang(ctx);
      let btns = _.modules.sort((a, b) => (a.text < b.text ? -1 : 1));
      ctx.replyWithMarkdown(_.message, {
        reply_markup: createButtons(btns, 3)
      });
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/help', l });
    }
  });

  bot.action(
    $.map((a) => a.callback),
    async (ctx) => {
      if (!isAllowed(ctx)) {
        return ctx.replyWithMarkdownV2(noAccess);
      }
      try {
        const _ = lang(ctx);
        let { data: query }: any = ctx.callbackQuery;
        let msgId: number = ctx.callbackQuery.message.message_id;
        let { content } = _.helpModule.modules.find((m) => m.callback == query);
        let back = createButtons([{ text: 'Back', callback: 'help_back' }], 1);
        await editMessage({ ctx, id: msgId, text: content, keyboard: back, mode: 'HTML' });
      } catch (error) {
        const [l] = error.stack.match(/(\d+):(\d+)/);
        log({ ctx, error, __filename, f: '/help', l });
      }
    }
  );
  bot.action('help_back', async (ctx) => {
    try {
      const _ = lang(ctx);
      let msgId: number = ctx.update.callback_query.message.message_id;
      let btns = _.helpModule.modules.sort((a, b) => (a.text < b.text ? -1 : 1));
      const {
        helpModule: { message }
      } = lang(ctx);
      await editMessage({ ctx, id: msgId, text: message, keyboard: createButtons(btns, 3) });
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      log({ ctx, error, __filename, f: '/help', l });
    }
  });
}
