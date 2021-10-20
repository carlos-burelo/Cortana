import { Bot } from 'grammy'
import { Cortana } from '@context'
import { blockCmd } from './block'

export default function blacklistModule(bot: Bot<Cortana>) {
  bot.command('block', async (ctx) => blockCmd(ctx))
}
