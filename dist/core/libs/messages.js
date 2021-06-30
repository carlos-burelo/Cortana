"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsg = exports.editMessage = exports.parseVars = exports.sendMsgTo = exports.detectMsgFormat = void 0;
async function detectMsgFormat(reply, id) {
    let props = Object.keys(reply);
    let note = {};
    props.map((a) => {
        if (a !== "message_id" &&
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
            a !== "sender_chat") {
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
                    (note.type = "sticker", note.is_animated = note.sticker['is_animated']),
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
exports.detectMsgFormat = detectMsgFormat;
async function sendMsgTo(ctx, note, vars) {
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
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.sendMsgTo = sendMsgTo;
async function parseVars(variables, text) {
    let keys = Object.keys(variables);
    keys.map((a) => {
        text = text.replace(new RegExp(`{${a}}`, "g"), variables[a]);
    });
    return text;
}
exports.parseVars = parseVars;
function editMessage(ctx, message_id, text, keyboard, parse) {
    !parse ? parse = 'Markdown' : parse;
    return ctx.telegram.editMessageText(ctx.chat.id, message_id, `${ctx.chat.id}`, text, {
        parse_mode: parse,
        reply_markup: keyboard,
    });
}
exports.editMessage = editMessage;
async function sendMsg(ctx, note, id, vars) {
    if (!id || id == undefined) {
        id = ctx.chat.id;
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
                    });
                }
                catch (error) {
                    ctx.telegram.sendMessage(id, note.content, {
                        entities: note.entities,
                        reply_markup: note.reply_markup
                    });
                }
                break;
            case "photo":
                ctx.telegram.sendPhoto(id, note.content, {
                    caption: note.caption,
                    caption_entities: note.caption_entities,
                    reply_markup: note.reply_markup
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
            default:
                if (vars) {
                    note.content = await parseVars(vars, note.content);
                }
                ctx.telegram.sendMessage(id, note.content, {
                    entities: note.entities,
                    reply_markup: note.reply_markup,
                });
                break;
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.sendMsg = sendMsg;
