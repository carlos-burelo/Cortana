import { Telegraf } from 'telegraf';
import { getModule, searchModule } from '../controllers/npm.controller';
import { errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('/npm', async (ctx) => {
    try {
      if (ctx.message.text.includes('?')) {
        let query: string = ctx.message.text.replace('/npm?', '').trim();
        return await searchModule(ctx, query);
      } else {
        let query = ctx.message.text.replace('/npm', '').trim();
        return await getModule(ctx, query);
      }
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/npm', l });
    }
  });
}
