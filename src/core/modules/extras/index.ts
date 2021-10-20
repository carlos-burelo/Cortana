import { Bot } from 'grammy'
import { Cortana } from '@context'
import { mdv2Cmd } from './mdv2'
import { mdv2helpCmd } from './mdv2help'

export default function extrasModule(bot: Bot<Cortana>) {
  bot.command('mdv2', async (ctx) => mdv2Cmd(ctx))
  bot.command('mdv2help', async (ctx) => mdv2helpCmd(ctx))
}
