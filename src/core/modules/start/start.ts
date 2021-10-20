import { Image } from '@config'
import { Cortana } from '@context'
import { buttonBuilder } from '@libs/buttons'
import { log, md } from '@libs/messages'

export async function startCmd(ctx: Cortana) {
  try {
    const { start: _ } = await ctx.lang()
    const user = ctx.from.first_name
    const buttons = buttonBuilder(_.btns, 2)
    ctx.replyWithPhoto(Image, {
      reply_markup: buttons,
      caption: md(_.msg(user)),
      parse_mode: 'Markdown'
    })
  } catch (error) {
    const [l] = error.stack.match(/(d+):(d+)/)
    log({ ctx, error, __filename, l, f: 'startCmd()' })
  }
}
