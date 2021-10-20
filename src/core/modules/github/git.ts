import { Cortana } from '@context'
import axios, { AxiosResponse } from 'axios'
import { GITHUB_API } from '@config'
import { log } from '@libs/messages'
import { buttonBuilder } from '@libs/buttons'

export async function gitCmd(ctx: Cortana) {
  const { github: _ } = await ctx.lang()
  try {
    const match: string[] = ctx.params
    if (!match || match.length <= 0) return ctx.replyWithMarkdown(_.userNotFound)
    const [user]: string[] = match
    let res: AxiosResponse
    try {
      res = await axios.get(`${GITHUB_API}/users/${user}`)
    } catch (e) {
      return ctx.replyWithMarkdown(_.profileNotFound)
    }
    const i = res.data
    const template = _.gitTemplate(i.login, i.name, i.type, i.bio, i.public_repos, i.location)
    const buttons = [
      { text: _.viewProfile, url: i.html_url },
      ...(i.blog ? [{ text: _.website, url: i.blog }] : []),
      {
        text: `${_.repository}s`,
        url: `https://github.com/${i.login}?tab=repositories`,
      },
    ]
    return ctx.replyWithDocument(i.avatar_url, {
      caption: template,
      parse_mode: 'Markdown',
      reply_markup: buttonBuilder(buttons, 2),
    })
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/)
    log({ ctx, error, __filename, l, f: 'gitCommand()' })
  }
}
