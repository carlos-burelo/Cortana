import { Bot } from 'grammy';
import { Cortana } from '../../../context';

export default function nodeModule(bot: Bot<Cortana>) {
    bot.command('bash', async (ctx) => {
        const { bashCmd } = await import('./bash');
        return await bashCmd(ctx);
    });
}