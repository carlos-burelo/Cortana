import { Bot } from 'grammy'
import { BOT_TOKEN } from '#enviroment'
import { modules } from './app'
import { Ctx } from '#cortana'

const start = async () => {
  const bot = new Bot(BOT_TOKEN, {
    ContextConstructor: Ctx,
  })
  await modules(bot)
  await bot.start()
}

start()
