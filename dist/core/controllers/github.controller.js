"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepository = exports.getGitRepo = exports.getGitRepos = exports.getGitUser = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const files_1 = require("../libs/files");
async function getGitUser(ctx, user) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        const { data } = await axios_1.default.get(`${config_1._apis.github}/users/${user}`);
        const $ = data;
        return ctx.replyWithMarkdown(`*Git user: * ${$.login}\n` +
            `*Username: * ${$.name}\n` +
            `*Profile: * [Git Profile](${$.html_url})\n` +
            `*Website: * [HomePage](${$.blog})\n` +
            `*Repositories: * ${$.public_repos}\n` +
            `*Location: * ${$.location}\n` +
            `*Followers: * ${$.followers}\n` +
            `*Following: * ${$.following}\n`);
    }
    catch (error) {
        ctx.reply(_.githubModule.profileNotFound);
    }
}
exports.getGitUser = getGitUser;
async function getGitRepos(ctx, user) {
    try {
        const { githubModule: _ } = lang_1.getLang(ctx.chat);
        let repositories = "";
        const { data } = await axios_1.default.get(`${config_1._apis.github}/users/${user}/repos`);
        if (data.length !== 0) {
            repositories += _.reposTitle(data.length);
            data.forEach((repo, i) => {
                let indice1 = i + 1;
                let indice = indice1 < 10 ? `0${indice1}` : `${indice1}`;
                repositories += `*${indice}:* [${repo.name}](${repo.html_url})\n`;
            });
            return ctx.replyWithMarkdown(repositories, {
                disable_web_page_preview: true,
            });
        }
        else {
            return ctx.reply(_.profileNotFound);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getGitRepos = getGitRepos;
async function getGitRepo(ctx, user, repo) {
    try {
        const { data } = await axios_1.default.get(`${config_1._apis.github}/repos/${user}/${repo}`);
        if (data.length !== 0) {
            const repo = data;
            ctx.replyWithMarkdown(`*Name:*  ${repo.name}\n` +
                `*Owner:*  ${repo.owner.login}\n` +
                `*Repository:*  [Repo url](${repo.html_url})\n` +
                `*Website:*  [HomePage](${repo.homepage})\n` +
                `*Description:*  ${repo.description}\n` +
                `*Language:*  ${repo.language}\n` +
                `*Forks:*  ${repo.forks}\n`);
        }
        else {
            ctx.reply("Datos incorrectos");
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getGitRepo = getGitRepo;
async function getRepository(ctx, user, repo) {
    try {
        const { data } = await axios_1.default.get(`https://github.com/${user}/${repo}`);
        const $ = cheerio_1.default.load(data);
        let el = $("li:nth-child(2).Box-row.Box-row--hover-gray.p-0 a");
        let donwLink = `https://github.com${el.attr("href")}`;
        let base = `${path_1.basename(donwLink)}`;
        let file_dir = path_1.resolve(config_1.downloadDir, "repos");
        let file = path_1.resolve(file_dir, base);
        await files_1.downloadFile(donwLink, file);
        let fileDir = files_1.renameFile(file_dir, base, `${repo}.zip`);
        ctx.replyWithDocument({ source: fileDir });
        fs_1.unlinkSync(fileDir);
    }
    catch (error) {
        ctx.reply("Ha ocurrido un error al descargar el repositorio");
    }
}
exports.getRepository = getRepository;
