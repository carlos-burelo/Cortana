import axios from "axios";
import { Context, Telegraf } from "telegraf";
import { api_urls } from "../../config";
import { getRepository } from "../controllers/github.controller";

export default function (bot: Telegraf) {
  bot.command("/git", async (ctx: Context<any>) => {
    let user: string[] | string = ctx.update.message.text.split(" ");
    user = user[1];
    if (!user) {
      ctx.reply("Porfavor coloque un usuario");
    } else {
      const { data } = await axios.get(`${api_urls.github}/users/${user}`);
      if (data.length !== 0) {
        const user = data;
        ctx.replyWithMarkdown(
          `*Git user: * ${user.login}\n` +
            `*Username: * ${user.name}\n` +
            `*Profile: * [Git Profile](${user.html_url})\n` +
            `*Website: * [HomePage](${user.blog})\n` +
            `*Repositories: * ${user.public_repos}\n` +
            `*Location: * ${user.location}\n` +
            `*Followers: * ${user.followers}\n` +
            `*Following: * ${user.following}\n`
        );
      } else {
        ctx.reply("Usuario no encontrado");
      }
    }
  });
  bot.command("/repos", async (ctx) => {
    let user: string[] | string = ctx.update.message.text.split(" ");
    user = user[1];
    if (!user) {
      ctx.reply("No hay ningun usuario");
      ctx.reply(`${this.help_module}`);
    } else {
      let repositories: string = "";
      const { data } = await axios.get(
        `${api_urls.github}/users/${user}/repos`
      );
      if (data.length !== 0) {
        repositories += `Repositorios (${data.length})\n\n`;
        data.forEach(function (repo, i) {
          let indice1: number = i + 1;
          let indice: string = indice1 < 10 ? `0${indice1}` : `${indice1}`;
          repositories += `*${indice}:* [${repo.name}](${repo.html_url})\n`;
        });
        ctx.replyWithMarkdown(repositories);
      } else {
        ctx.reply("Usuario no econtrado");
      }
    }
  });
  bot.command("/repo", async (ctx) => {
    let message: string[] = ctx.update.message.text.split(" ");
    let user: string = message[1];
    let repo: string = message[2];
    if (!user) {
      ctx.reply("Coloque un usuario");
    }
    if (!repo) {
      ctx.reply("Coloque un repositorio");
    } else {
      const { data } = await axios.get(
        `${api_urls.github}/repos/${user}/${repo}`
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
            `*Forks:*  ${repo.forks}\n`
        );
      } else {
        ctx.reply("Datos incorrectos");
      }
    }
  });
  bot.command("/clone", async (ctx) => {
    try {
      let msg: string = ctx.message.text;
      if (msg.includes("https://github.com/")) {
        let spl: string[] = ctx.message.text.split("/");
        let repo: string = spl[spl.length - 1];
        let user: string = spl[spl.length - 2];
        await getRepository(ctx, user, repo);
      } else {
        let message: string[] = ctx.update.message.text.split(" ");
        let user: string = message[1];
        let repo: string = message[2];
        if (!user) {
          ctx.reply("Coloque un usuario");
        }
        if (!repo) {
          ctx.reply("Coloque un repositorio");
        }
        await getRepository(ctx, user, repo);
      }
    } catch (error) {
      ctx.reply(error.toString());
    }
  });
}
