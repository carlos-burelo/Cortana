import { Context } from "telegraf";
import { FilterI } from "../../../src/core/interfaces";
import { db } from "../../database";
import { getLang } from "../../lang";
import { generateLog } from "../libs/messages";

export async function setFilter(ctx: Context, newFilter: FilterI) {
	const _ = getLang(ctx.chat);
	try {
		let data = db(ctx.chat)
			.get("filters")
			.find({ id: newFilter.id })
			.value();
		if (data == undefined) {
			db(ctx.chat).get("filters").push(newFilter).write();
			ctx.replyWithMarkdown(_.filterModule.filterSaved(newFilter.id));
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "setFilter", __filename);
	}
}
export async function stopFilter(ctx: Context, filter: string) {
	const _ = getLang(ctx.chat);
	try {
		let data = db(ctx.chat).get("filters").find({ id: filter }).value();
		if (data == undefined) {
			return ctx.replyWithMarkdown(_.filterModule.noFoundFilter(filter));
		} else {
			db(ctx.chat).get("filters").remove({ id: filter }).write();
			ctx.replyWithMarkdown(_.filterModule.removedFilter(filter));
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "stoptFilter", __filename);
	}
}
export async function getFilters(ctx: Context) {
	const _ = getLang(ctx.chat);
	try {
		let filters = db(ctx.chat).get("filters").value();
		let { title }: any = await ctx.getChat();
		if (filters.length !== 0) {
			let text = _.filterModule.title(title);
			filters.forEach((a, i) => {
				text += `${i}  \`${a.id}\`\n`;
			});
			ctx.replyWithMarkdown(text);
		} else {
			ctx.replyWithMarkdown(_.filterModule.noFiltersFound);
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getFilters", __filename);
	}
}
export async function getFilter(ctx: Context, filter: string) {
	const _ = getLang(ctx.chat);
	try {
		let filters: FilterI[] = db(ctx.chat).get("filters").value();
		let search: FilterI | undefined = filters.find(
			(a) => a.id.toLowerCase() === filter.toLowerCase(),
		);
		if (search == undefined) {
			return ctx.replyWithMarkdown(
				`El *filtro* \`${filter}\` no existe en mi base de datos`,
			);
		} else {
			let text = _.filterModule.filterDesc(filter);
			text += _.filterModule.type(search.type);
			if (search.strings) {
				text += _.filterModule.resp;
				search.strings.map((a, i) => {
					text += `${i + 1} - ${a}`;
				});
			} else {
				text += `*Id:*  \`${search.content}\``;
			}
			return ctx.replyWithMarkdown(text);
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "getFilter", __filename);
	}
}
