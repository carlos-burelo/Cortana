import { Bot } from 'grammy'
import { Cortana } from '@context'
import { fwCmd } from './fw'
import { magiskCmd } from './magisk'
import { twrpCmd } from './twrp'

export default function androidModule(bot: Bot<Cortana>) {
  bot.command('fw', async (ctx) => fwCmd(ctx))
  bot.command('twrp', async (ctx) => twrpCmd(ctx))
  bot.command('magisk', async (ctx) => magiskCmd(ctx))
}
