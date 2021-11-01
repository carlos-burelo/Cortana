import { resolve } from 'path';
import { BOT_USERNAME, downloadDir } from '@config';
import { Cortana } from '@context';
import { downloadFile, scaleImage } from '@libs/files';
import { matchMessage } from '@libs/messages';

export async function kangCmd(ctx: Cortana) {
  const emoji: string = ctx.params[0] || '✅';
  const { type, content: file_id } = matchMessage(ctx.msg.reply_to_message);
  const user = ctx.from;
  let packNum: number = 0;
  let packNameFound: boolean = false;
  const limit: number = 120;
  let packName: string = `a${user.id}_by_${BOT_USERNAME}`;
  let packTitle: string = `${user.first_name} Sticker set v${packNum}`;
  // while (packNameFound == false) {
  try {
    const stickerSet = await ctx.api.getStickerSet(packName);
    if (stickerSet.stickers.length == limit) {
      packNum++;
      packName = `a_${packNum}_${user.id}_by_${BOT_USERNAME}`;
    } else {
      packNameFound = true;
    }
  } catch (error) {
    if (error.message == 'Stickerset_invalid') packNameFound = true;
  }
  // }
  let kangSticker: string = `${Date.now()}.png`;
  let sticker: string;
  if (type == 'photo') {
    const fileUrl = await ctx.getLink(file_id);
    const newFileDir: string = resolve(downloadDir, kangSticker);
    await downloadFile(fileUrl, newFileDir);
    sticker = await scaleImage(newFileDir);
  } else if (type == 'sticker') {
    sticker = file_id;
  } else {
    return ctx.reply('Incorrect format');
  }
  if (packNameFound) {
    await ctx.api.addStickerToSet(user.id, packName, emoji, {
      png_sticker: sticker,
    });
  } else {
    await ctx.api.createNewStickerSet(user.id, packName, packTitle, emoji, {
      png_sticker: sticker,
    });
  }
}
