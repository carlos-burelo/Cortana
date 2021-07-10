import { Context } from "telegraf";
import { getLang } from "../../lang";

export function getInfo(ctx: Context, res: any): string {
  const { usersModule: _ } = getLang(ctx.chat)
  let Info: string = "";
  if (res.id || res.id !== undefined) {
    Info += _.id(res.id);
  }
  if (res.first_name || res.first_name !== undefined) {
    Info += _.name(res.first_name);
  }
  if (res.title || res.title !== undefined) {
    Info += _.name(res.title);
  }
  if (res.last_name || res.last_name !== undefined) {
    Info += _.lastName(res.last_name);
  }
  if (res.username || res.username !== undefined) {
    Info += _.acount(res.username);
  }
  if (res.status) {
    Info += _.range(res.status);
  }
  if (res.custom_title) {
    Info += _.customTitle(res.custom_title);
  }
  if (res.is_bot) {
    Info += _.isBot(res.is_bot);
    
  }
  return Info;
}

export function getGroupInfo(ctx:Context,chat: any): string{
  const { usersModule: _ } = getLang(ctx.chat)
  let chatinfo: string =
    _.groupInfo +
    _.id(chat.id) +
    _.title(chat.title) +
    _.acount(chat.username) +
    _.type(chat.type) +
    _.inviteLink(chat.invite_link, chat.username) +
    ``;
  return chatinfo;
}
