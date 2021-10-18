import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function adminModule(bot: Bot<Cortana>) {
  bot.command('promote', async (ctx) => {
    const { promoteCmd } = await import('./promote');
    return await promoteCmd(ctx);
  });
  bot.command('demote', async (ctx) => {
    const { demoteteCmd } = await import('./demote');
    return await demoteteCmd(ctx);
  });
  bot.command(['admins', 'adminlist'], async (ctx) => {
    const { adminlistCmd } = await import('./adminlist');
    return await adminlistCmd(ctx);
  });
  bot.command('pin', async (ctx) => {
    const { pinCmd } = await import('./pin');
    return await pinCmd(ctx);
  });
  bot.command('unpin', async (ctx) => {
    const { unpinCmd } = await import('./unpin');
    return await unpinCmd(ctx);
  });
}