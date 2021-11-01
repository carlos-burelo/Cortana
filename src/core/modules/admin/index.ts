import { Bot } from 'grammy';
import { Cortana } from '@context';
import { adminlistCmd } from './adminlist';
import { demoteteCmd } from './demote';
import { permsCmd } from './perms';
import { pinCmd } from './pin';
import { promoteCmd } from './promote';
import { unpinCmd } from './unpin';

export default function adminModule(bot: Bot<Cortana>) {
  bot.command('promote', async (ctx) => await promoteCmd(ctx));
  bot.command('demote', async (ctx) => await demoteteCmd(ctx));
  bot.command(['admins', 'adminlist'], async (ctx) => await adminlistCmd(ctx));
  bot.command('pin', async (ctx) => await pinCmd(ctx));
  bot.command('unpin', async (ctx) => await unpinCmd(ctx));
  bot.command('perms', async (ctx) => await permsCmd(ctx));
}
