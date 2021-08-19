import translate from '@vitalets/google-translate-api';
import { Context } from 'telegraf';
import { log } from '../libs/messages';

export async function translateText(ctx: Context, lang: string, txt: string): Promise<string> {
  try {
    const { text } = await translate(txt, { to: lang });
    return text;
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'traslateText()', l });
  }
}
