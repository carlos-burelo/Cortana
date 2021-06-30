"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const buttons_1 = require("../libs/buttons");
const messages_1 = require("../libs/messages");
function default_1(bot) {
    const { helpModule: { modules: $ } } = lang_1.getLang({ id: 'main' });
    bot.command('/help', async (ctx) => {
        const { helpModule: { message } } = lang_1.getLang(ctx.chat);
        let btns = $.sort((a, b) => a.text < b.text ? -1 : 1);
        ctx.replyWithMarkdown(message, {
            reply_markup: buttons_1.createButtons(btns, 3)
        });
    });
    bot.action($.map(a => a.callback), async (ctx) => {
        let { data: query } = ctx.callbackQuery;
        let msgId = ctx.callbackQuery.message.message_id;
        let { content } = $.find(m => m.callback == query);
        let back = buttons_1.createButtons([{ text: 'Back', callback: 'help_back' }], 1);
        await messages_1.editMessage(ctx, msgId, content, back, 'HTML');
    });
    bot.action("help_back", async (ctx) => {
        let msgId = ctx.update.callback_query.message.message_id;
        let btns = $.sort((a, b) => a.text < b.text ? -1 : 1);
        const { helpModule: { message } } = lang_1.getLang(ctx.chat);
        messages_1.editMessage(ctx, msgId, message, buttons_1.createButtons(btns, 3));
    });
}
exports.default = default_1;
