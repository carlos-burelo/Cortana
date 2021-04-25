import axios from "axios";
import { Context, Telegraf} from 'telegraf';
import { api_urls } from "../config";

export default function (bot:Telegraf) {
  bot.command("/git", async (ctx:Context<any>) => {
    let user = ctx.update.message.text.split(" ");
    user = user[1];
    if (!user) {
      ctx.reply("Porfavor coloque un usuario");
    } else {
      const res = await axios.get(`${api_urls.github}/users/${user}`);
      if(res.data.length !== 0 ){
        const user = res.data;
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
    let user:any = ctx.update.message.text.split(" ");
    user = user[1];
    if (!user) {
      ctx.reply("No hay ningun usuario");
      ctx.reply(`${this.help_module}`);
    } else {
      let repositories = '';
      const res = await axios.get(`${api_urls.github}/users/${user}/repos`);
      if(res.data.length !== 0){
        repositories += `Repositorios (${res.data.length})\n\n`;
        res.data.forEach(function (repo, i) {
          let indice1 = i + 1;
          let indice = indice1 < 10 ? `0${indice1}` : `${indice1}`;
          repositories += `*${indice}:* [${repo.name}](${repo.html_url})\n`;
        });
        ctx.replyWithMarkdown(repositories);
      } else {
        ctx.reply('Usuario no econtrado')
      }
    }
  });
  bot.command("/repo", async (ctx) => {
    let message = ctx.update.message.text.split(" ");
    let user = message[1];
    let repo = message[2];
    if (!user) {
      ctx.reply("Coloque un usuario");
    }
    if (!repo) {
      ctx.reply("Coloque un repositorio");
    } else {
      const res = await axios.get(`${api_urls.github}/repos/${user}/${repo}`);
      if(res.data.length !== 0){
        const repo = res.data;
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
}
