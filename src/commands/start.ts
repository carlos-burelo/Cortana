import { Cmd } from '#types'
import { useGetUsers } from '#hooks/chat'
import { buttonBuilder } from '#utils/buttons'

export default function (bot: Cmd) {
  bot.command('start', async ctx => {
    const { sender } = await useGetUsers(ctx)
    ctx.send(ctx.l._start.message(sender.first_name), {
      reply_markup: buttonBuilder(ctx.l._start.buttons),
    })
  })
}
