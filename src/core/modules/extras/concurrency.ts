import { CURRENCY_API } from '@config';
import { Cortana } from '@context';
import { log } from '@libs/messages';
import { request } from '@libs/request';

export async function ccCmd(ctx: Cortana) {
  try {
    const { extras: _ } = await ctx.lang();
    let msg: string[] = ctx.message.text.split(' ');
    let base: number = parseInt(msg[1]);
    if (!base) return ctx.reply(_.noBaseFound);
    if (isNaN(base)) return ctx.reply(_.baseIsNaN);
    let orig: string = msg[2].toUpperCase();
    if (!orig) return ctx.reply(_.origNotFound);
    let dest: string = msg[3].toUpperCase();
    if (!dest) return ctx.reply(_.destNotFound);
    if (orig == 'VES' || dest == 'VES') return ctx.reply('Demasidos ceros para contar');
    const data = await request(CURRENCY_API({ orig, dest }));
    let json: number = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    let current_date: number = Math.round(json * base);
    ctx.replyWithMarkdown(`${base} ${orig} = ${current_date.toString()} ${dest}`, {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: 'ccCmd()' });
  }
}
