import { Telegraf } from "telegraf";
import { getLang } from "../../lang";
import { createButtons } from "../libs/buttons";
import { editMessage } from "../libs/messages";

export default function (bot: Telegraf) {
    const { helpModule: { modules: $ } } = getLang({ id: 'main' })
    bot.command('/help', async (ctx) => {
        const { helpModule: {message} } = getLang(ctx.chat);
        let btns = $.sort((a, b) => a.text < b.text ? -1 : 1);
        ctx.replyWithMarkdown(message, {
            reply_markup: createButtons(btns, 3)
        });
    });
    bot.action($.map(a => a.callback), async (ctx) => {
        let { data: query }: any = ctx.callbackQuery
        let msgId: number = ctx.callbackQuery.message.message_id
        let { content } = $.find(m => m.callback == query);
        let back = createButtons([{ text: 'Back', callback: 'help_back' }], 1)
        await editMessage(ctx, msgId, content, back, 'HTML')
    });
    bot.action("help_back", async (ctx) => {
        let msgId: number = ctx.update.callback_query.message.message_id;
        let btns = $.sort((a, b) => a.text < b.text ? -1 : 1);
        const { helpModule: {message} } = getLang(ctx.chat);
        editMessage(ctx,msgId,message, createButtons(btns, 3) )
    });
}