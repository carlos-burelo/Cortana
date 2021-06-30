"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const github_controller_1 = require("../controllers/github.controller");
function default_1(bot) {
    bot.command("/git", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let msg = ctx.message.text.split(" ");
        if (!msg[1]) {
            return ctx.reply(_.githubModule.noUserFound);
        }
        await github_controller_1.getGitUser(ctx, msg[1]);
    });
    bot.command("/repos", async (ctx) => {
        const { githubModule: _ } = lang_1.getLang(ctx.chat);
        let user = ctx.update.message.text.split(" ");
        user = user[1];
        if (!user) {
            return ctx.reply(_.noUserFound);
        }
        else {
            await github_controller_1.getGitRepos(ctx, user);
        }
    });
    bot.command("/repo", async (ctx) => {
        const { githubModule: _ } = lang_1.getLang(ctx.chat);
        let message = ctx.update.message.text.split(" ");
        let user = message[1];
        let repo = message[2];
        let match = message[1].match(/https:\/\/github.com\/.+\/.+/gi);
        if (match) {
            user = match[0].split("/")[3];
            repo = match[0].split("/")[4];
            return await github_controller_1.getGitRepo(ctx, user, repo);
        }
        if (!user) {
            return ctx.reply(_.noUserFound);
        }
        if (!repo) {
            return ctx.reply(_.noRepoFound);
        }
        await github_controller_1.getGitRepo(ctx, user, repo);
    });
    bot.command("/clone", async (ctx) => {
        const { githubModule: _ } = lang_1.getLang(ctx.chat);
        let message = ctx.update.message.text.split(" ");
        let user = message[1];
        let repo = message[2];
        let match = message[1].match(/https:\/\/github.com\/.+\/.+/gi);
        if (match) {
            user = match[0].split("/")[3];
            repo = match[0].split("/")[4];
            return await github_controller_1.getRepository(ctx, user, repo);
        }
        if (!user) {
            ctx.reply(_.noUserFound);
        }
        if (!repo) {
            ctx.reply(_.noRepoFound);
        }
        await github_controller_1.getRepository(ctx, user, repo);
    });
}
exports.default = default_1;
