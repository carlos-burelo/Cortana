import { StickerSet } from '@grammyjs/types';
import { BOT_USERNAME, downloadDir } from '../../../config';
import { Cortana } from '../../../context';
import { downloadFile, scaleImage } from '../../libs/files';
import { matchMessage } from '../../libs/messages';
import { resolve } from 'path';
import { InputFile } from 'grammy';

export async function kangCmd(ctx: Cortana) {
  try {
    const { extrasModule: _ } = await ctx.lang();
    const emoji = ctx.params[0] || '✅';
    const { type, content } = matchMessage(ctx.msg.reply_to_message);
    if (type !== 'photo') return console.log('No es una foto');
    const fileUrl = await ctx.getLink(content);
    const user = ctx.from;
    // STICKER PACK PROCESS
    let packNum: number = 1;
    const limit: number = 120;
    let packName: string = `${user.first_name}_V${packNum}_by_${BOT_USERNAME}`;
    const packTitle: string = `${user.first_name} Sticker Set V${packNum}`;
    const stickerFileName = `${Date.now()}.png`;
    let existPack: StickerSet;
    let packResult = await ctx.api.getStickerSet(packName);
    try {
      if (packResult.stickers.length === limit) {
        packName = `${user.first_name}_V${packNum++}_by_${BOT_USERNAME}`;
      } else {
        existPack = packResult;
      }
    } catch (error) {
      existPack = undefined;
    }
    let newFileDir: string = resolve(downloadDir, stickerFileName);
    await downloadFile(fileUrl, newFileDir);
    let imgScaled: string;
    if (type == 'photo') {
      imgScaled = await scaleImage(newFileDir);
    }
    if (existPack) {
      await ctx.api.addStickerToSet(user.id, packName, emoji, {
        png_sticker: new InputFile(imgScaled),
      });
    } else {
      await ctx.api.createNewStickerSet(user.id, packName, packTitle, emoji, {
        png_sticker: imgScaled,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export const kangHelp = `Help for *kang* command`;
