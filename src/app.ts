import { CortanaCtx } from '#cortana'
import { readdirSync } from 'fs'
import { Bot } from 'grammy'
import { join } from 'path'

export const modules = async (bot: Bot<CortanaCtx>) => {
  const files = readdirSync(join(__dirname, './commands'))
  const commands = Promise.all(
    files.map(async file => {
      const cmd = await import(`./commands/${file}`)
      return cmd.default(bot)
    })
  )
  return commands
}
