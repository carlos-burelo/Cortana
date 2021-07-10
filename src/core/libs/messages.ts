import day from "dayjs";
import { Context } from "telegraf";
import { ChatUserI, NoteI, ReplyI } from "../interfaces";
import { catchErrors } from "./error";

export function detectMsgFormat(reply: ReplyI | any, id?: string): NoteI {
	let props: string[] = Object.keys(reply);
	let temp:string[];
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
			a !== "forward_from" &&
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
		  ((note.type = "sticker"),
		  (note.is_animated = note.sticker["is_animated"])),
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
		: note.poll
		  ? ((note.content = note.poll.question),
			(note.type = "poll"),
			note.options = note.poll.options.map(o => o.text),
			temp = Object.keys(note.poll),
			delete note.poll.id,
			delete note.poll.question,
			delete note.poll.options,
			note.args = note.poll,
			delete note.poll
			)
		: note.text
		? ((note.content = note.text),
		  (note.type = "text"),
		  delete note["text"])
		: note;
	id ? (note.id = id) : note;
	return note;
}
export function parseVars(variables: ChatUserI | any, text: string): string {
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
	parse?: "Markdown" | "MarkdownV2" | "HTML",
) {
	!parse ? (parse = "Markdown") : parse;
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
export function sendMsg(
	ctx: Context,
	note: NoteI,
	id?: number,
	vars?: ChatUserI,
) {
	if (!id || id == undefined) {
		id = ctx.chat.id;
	}
	try {
		switch (note.type) {
			case "text":
				if (vars) {
					note.content = parseVars(vars, note.content);
				}
				try {
					ctx.telegram.sendMessage(id, note.content, {
						entities: note.entities,
						reply_markup: note.reply_markup,
						parse_mode: "Markdown",
					});
				} catch (error) {
					ctx.telegram.sendMessage(id, note.content, {
						entities: note.entities,
						reply_markup: note.reply_markup,
					});
				}
				break;
			case "photo":
				ctx.telegram.sendPhoto(id, note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					reply_markup: note.reply_markup,
				});
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
				ctx.telegram.sendSticker(id, note.content, {
					reply_markup: note.reply_markup,
				});
				break;
			case "audio":
				ctx.telegram.sendAudio(id, note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					thumb: note.thumb,
				});
				break;
			case "voice":
				ctx.telegram.sendVoice(id, note.content, {
					caption: note.caption,
					reply_markup: note.reply_markup,
					caption_entities: note.caption_entities,
				});
				break;
			case "video":
				ctx.telegram.sendVideo(id, note.content, {
					caption: note.caption,
					caption_entities: note.caption_entities,
					reply_markup: note.reply_markup,
					thumb: note.thumb,
				});
				break;
			case "poll":
				ctx.telegram.sendPoll(id,note.content,note.options,note.args );
				break;
				
			default:
				if (vars) {
					note.content = parseVars(vars, note.content);
				}
				ctx.telegram.sendMessage(id, note.content, {
					entities: note.entities,
					reply_markup: note.reply_markup,
				});
				break;
		}
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		return generateLog(ctx, error, [l, c], "sendMsg", __filename);
	}
}
export function generateLog(
	ctx: Context,
	text: any,
	[l, c]: number[],
	functionName: string,
	module: any,
) {
	let error =
		`*Error in:* #${module.split(/[\\/]/).pop()}\n\n` +
		`*Hour:*${day().hour()}:${day().minute()}\n` +
		`*Account:* \`${ctx.chat.id}\`\n` +
		`*Line:*${l}\n` +
		`*Column:*${c}\n` +
		`*Function:*${functionName}\n` +
		`*Description:* \`\`\`${text.toString()}\`\`\``;
	catchErrors(ctx, text.message);
	return ctx.telegram.sendMessage(process.env.CHANELID, error, {
		parse_mode: "Markdown",
	});
}
export function getTime(ctx:Context,text:string):number {
	try {
		// Minutes | Hours | days
		let regex:RegExp = /\d+[mhd]/gi;
		let match = text.match(regex);
		if(match !== null){
			let time2 = parseInt(match[0].replace(/\D/, ''));
			console.log(ctx.message.date)
			if(match[0].includes('m')){
				return  ctx.message.date + (time2 * 60)
			}
			if(match[0].includes('h')){
				return ctx.message.date + (time2 * 60 * 60)
			}
			if(match[0].includes('d')){
				return ctx.message.date + (time2 * 24 * 60 * 60)
			} else {
				return ctx.message.date + (time2 * 24 * 60 * 60)
			}
		}
		
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "/", __filename);
	}
}