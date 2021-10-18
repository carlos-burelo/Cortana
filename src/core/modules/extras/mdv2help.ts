import { Cortana } from "../../../context";

export async function md2helpCmd(ctx: Cortana) {
    const mdv2Help =
        `*Bold*\n` +
        `\`Inline code\`\n` +
        `_Italic_\\| *_Italic bold_*\n` +
        `__underline__    \\| *__Underline bold__* \n` +
        `~Strikethrough~  \\| *~Strikethrough bold~*\n` +
        `[URL](http://www.example.com/) \\| *[URL bold](http://www.example.com/)*\n` +
        `\`\`\`typescript` +
        `import { Cortana } from '../context';` +
        `\`\`\``;
    return ctx.replyWithMarkdownV2(mdv2Help)
}