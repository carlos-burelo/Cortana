import { start_msg } from "../media/strings";
import { start_buttons } from "../media/buttons";

export default function (bot) {
  bot.start((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, start_msg, start_buttons);
  });
}
