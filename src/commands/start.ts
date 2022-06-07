import { useGetUsers } from '#hooks/chat'
import { Ctx } from '#cortana'

export default async (ctx: Ctx) => {
  const { sender } = await useGetUsers(ctx)
  return ctx.send(`Hello ${sender.first_name}!`)
}
