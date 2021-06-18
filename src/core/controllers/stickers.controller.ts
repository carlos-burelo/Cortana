import axios from "axios";
import { renameFile } from "../libs/download.files";
import { promises, unlinkSync } from "fs";
import Jimp from "jimp";
import { basename, resolve } from "path";
import { Context } from "telegraf";
import { downloadDir, mainDir, _bot } from "../../config";
import { editMessage } from "../libs/messages.lib";

export async function getStickers(
  ctx: Context,
  query: string,
  page: number
): Promise<void> {
  let { message_id: msgI } = await ctx.replyWithMarkdown(
    "`Buscando sticker spacks...`"
  );
  let url = `https://combot.org/telegram/stickers?page${
    !page ? (page = 1) : page
  }=&q=`;
  let res = await axios.get(`${url}${query}`);
  console.log(`${url}${query}`);
  console.log(res);
}

export async function downloadSticker(ctx: Context, url: string, sticker: any) {
  let { message_id: msgId } = await ctx.replyWithMarkdown(
    "`Descargando sticker...`"
  );
  let file_dir: string = resolve(downloadDir, "stickers", `${basename(url)}`);
  await downloadImage(url, file_dir);
  let file = await renameFile(
    resolve(downloadDir, "stickers"),
    basename(url),
    "sticker.png"
  );
  await ctx.deleteMessage(msgId);
  await ctx.replyWithDocument(
    {
      source: file,
    },
    {
      parse_mode: "Markdown",
      caption:
        `*Sticker Pack:* [${sticker.set_name}](https://t.me/addstickers/${sticker.set_name})\n\n` +
        `*Ancho:* _${sticker.width}_ px\n` +
        `*Alto:* _${sticker.height}_ px\n` +
        `*Emoji:* ${sticker.emoji}\n` +
        `*Animado:* _${sticker.is_animated == false ? "No" : "Si"}_\n` +
        `*Tamaño:* _${Math.round(sticker.file_size / 1024)} kb_`,
    }
  );
  unlinkSync(file);
}

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
    let { message_id: msgId } = await ctx.reply("`Obteniendo url...`", {
      parse_mode: "Markdown",
    });
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
    await editMessage(ctx, msgId, "`Descargando imagen...`");
    await downloadImage(url.href, file_dir);
    if (found) {
      if (ctx.message.reply_to_message.photo) {
        await editMessage(ctx, msgId, "`Procesando imagen...`");
        let image = await resizeImage(file_dir);
        await image.writeAsync(file_dir);
      }
      try {
        await ctx.addStickerToSet(pack_name, {
          png_sticker: { source: file_dir },
          emojis: emoji,
        });
        unlinkSync(file_dir);
        await editMessage(
          ctx,
          msgId,
          `Sticker añadido, puede encontrarlo [aqui](https://t.me/addstickers/${pack_name})`
        );
      } catch (error) {
        unlinkSync(file_dir);
        await editMessage(ctx, msgId, error.toString());
      }
    } else {
      if (ctx.message.reply_to_message.photo) {
        let image = await resizeImage(file_dir);
        await image.writeAsync(file_dir);
      }
      try {
        await editMessage(ctx, msgId, "Creating sticker pack ...");
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
        await editMessage(
          ctx,
          msgId,
          `Sticker añadido, puede encontrarlo [aqui](https://t.me/addstickers/${pack_name})`
        );
      } catch (error) {
        unlinkSync(file_dir);
        await editMessage(ctx, msgId, error.toString());
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
  let imageFile = await Jimp.read(file_dir);
  let { bitmap: image } = imageFile;
  if (image.height < 512 && image.width < 512) {
    let size1 = image.width;
    let size2 = image.height;
    let size1new: number;
    let size2new: number;
    if (image.width > image.height) {
      let scale: number = 512 / size1;
      size1new = 512;
      size2new = size2 * scale;
    } else {
      let scale: number = 512 / size2;
      size1new = size1 * scale;
      size2new = 512;
    }
    size1new = Math.floor(size1new);
    size2new = Math.floor(size2new);
    imageFile.resize(size1new, size2new);
  } else {
    imageFile.resize(512, 512);
  }
  return imageFile;
}
