import { commands } from "../shared/commands";
import { Telegraf } from "telegraf";

export default function (bot: Telegraf) {
  bot.telegram.setMyCommands(commands);
}
