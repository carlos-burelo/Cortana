import { Cortana } from '@context';
import { log } from '@libs/messages';
import { buttonBuilder } from '@libs/buttons';
import { getLocales } from '@libs/locales';

export async function langsCmd(ctx: Cortana) {
  try {
    const { global: _ } = await ctx.lang();
    const locales = await getLocales();
    const langs = locales.map(({ code, id, flag }) => {
      return {
        text: `${flag} ${id}`,
        callback_data: `lang_${code}`,
      };
    });
    const buttons = buttonBuilder(langs, 2);
    ctx.replyWithMarkdown(_.chooseLang(langs.length), {
      reply_markup: buttons,
    });
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, l, f: 'langsCmd()' });
  }
}
