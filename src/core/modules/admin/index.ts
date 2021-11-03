import { Cortana } from '@context';
import { Bot } from 'grammy';
import { adminlistCmd } from './adminlist';
import { demoteteCmd } from './demote';
import { linkCmd } from './link';
import { permsCmd } from './perms';
import { pinCmd } from './pin';
import { promoteCmd } from './promote';
import { setpermsCmd } from './setperms';
import { unpinCmd } from './unpin';

export default function adminModule(bot: Bot<Cortana>) {
  bot.command('promote', async (ctx) => await promoteCmd(ctx));
  bot.command('demote', async (ctx) => await demoteteCmd(ctx));
  bot.command(['admins', 'adminlist'], async (ctx) => await adminlistCmd(ctx));
  bot.command('pin', async (ctx) => await pinCmd(ctx));
  bot.command('unpin', async (ctx) => await unpinCmd(ctx));
  bot.command('perms', async (ctx) => await permsCmd(ctx));
  bot.command(['link', 'invitelink'], async (ctx) => await linkCmd(ctx));
  bot.command('setperms', async (ctx) => await setpermsCmd(ctx));
}
