import axios from "axios";
import { resolve } from "path";
import { unlinkSync } from "fs";
import { Context } from "telegraf";
import { StickerSet } from "telegraf/typings/core/types/typegram";
import { mainDir, _apis, _bot } from "../../config";
import { getLang } from "../../lang";
import { ChatUserI, NoteI } from "../interfaces";
import { downloadFile, resizeImage } from "../libs/files";
import { detectMsgFormat, editMessage, generateLog } from "../libs/messages";
import { createButtons, extractButtons } from "../libs/buttons";

export async function getIdFromFile(ctx: Context | any) {
	try {
		const _ = getLang(ctx.chat);
		let reply = ctx.message.reply_to_message;
		let { content, type } = detectMsgFormat(reply);
		if (type == "text") {
			return ctx.reply(_.global.errorInFormat);
		}
		let formated: string = `*Type:* _${type}_\n\n` + `*Id:* \`${content}\``;
		return ctx.replyWithMarkdown(formated);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "getIdFromFile", __filename);
	}
}

export async function getCurrency(
	ctx: Context,
	orig: string,
	dest: string,
	base: number,
) {
	try {
		try {
			const res = await axios.get(_apis.currency({ orig, dest }));
			let response: number =
				res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
			let current_date: number = Math.round(response * base);
			ctx.replyWithMarkdown(
				`${base} ${orig} = ${current_date.toString()} ${dest}`,
				{ reply_to_message_id: ctx.message.message_id },
			);
		} catch (error) {
			ctx.reply("Datos inconrrectos");
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "getCurrency", __filename);
	}
}

export async function kangSticker(
	ctx: Context,
	user: ChatUserI,
	reply: NoteI,
	emoji?: string,
) {
	const { extrasModule: _ } = getLang(ctx.chat);
	try {
		let packNumber: number = 1;
		let packName: string = `${user.first_name}_v${packNumber}_by_${_bot.username}`;
		let PackTitle = `${user.first_name} Kang Pack V${packNumber}`;
		let fileId: string = reply.content;
		let maxStickers = 120;
		let existPack: StickerSet;
		let isAnimated: boolean = false;
		try {
			let pack = await ctx.getStickerSet(packName);
			if (pack.stickers.length == maxStickers) {
				packName = `${user.first_name}_v${packNumber++}_by_${
					_bot.username
				}`;
			} else {
				existPack = pack;
			}
		} catch (e) {
			existPack = undefined;
		}
		if (reply.is_animated == true) {
			isAnimated = true;
		}
		let fileName: string;
		let defaultEmoji: string = "👻";
		if (emoji) {
			defaultEmoji = emoji;
		}
		const { message_id: id } = await ctx.replyWithMarkdown(
			_.kangProcess[0],
		);
		let { href: fileUrl }: URL = await ctx.telegram.getFileLink(fileId);
		if (isAnimated == false) {
			fileName = `${user.id}-kangsticker.png`;
		} else {
			fileName = `${user.id}-kangsticker.tgs`;
		}
		if (isAnimated == true) {
			return await editMessage(ctx, id, _.kangFormatError);
		}
		let fileDir: string = resolve(mainDir, "assets", "downloads", fileName);
		await editMessage(ctx, id, _.kangProcess[1]);
		await downloadFile(fileUrl, fileDir);
		if (reply.type == "photo") {
			await editMessage(ctx, id, _.kangProcess[2]);
			let image = await resizeImage(fileDir);
			await image.writeAsync(fileDir);
		}
		await editMessage(ctx, id, _.kangProcess[3]);
		if (existPack) {
			await ctx
				.addStickerToSet(packName, {
					png_sticker: { source: fileDir },
					emojis: defaultEmoji,
				})
				.catch((e) => {
					return ctx.reply(_.errorAddPack);
				});
		} else {
			await ctx
				.createNewStickerSet(packName, PackTitle, {
					png_sticker: { source: fileDir },
					emojis: defaultEmoji,
				})
				.catch((e) => {
					return ctx.reply(_.errorCreatePack);
				});
		}
		unlinkSync(fileDir);
		return editMessage(ctx, id, _.finish(packName));
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "kangSticker", __filename);
	}
}

export async function deleteSticker(ctx: Context, id: string) {
	try {
		const _ = getLang(ctx.chat);
		await ctx.deleteStickerFromSet(id);
		return ctx.reply(_.extrasModule.deleteSticker);
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "deleteSticker", __filename);
	}
}

export function parseMarkdown(
	ctx: Context,
	text: string,
	preview: boolean,
	cols: number,
) {
	try {
		if (text.includes("&noweb") == true) {
			preview = true;
			text = text.replace("&noweb", "").trim();
		}
		let matchCols: string[] = text.match(/&cols:\d/);
		if (matchCols !== null) {
			let c: string = matchCols[0].replace("&cols:", "");
			text = text.replace(matchCols[0], "");
			cols = parseInt(c);
		}
		const b = extractButtons(text);
		if (b !== undefined) {
			text = b.text.trim();
			return ctx.replyWithMarkdown(text, {
				reply_markup: createButtons(b.buttons, cols),
				disable_web_page_preview: preview,
			});
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "parseMarkdown", __filename);
	}
}
