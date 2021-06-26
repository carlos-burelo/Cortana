import axios from "axios";
import { _apis } from "../../config";
import { Telegraf } from "telegraf";
import {
	getTWRP,
	getFirmware,
	getMagisk,
} from "../controllers/android.controller";
import { getLang } from "../../lang";

export default function (bot: Telegraf) {
	bot.command("/magisk", async (ctx) => {
		await getMagisk(ctx);
	});
	bot.command("/fw", async (ctx) => {
		const _ = getLang(ctx.chat);
		let msg: string[] = ctx.update.message.text.split(" ");
		let model: string = msg[1];
		if (!model) {
			return ctx.reply(_.androidModule.noModel);
		}
		model.match(/SM-/i) ? (model = model.replace(/SM-/i, "")) : model;
		model = model.toUpperCase();
		let csc: string = msg[2];
		if (!csc) {
			return ctx.reply(_.androidModule.noCsc);
		}
		csc = csc.toUpperCase();
		await getFirmware(ctx, model, csc);
	});
	bot.command("/twrp", async (ctx) => {
		const _ = getLang(ctx.chat);
		let device = ctx.message.text.split(" ")[1];
		if (!device) {
			return ctx.reply(_.androidModule.noModel);
		}
		await getTWRP(ctx, device);
	});
}
