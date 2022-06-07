import { Ctx, Module } from '#cortana'
import { readdirSync } from 'fs'
import { Bot } from 'grammy'
import { join } from 'path'

export const modules = async (bot: Bot<Ctx>) => {
  const files = readdirSync(join(__dirname, './commands'))
  const commands = Promise.all(
    files.map(async file => {
      const cmdName = file.replace('.ts', '')
      const cmd: Module = await import(`./commands/${file}`)
      return bot.command(cmdName, cmd.default)
    })
  )
  return commands
}
