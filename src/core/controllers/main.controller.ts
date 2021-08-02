import { Context } from 'telegraf';
import { ReplyMessage } from 'typegram';
import { _owner } from '../../config';
import { ButtonI } from '../interfaces';
import { createButtons } from '../libs/buttons';
import { errorHandler } from '../libs/messages';
export async function invokeAction(ctx: Context, text: string, reply?: ReplyMessage) {
  try {
    const id = ctx.message.message_id;
    let cmd = text.match(/\.\w+/)[0];
    if (cmd == '.send') {
      await send(ctx, removeCmd(text), id, reply);
    }
  } catch (error) {}
}
function removeCmd(text: string): string {
  return (text = text.replace(/^\.\w+\s?/, ''));
}
export async function send(ctx: Context, text: string, id: number, reply?: ReplyMessage) {
  if (text.length == 0) {
    return;
  } else {
    console.log('work');
    console.log(id);

    // return await editMessage(ctx, id, `Hello`);
  }
}
export async function singIn(ctx:Context, id:number){
  try {
    const i:any = await ctx.getChat();
    const _ = {
      id: i.id,
      first_name: i.title ?? i.first_name,
      ...(i.invite_link) && { invite_link: i.invite_link},
      ...(i.username) && { username: i.username},
      type: i.type
    };
    let text = 
    `*Id:* \`${_.id}\`\n`+
    `*Name:* ${_.first_name}\n`+
    `*Type:* ${_.type}\n`+
    `${_.username ? '*Username:*\s'+_.username : '*Link:* ['+_.first_name+']'+'('+_.invite_link+')'}\n`+
    `\n`;
    let buttons:ButtonI[] = [
      {
        text: 'Accept',
        callback: `join:${_.id}`
      },
      {
        text: 'Decline',
        callback: `decline:${_.id}`
      }
    ]
    return ctx.telegram.sendMessage(
      _owner.id,
      text,
      {
        parse_mode: 'Markdown',
        reply_markup: createButtons(buttons, 2)
    })
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    errorHandler({ctx,error,__filename,f:'singIn()',l});
  }
};