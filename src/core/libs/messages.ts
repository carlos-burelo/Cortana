import { Message, Update } from 'grammy/out/platform';
import { BOT_REPO } from '@config';
import { ChatUserI, editMessageI, logErrorI, MsgI, sendMessageI } from '@typings';

/**
 * Iterate over the properties of the object,
 * keeping the necessary ones and obtaining the message format
 * @param {any} message
 * @param {string} id?
 * @return {MsgI}
 */
export function matchMessage(message: any, id?: string): MsgI {
  try {
    const msg: MsgI = {};
    Object.keys(message).map((a) => {
      if (
        a !== 'message_id' &&
        a !== 'from' &&
        a !== 'chat' &&
        a !== 'date' &&
        a !== 'animation' &&
        a !== 'edit_date' &&
        a !== 'author_signature' &&
        a !== 'forward_from_chat' &&
        a !== 'forward_from' &&
        a !== 'forward_date' &&
        a !== 'forward_from_message_id' &&
        a !== 'forward_signature' &&
        a !== 'sender_chat'
      ) {
        msg[a] = message[a];
      }
    });
    if ('document' in msg) {
      msg.content = msg.content.file_id;
      msg.type = 'document';
      delete msg['document'];
    }
    if ('photo' in msg) {
      msg.content = msg.photo[msg.photo.length - 1].file_id;
      msg.type = 'photo';
      delete msg['photo'];
    }
    if ('sticker' in msg) {
      msg.content = msg.sticker.file_id;
      msg.type = 'sticker';
      delete msg['sticker'];
    }
    if ('audio' in msg) {
      msg.content = msg.audio.file_id;
      msg.type = 'audio';
      delete msg['audio'];
    }
    if ('voice' in msg) {
      msg.content = msg.voice.file_id;
      msg.type = 'voice';
      delete msg['voice'];
    }
    if ('video' in msg) {
      msg.content = msg.video.file_id;
      msg.type = 'video';
      delete msg['video'];
    }
    if ('poll' in msg) {
      msg.content = msg.poll.question;
      msg.type = 'poll';
      msg.options = msg.poll.options.map((i: any) => i.text);
      delete msg.poll.id;
      delete msg.poll.question;
      delete msg.poll.options;
      msg.args = msg.poll;
      delete msg.poll;
    }
    if ('text' in msg) {
      msg.content = msg.text;
      msg.type = 'text';
      delete msg['text'];
    }
    if (id) {
      msg.id = id;
    }
    return msg;
  } catch (error) {
    return undefined;
  }
}
/**
 * Receive a message with variables like the following:
 * `{Example}` that will be replaced with the object
 * from the context
 * @param {ChatUserI} variables
 * @param {string} text
 */
export function parseVars(variables: ChatUserI | any, text: string): string {
  const keys: string[] = Object.keys(variables);
  keys.map((a: string) => {
    text = text.replace(new RegExp(`{${a}}`, 'g'), variables[a]);
  });
  return text;
}
/**
 * Receive an object that contains the context: `CTX`,
 * message ID: `ID`, the message:` text` and the parameters
 * optional as the PARSING `Mode` format, this by
 * defect is * `Markdown` * and the` Keyboard` that is a set
 * of buttons, these last 2 are optional.
 * @param {editMessageI} msg
 */
export function editMessage(
  msg: editMessageI
): Promise<true | (Update.Edited & Message.TextMessage)> {
  let { ctx, id, text, keyboard, mode = 'Markdown' } = msg;
  let chatId = ctx.chat.id;
  return ctx.api.editMessageText(chatId, id, chatId.toString(), text, {
    reply_markup: keyboard,
    parse_mode: mode,
  });
}
/**
 * Receive a "SendMessageI" type format`
 * containing the context: `ctx`, the message` msg`,
 * the chat id` id`, by default is the current chat,
 * and the variables to replace in the Message `Vars`,
 * these last 2 are optional
 * @param {sendMessageI} message
 * @returns {Promise<Message}
 */
export function sendMessage(message: sendMessageI): Promise<Message> {
  const { ctx, msg, id = ctx.chat.id, vars } = message;
  try {
    if (vars) {
      msg.content = parseVars(vars, msg.content);
    }
    if (msg.type == 'text') {
      return ctx.api.sendMessage(id, msg.content, {
        entities: msg.entities,
        reply_markup: msg.reply_markup,
        ...((!msg.entities || !msg.caption_entities) && {
          parse_mode: 'Markdown',
        }),
      });
    }
    if (msg.type == 'photo') {
      return ctx.api.sendPhoto(id, msg.content, {
        caption: msg.caption,
        caption_entities: msg.caption_entities,
        reply_markup: msg.reply_markup,
      });
    }
    if (msg.type == 'document') {
      return ctx.api.sendDocument(id, msg.content, {
        reply_markup: msg.reply_markup,
        caption: msg.caption,
        caption_entities: msg.caption_entities,
        thumb: msg.thumb,
      });
    }
    if (msg.type == 'sticker') {
      return ctx.api.sendSticker(id, msg.content, {
        reply_markup: msg.reply_markup,
      });
    }
    if (msg.type == 'audio') {
      return ctx.api.sendAudio(id, msg.content, {
        caption: msg.caption,
        caption_entities: msg.caption_entities,
        thumb: msg.thumb,
      });
    }
    if (msg.type == 'voice') {
      return ctx.api.sendVideo(id, msg.content, {
        caption: msg.caption,
        caption_entities: msg.caption_entities,
        reply_markup: msg.reply_markup,
        thumb: msg.thumb,
      });
    }
    if (msg.type == 'video') {
      return ctx.api.sendVideo(id, msg.content, {
        caption: msg.caption,
        caption_entities: msg.caption_entities,
        reply_markup: msg.reply_markup,
        thumb: msg.thumb,
      });
    }
    if (msg.type == 'poll') {
      return ctx.api.sendPoll(id, msg.content, msg.options, msg.args);
    } else {
      return ctx.api.sendMessage(id, msg.content, {
        entities: msg.entities,
        reply_markup: msg.reply_markup,
      });
    }
  } catch (error) {
    return;
  }
}
/**
 * Describe your function
 * @param {logErrorI} error
 * @return {Promise<Message.TextMessage>}
 */
export async function log({
  ctx,
  error,
  __filename,
  l,
  f,
}: logErrorI): Promise<Message.TextMessage> {
  const name = __filename.split(/[\\/]/).pop();
  let [link] = __filename.match(/\\\w+\\\w+\.\w+\.ts/g);
  link = link.replace(/\\/g, '/');
  let root = '/blob/master/src/core';
  let line = `${l.split(':')[0]}`;
  let url = `${BOT_REPO}${root}${link}\#L${line}`;
  const msg =
    `<b>Error in:</b> <b><a href="${url}">${name}</a></b>\n\n` +
    `<b>Account:</b> <code>${ctx.chat.id}</code>\n` +
    `<b>Location:</b> ${l}\n` +
    `<b>Function:</b> ${f}\n` +
    `<b>Description:</b>\n<code>${error.message}</code>`;
  return ctx.api.sendMessage('@CortanaLogs', msg, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
}
/**
 * Concat simple text with backticks
 * @param {string} text
 * @return {string}
 */
export function toCode(text: string): string {
  return `\`\`\`${text}\`\`\``;
}
/**
 * Return some emoji depending on the boolean value
 * @param {boolean} value
 * @return {'✅'|'❌'}
 */
export function status(value: boolean): '✅' | '❌' {
  if (value) return '✅';
  else return '❌';
}
/**
 * Parse the special caracters in the text
 * and replace them with the corresponding
 * scaped characters in markdown format
 * @param {string} text - The text to parse
 * @return {string}
 */
// prettier-ignore
export function md(text: string): string {
  text = text
    .replace(/\_/g, '\_')
    .replace(/\./g, '\.')
    .replace(/\-/g, '\-')
    .replace(/\*/g, '\*')
    .replace(/\[/g, '\[')
    .replace(/\]/g, '\]')
    .replace(/\(/g, '\(')
    .replace(/\)/g, '\)');
  return text;
}
/**
 * Parse characters in the text and replace them
 * with the corresponding escaped characters
 * in HTML TAGS
 * @param  {string} text
 * @returns {string}
 */
// prettier-ignore
export function html(text: string): string {
  text = text.replace(/\</g, '\<').replace(/\>/g, '\>');
  return text;
}
