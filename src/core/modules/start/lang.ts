import { Cortana } from '@context';
import { getLocales } from '@libs/locales';
import { log } from '@libs/messages';
import { updateLang } from '@sql/index';

export async function langCmd(ctx: Cortana) {
  try {
    const { global: _ } = await ctx.lang();
    let code: string;
    if (!ctx.callbackQuery) {
      // from command
      code = ctx.params[0];
      const locales = await getLocales();
      const localeExist = locales.find((l) => l.code === code);
      if (!localeExist) return ctx.reply(_.codeLangError);
    } else {
      // from button
      code = ctx.callbackQuery.data.split('_')[1];
    }
    if (!code || code.length < 2) return ctx.reply(_.argsNotFound);
    await updateLang(code, ctx.chat.id);
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'langCmd()' });
  }
}
