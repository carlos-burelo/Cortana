import { unlinkSync, promises } from "fs";
import { basename, resolve } from "path";
import Jimp from "jimp";
import { mainDir, _bot } from "../../config";
import axios from "axios";
import { editMessage } from "../libs/messages.lib";

export async function kangSticker(ctx) {
  try {
    
    let file_id;
    if (ctx.message.reply_to_message.sticker) {
      file_id = ctx.message.reply_to_message.sticker.file_id;
    }
    if (ctx.message.reply_to_message.photo) {
      file_id =
        ctx.message.reply_to_message.photo[
          ctx.message.reply_to_message.photo.length - 1
        ].file_id;
    }
    let pack_num: number = 1;
    let pack_name: string = `${ctx.from.first_name}_v${pack_num}_by_${_bot.username}`;
    let found: any;

    try {
      let pack = await ctx.getStickerSet(pack_name);
      if (pack.stickers.length > 120) {
        pack_num++;
        pack_name = `${ctx.from.first_name}_v${pack_num}_by_${_bot.username}`;
      } else {
        found = pack;
      }
    } catch (error) {
      found = undefined;
    }
    let {message_id: msgId} = await ctx.reply('Getting file url ...')
    let url: any = await ctx.telegram.getFileLink(file_id);
    let base: string = `${ctx.from.id}-${basename(url.href)}.png`;
    let spl: string[] = ctx.message.text.split(" ");
    let emoji: string = "🛸";
    if (spl[1]) {
      emoji = spl[1];
    } else {
      if (ctx.message.reply_to_message.sticker?.emoji) {
        emoji = ctx.message.reply_to_message.sticker.emoji;
      }
    }
    let file_dir: string = resolve(
      mainDir,
      "assets",
      "downloads",
      "stickers",
      base
    );
    await editMessage(ctx, msgId, 'Downloading file from telegram ...')
    await downloadImage(url.href, file_dir);
    if (found) {
      if (ctx.message.reply_to_message.photo) {
        await editMessage(ctx, msgId, 'Proccesing photo...')
        let image = await resizeImage(file_dir);
        await image.writeAsync(file_dir);
      }
      try {
        await ctx.addStickerToSet(pack_name, {
          png_sticker: { source: file_dir },
          emojis: emoji,
        });
        unlinkSync(file_dir);
        await editMessage(ctx, msgId, `Sticker añadido, puede encontrarlo [aqui](https://t.me/addstickers/${pack_name})`)
      } catch (error) {
        unlinkSync(file_dir);
        await editMessage(ctx, msgId, error.toString())
        // return error.toString();

      }
    } else {
      if (ctx.message.reply_to_message.photo) {
        let image = await resizeImage(file_dir);
        await image.writeAsync(file_dir);
      }
      try {
        await editMessage(ctx, msgId, 'Creating sticker pack ...')
        await ctx.createNewStickerSet(
          pack_name,
          `${ctx.from.first_name} Kang Pack V${pack_num + 1}`,
          {
            png_sticker: {
              source: file_dir,
            },
            emojis: emoji,
          }
        );
        unlinkSync(file_dir);
        await editMessage(ctx, msgId, `Sticker añadido, puede encontrarlo [aqui](https://t.me/addstickers/${pack_name})`)
      } catch (error) {
        unlinkSync(file_dir);
        await editMessage(ctx, msgId, error.toString())
        // return error.toString();
      }
    }
  } catch (error: any) {
    return error.toString();
  }
}

export async function downloadImage(url, file_dir: string) {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
  });
  await promises.writeFile(file_dir, res.data);
}

export async function resizeImage(file_dir: string) {
  let image = await Jimp.read(file_dir);
  if (image.bitmap.height < 512) {
    image.resize(512, image.bitmap.height);
  } else {
    image.resize(512, 512);
  }
  return image;
}
