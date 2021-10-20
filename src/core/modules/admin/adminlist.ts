import { ChatMember } from 'grammy/out/platform'
import { Cortana } from '@context'
import { md, log } from '@libs/messages'

export async function adminlistCmd(ctx: Cortana) {
  try {
    const _ = await ctx.lang()
    if (ctx.chat.type == 'private') return ctx.reply(_.global.noPrivateChat)
    const res: ChatMember[] = await ctx.getChatAdministrators()
    let adminlist = `*${_.admin.adminList}*\n\n`
    const admins: ChatMember[] = res.filter((i) => i.status === 'administrator')
    admins.forEach((i) => {
      let name = md(i.user.first_name)
      let last: string
      !i.user.last_name ? (last = '') : (last = md(` ${i.user.last_name}`))
      !name ? (name = 'Deleted account') : name
      adminlist += `• [${name}${last}](tg://user?id=${i.user.id})\n`
    })
    return ctx.replyWithMarkdown(adminlist)
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/)
    log({ ctx, error, __filename, f: 'adminlistCmd()', l })
  }
}
