import { Cortana } from '../../../context';
import { log } from '../../libs/messages';
export async function mdv2Cmd(ctx: Cortana) {
  try {
    const text: string = ctx.msg.reply_to_message.text;
    if (!text) return ctx.reply('No text detect');
    ctx.replyWithMarkdownV2(text).catch(() => {
      ctx.reply('Ha occurrido un error al tratar de parsear el texto');
    });
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/);
    log({ ctx, error, __filename, l, f: '' });
  }
}

export const mdv2Help =
  `*Bold*\n` +
  `\`Inline code\`\n` +
  `_Italic_\\| *_Italic bold_*\n` +
  `__underline__    \\| *__Underline bold__* \n` +
  `~Strikethrough~  \\| *~Strikethrough bold~*\n` +
  `[URL](http://www.example.com/) \\| *[URL bold](http://www.example.com/)*\n` +
  `\`\`\`typescript
import { Cortana } from '../context';
\`\`\``;
