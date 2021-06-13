import * as googleTTS from "google-tts-api";
import { _bot } from "../../config";
export async function getTTS(message: string, lang: string): Promise<string> {
  try {
    const url = googleTTS.getAudioUrl(message, {
      lang: lang,
      slow: false,
      host: "https://translate.google.com",
    });
    return url;
  } catch (error) {
    console.log(error);
    return;
  }
}
