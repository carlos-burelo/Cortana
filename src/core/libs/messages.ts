import { Context } from "telegraf";
import { ChatUserI, NoteI, ReplyI } from "../interfaces";

export async function detectMsgFormat(
	reply: ReplyI | any,
	id?: string,
): Promise<NoteI> {
	let props: string[] = Object.keys(reply);
	let note: NoteI = {};
	props.map((a) => {
		if (
			a !== "message_id" &&
			a !== "from" &&
			a !== "chat" &&
			a !== "date" &&
			a !== "animation" &&
			a !== "edit_date" &&
			a !== "author_signature" &&
			a !== "forward_from_chat" &&
			a !== "forward_date" &&
			a !== "forward_from_message_id" &&
			a !== "forward_signature" &&
			a !== "sender_chat"
		) {
			note[a] = reply[a];
		}
	});
	note.document
		? ((note.content = note.document.file_id),
		  (note.type = "document"),
		  delete note["document"])
		: note.photo
		? ((note.content = note.photo[note.photo.length - 1].file_id),
		  (note.type = "photo"),
		  delete note["photo"])
		: note.sticker
		? ((note.content = note.sticker.file_id),
		  (note.type = "sticker",note.is_animated = note.sticker['is_animated']),
		  delete note["sticker"])
		: note.audio
		? ((note.content = note.audio.file_id),
		  (note.type = "audio"),
		  delete note["audio"])
		: note.voice
		? ((note.content = note.voice.file_id),
		  (note.type = "voice"),
		  delete note["voice"])
		: note.video
		? ((note.content = note.video.file_id),
		  (note.type = "video"),
		  delete note["video"])
		: note.text
		? ((note.content = note.text),
		  (note.type = "text"),
		  delete note["text"])
		: note;
	id ? (note.id = id) : note;
	return note;
}
export async function sendMsgTo(ctx: Context, note: NoteI, vars?: ChatUserI) {
	try {
		switch (note.type) {
			case "text":
				if (vars) {
					note.content = await parseVars(vars, note.content);
				}
				ctx.reply(note.content, {
					entities: note.entities,
					reply_markup: note.reply_markup,
				});
				break;
			case "photo":
				ctx.replyWithPhoto(note.content, {
					caption_entities: note.caption_entities,
					reply_markup: note.reply_markup,
					caption: note.caption,
				});
				break;
			case "document":
				ctx.replyWithDocument(note.content, {
					reply_markup: note.reply_markup,
					caption: note.caption,
					caption_entities: note.caption_entities,
					thumb: note.thumb,
				});
				break;
			case "sticker":
				ctx.replyWithSticker(note.content, {
					reply_markup: note.reply_markup,
				});
				break;
			case "audio":
				ctx.replyWithAudio(note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					thumb: note.thumb,
				});
				break;
			case "voice":
				ctx.replyWithVoice(note.content, {
					caption: note.caption,
					reply_markup: note.reply_markup,
					caption_entities: note.caption_entities,
				});
				break;
			case "video":
				ctx.replyWithVideo(note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					reply_markup: note.reply_markup,
					thumb: note.thumb,
				});
				break;
			default:
				if (vars) {
					note.content = await parseVars(vars, note.content);
				}
				ctx.reply(note.content, {
					entities: note.entities,
					reply_markup: note.reply_markup,
				});
				break;
		}
	} catch (error) {
		ctx.reply(error.toString());
	}
}
export async function parseVars(variables: ChatUserI | any, text: string) {
	let keys: string[] = Object.keys(variables);
	keys.map((a: string) => {
		text = text.replace(new RegExp(`{${a}}`, "g"), variables[a]);
	});
	return text;
}
export function editMessage(
	ctx: Context,
	message_id: number,
	text: string,
	keyboard?: any,
	parse?: 'Markdown' | 'MarkdownV2' | 'HTML',
) {
	!parse ? parse = 'Markdown' : parse
	return ctx.telegram.editMessageText(
		ctx.chat.id,
		message_id,
		`${ctx.chat.id}`,
		text,
		
		{
			parse_mode: parse,
			reply_markup: keyboard,
		},
	);
}

export async function sendMsg(ctx: Context, note: NoteI, id?:number, vars?: ChatUserI) {
	if(!id || id == undefined){
		id = ctx.chat.id
	}
	try {
		switch (note.type) {
			case "text":
				if (vars) {
					note.content = await parseVars(vars, note.content);
				}
				try {
					ctx.telegram.sendMessage(id, note.content, {
						entities: note.entities,
						reply_markup: note.reply_markup,
						parse_mode: 'Markdown'
					})
				} catch (error) {
					ctx.telegram.sendMessage(id, note.content, {
						entities: note.entities,
						reply_markup: note.reply_markup
					})
				}
				break;
			case "photo":
				ctx.telegram.sendPhoto(id, note.content,{
					caption: note.caption,
					caption_entities: note.caption_entities,
					reply_markup: note.reply_markup
				})
				break;
			case "document":
				ctx.telegram.sendDocument(id, note.content, {
					reply_markup: note.reply_markup,
					caption: note.caption,
					caption_entities: note.caption_entities,
					thumb: note.thumb,
				});
				break;
			case "sticker":
				ctx.telegram.sendSticker(id,note.content, {
					reply_markup: note.reply_markup,
				});
				break;
			case "audio":
				ctx.telegram.sendAudio(id,note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					thumb: note.thumb,
				});
				break;
			case "voice":
				ctx.telegram.sendVoice(id,note.content, {
					caption: note.caption,
					reply_markup: note.reply_markup,
					caption_entities: note.caption_entities,
				});
				break;
			case "video":
				ctx.telegram.sendVideo(id,note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					reply_markup: note.reply_markup,
					thumb: note.thumb,
				});
				break;
			default:
				if (vars) {
					note.content = await parseVars(vars, note.content);
				}
				ctx.telegram.sendMessage(id,note.content, {
					entities: note.entities,
					reply_markup: note.reply_markup,
				});
				break;
		}
	} catch (error) {
		ctx.reply(error.toString());
	}
}