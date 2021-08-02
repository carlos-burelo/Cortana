import { Telegraf } from 'telegraf';
import axios from 'axios';
import Heroku from 'heroku-client';
import { isAllowed, noAccess, lang } from '../../database';
import { editMessage, errorHandler } from '../libs/messages';

export default function (bot: Telegraf) {
  bot.command('/usage', async (ctx) => {
    if (!isAllowed(ctx)) {
      return ctx.replyWithMarkdownV2(noAccess);
    }
    try {
      const { herokuModule: _, global: $ } = await lang(ctx);
      const token = 'f188baef-b272-4cc5-9cf9-1cb5140789e5';
      if (!token || token == undefined) {
        return ctx.reply($.envNotFound(token));
      }
      const { message_id: id } = await ctx.replyWithMarkdown(_.process[0]);
      const heroku = new Heroku({ token: token });
      const app = await heroku.get('/apps');
      const heroku_api = 'https://api.heroku.com';
      const user_id = app[0].owner.id;
      const path = '/accounts/' + user_id + '/actions/get-quota';
      const headers = [
        'Mozilla/5.0 (Linux; Android 10; SM-G975F) ',
        'AppleWebKit/537.36 (KHTML, like Gecko) ',
        'Chrome/81.04044.117 Mobile Safari/537.36'
      ];
      editMessage({ ctx, id, text: _.process[1] });
      let { data } = await axios.get(heroku_api + path, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.heroku+json; version=3.account-quotas',
          headers: headers
        }
      });
      let quota = data['account_quota'];
      let quota_used = data['quota_used'];
      let remaining_quota = quota - quota_used;
      let percentage = Math.floor((remaining_quota / quota) * 100);
      let minutes_remaining = remaining_quota / 60;
      let hours = Math.floor(minutes_remaining / 60);
      let minutes = Math.floor(minutes_remaining % 60);

      let Apps: any[] = data['apps'];
      let appname = 'cortana-ts';
      editMessage({ ctx, id, text: _.process[2] });
      let [, a] = await heroku.get('/apps/' + appname + '/dynos');
      a = a.app;
      let quotaUsed: number;
      let percentageUsed: number;

      Apps.forEach(async (app) => {
        if (app.app_uuid == a.id) {
          quotaUsed = app.quota_used / 60;
          percentageUsed = Math.floor((app.quota_used * 100) / quota);
        }
      });
      let AppHours = Math.floor(quotaUsed / 60);
      let AppMinutes = Math.floor(percentageUsed % 60);
      let text =
        `<b>${_.title}</b>\n\n` +
        `<code>${_.usageText(appname)}</code>\n` +
        `<b>${_.time(AppHours, AppMinutes, percentageUsed)}</b>` +
        `\n-------------------------------------------------------------\n` +
        `<code>${_.remainigText}</code>\n` +
        `<b>${_.time(hours, minutes, percentage)}</b>`;
      return editMessage({ ctx, id, text, mode: 'HTML' });
    } catch (error) {
      const [l] = error.stack.match(/(\d+):(\d+)/);
      errorHandler({ ctx, error, __filename, f: '/', l });
    }
  });
}

// const name ='cortana-ts';

// const id1='4b285224-5cf8-4be5-a2da-15412d337f4c';
// const id2='d4561a22-4c00-4a31-aa22-46fbbee5f3e2';

// https://api.heroku.com/apps/$APP_ID_OR_NAME/dynos/$DYNO_ID_OR_NAME

// async function list() {
//   let response = await axios.get(`${API_ENDPOINT}/apps/${name}/dynos/${id2}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/vnd.heroku+json; version=3"
//     }
//   })
//   console.log(response.data)
// }

// const heroku_api = API_ENDPOINT
// const user_id = '0f73e689-9024-4238-9b21-83730a1ff6cb'
// const path = "/accounts/" + user_id + "/actions/get-quota";
// const headers = [
//   'Mozilla/5.0 (Linux; Android 10; SM-G975F) ',
//   "AppleWebKit/537.36 (KHTML, like Gecko) ",
//   "Chrome/81.04044.117 Mobile Safari/537.36"
// ];
// async function list() {
//   let {data} = await axios.get(heroku_api + path,{
//         headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/vnd.heroku+json; version=3.account-quotas",
//       headers: headers
//     }
//   })
//   console.log(data)
// }
// list()

// const heroku = new Heroku({ token: token })

// async function name() {
//     const id = await heroku.get('/apps')
//     console.log(id[0].owner.id)
// }
// name()
// heroku.get('/apps').then(apps => console.log(apps[0].owner.id))
