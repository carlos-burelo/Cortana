import { Bot } from 'grammy';
import { Cortana } from '@context';
import { stickerHandleCmd } from './stickers';

export default function handlersModule(bot: Bot<Cortana>) {
  bot.on(':sticker', async (ctx) => await stickerHandleCmd(ctx));
}
