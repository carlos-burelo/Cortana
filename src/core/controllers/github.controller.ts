import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { unlinkSync } from "fs";
import { basename, resolve } from "path";
import { Context } from "telegraf";
import { downloadDir, _apis } from "../../config";
import { getLang } from "../../lang";
import { downloadFile, renameFile } from "../libs/files";

export async function getGitUser(ctx: Context, user: string) {
	const _ = getLang(ctx.chat);
	try {
		const { data }: any = await axios.get(`${_apis.github}/users/${user}`);
		const $ = data;
		return ctx.replyWithMarkdown(
			`*Git user: * ${$.login}\n` +
				`*Username: * ${$.name}\n` +
				`*Profile: * [Git Profile](${$.html_url})\n` +
				`*Website: * [HomePage](${$.blog})\n` +
				`*Repositories: * ${$.public_repos}\n` +
				`*Location: * ${$.location}\n` +
				`*Followers: * ${$.followers}\n` +
				`*Following: * ${$.following}\n`,
		);
	} catch (error) {
		ctx.reply(_.githubModule.profileNotFound);
	}
}

export async function getGitRepos(ctx: Context, user: string) {
	try {
		const { githubModule: _ } = getLang(ctx.chat);
		let repositories: string = "";
		const { data } = await axios.get(`${_apis.github}/users/${user}/repos`);
		if (data.length !== 0) {
			repositories += _.reposTitle(data.length);
			data.forEach((repo: any, i: number) => {
				let indice1: number = i + 1;
				let indice: string =
					indice1 < 10 ? `0${indice1}` : `${indice1}`;
				repositories += `*${indice}:* [${repo.name}](${repo.html_url})\n`;
			});
			return ctx.replyWithMarkdown(repositories, {
				disable_web_page_preview: true,
			});
		} else {
			return ctx.reply(_.profileNotFound);
		}
	} catch (error) {
		ctx.reply(error.toString());
	}
}
export async function getGitRepo(ctx: Context, user: string, repo: string) {
	try {
		const { data } = await axios.get(
			`${_apis.github}/repos/${user}/${repo}`,
		);
		if (data.length !== 0) {
			const repo = data;
			ctx.replyWithMarkdown(
				`*Name:*  ${repo.name}\n` +
					`*Owner:*  ${repo.owner.login}\n` +
					`*Repository:*  [Repo url](${repo.html_url})\n` +
					`*Website:*  [HomePage](${repo.homepage})\n` +
					`*Description:*  ${repo.description}\n` +
					`*Language:*  ${repo.language}\n` +
					`*Forks:*  ${repo.forks}\n`,
			);
		} else {
			ctx.reply("Datos incorrectos");
		}
	} catch (error) {
		ctx.reply(error.toString());
	}
}

export async function getRepository(ctx: Context, user: string, repo: string) {
	try {
		const { data }: AxiosResponse = await axios.get(
			`https://github.com/${user}/${repo}`,
		);
		const $ = cheerio.load(data);
		let el = $("li:nth-child(2).Box-row.Box-row--hover-gray.p-0 a");
		let donwLink: string = `https://github.com${el.attr("href")}`;
		let base: string = `${basename(donwLink)}`;
		let file_dir: string = resolve(downloadDir, "repos");
		let file: string = resolve(file_dir, base);
		await downloadFile(donwLink, file);
		let fileDir = renameFile(file_dir, base, `${repo}.zip`);
		ctx.replyWithDocument({ source: fileDir });
		unlinkSync(fileDir);
	} catch (error) {
		ctx.reply("Ha ocurrido un error al descargar el repositorio");
	}
}
