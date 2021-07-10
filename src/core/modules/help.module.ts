import { Telegraf } from "telegraf";
import { getLang } from "../../lang";
import { createButtons } from "../libs/buttons";
import { editMessage, generateLog } from "../libs/messages";

export default function (bot: Telegraf) {
	const {
		helpModule: { modules: $ },
	} = getLang({ id: "main" });
	bot.command("/help", async (ctx) => {
		try {
			const {
				helpModule: { message },
			} = getLang(ctx.chat);
			let btns = $.sort((a, b) => (a.text < b.text ? -1 : 1));
			ctx.replyWithMarkdown(message, {
				reply_markup: createButtons(btns, 3),
			});
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "/help", __filename);
		}
	});
	bot.action(
		$.map((a) => a.callback),
		async (ctx) => {
			try {
				const _ = getLang(ctx.chat);
				let { data: query }: any = ctx.callbackQuery;
				let msgId: number = ctx.callbackQuery.message.message_id;
				let { content } = _.helpModule.modules.find(
					(m) => m.callback == query,
				);
				let back = createButtons(
					[{ text: "Back", callback: "help_back" }],
					1,
				);
				await editMessage(ctx, msgId, content, back, "HTML");
			} catch (error) {
				const [, l, c] = error.stack.match(/(\d+):(\d+)/);
				generateLog(ctx, error, [l, c], `Callback: module`, __filename);
			}
		},
	);
	bot.action("help_back", async (ctx) => {
		try {
			const _ = getLang(ctx.chat);
			let msgId: number = ctx.update.callback_query.message.message_id;
			let btns = _.helpModule.modules.sort((a, b) =>
				a.text < b.text ? -1 : 1,
			);
			const {
				helpModule: { message },
			} = getLang(ctx.chat);
			editMessage(ctx, msgId, message, createButtons(btns, 3));
		} catch (error) {
			const [, l, c] = error.stack.match(/(\d+):(\d+)/);
			generateLog(ctx, error, [l, c], "help_back", __filename);
		}
	});
}
