import { Telegraf } from "telegraf";
import { _apis } from "../../config";
import { getLang } from "../../lang";
import {
	getGitRepo,
	getGitRepos,
	getGitUser,
	getRepository,
} from "../controllers/github.controller";

export default function (bot: Telegraf) {
	bot.command("/git", async (ctx) => {
		const _ = getLang(ctx.chat);
		let msg: string[] = ctx.message.text.split(" ");
		if (!msg[1]) {
			return ctx.reply(_.githubModule.noUserFound);
		}
		await getGitUser(ctx, msg[1]);
	});
	bot.command("/repos", async (ctx) => {
		const { githubModule: _ } = getLang(ctx.chat);
		let user: string[] | string = ctx.update.message.text.split(" ");
		user = user[1];
		if (!user) {
			return ctx.reply(_.noUserFound);
		} else {
			await getGitRepos(ctx, user);
		}
	});
	bot.command("/repo", async (ctx) => {
		const { githubModule: _ } = getLang(ctx.chat);
		let message: string[] = ctx.update.message.text.split(" ");
		let user: string = message[1];
		let repo: string = message[2];
		let match = message[1].match(/https:\/\/github.com\/.+\/.+/gi);
		if (match) {
			user = match[0].split("/")[3];
			repo = match[0].split("/")[4];
			return await getGitRepo(ctx, user, repo);
		}
		if (!user) {
			return ctx.reply(_.noUserFound);
		}
		if (!repo) {
			return ctx.reply(_.noRepoFound);
		}
		await getGitRepo(ctx, user, repo);
	});
	bot.command("/clone", async (ctx) => {
		const { githubModule: _ } = getLang(ctx.chat);
		let message: string[] = ctx.update.message.text.split(" ");
		let user: string = message[1];
		let repo: string = message[2];
		let match = message[1].match(/https:\/\/github.com\/.+\/.+/gi);
		if (match) {
			user = match[0].split("/")[3];
			repo = match[0].split("/")[4];
			return await getRepository(ctx, user, repo);
		}
		if (!user) {
			ctx.reply(_.noUserFound);
		}
		if (!repo) {
			ctx.reply(_.noRepoFound);
		}
		await getRepository(ctx, user, repo);
	});
}
