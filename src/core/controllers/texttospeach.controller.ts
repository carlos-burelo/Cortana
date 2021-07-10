import * as googleTTS from "google-tts-api";
import { Context } from "telegraf";
import { _bot } from "../../config";
import { generateLog } from "../libs/messages";
export async function getTTS(
	ctx: Context,
	message: string,
	lang: string,
): Promise<string> {
	try {
		const url = googleTTS.getAudioUrl(message, {
			lang: lang,
			slow: false,
			host: "https://translate.google.com",
		});
		return url;
	} catch (error) {
		const [, l, c] = error.stack.match(/(\d+):(\d+)/);
		generateLog(ctx, error, [l, c], "getTTS", __filename);
	}
}
