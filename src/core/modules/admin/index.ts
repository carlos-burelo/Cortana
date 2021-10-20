import { Bot } from 'grammy'
import { Cortana } from '@context'
import { adminlistCmd } from './adminlist'
import { demoteteCmd } from './demote'
import { permsCmd } from './perms'
import { pinCmd } from './pin'
import { promoteCmd } from './promote'
import { unpinCmd } from './unpin'

export default function adminModule(bot: Bot<Cortana>) {
  bot.command('promote', async (ctx) => promoteCmd(ctx))
  bot.command('demote', async (ctx) => demoteteCmd(ctx))
  bot.command(['admins', 'adminlist'], async (ctx) => adminlistCmd(ctx))
  bot.command('pin', async (ctx) => pinCmd(ctx))
  bot.command('unpin', async (ctx) => unpinCmd(ctx))
  bot.command('perms', async (ctx) => permsCmd(ctx))
}
