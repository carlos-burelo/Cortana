"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = void 0;
const google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
async function translateText(ctx, lang, txt) {
    try {
        const { text } = await google_translate_api_1.default(txt, { to: lang });
        return ctx.reply(text, { reply_to_message_id: ctx.message.message_id });
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.translateText = translateText;
;
