import { Ctx } from '#cortana'
import { User, ChatMember } from 'grammy/out/platform.node'

type ChatParticipants = Promise<{
  sender: User
  receiver: User
}>

type ChatMembers = Promise<{
  sender: ChatMember
  receiver: ChatMember
}>

export const useGetUsers = async (ctx: Ctx): ChatParticipants => {
  const type = ctx.chat?.type
  const userA = ctx.from as User
  const user2Default = ctx.update.message?.reply_to_message?.from as User
  const userB = type === 'private' ? ctx.me : user2Default || ctx.me
  return {
    sender: userA,
    receiver: userB,
  }
}

export const useGetUserPerms = async (ctx: Ctx): ChatMembers => {
  const type = ctx.chat?.type
  const defaultReceiverId = ctx.update.message?.reply_to_message?.from?.id
  const sender = await ctx.getChatMember(ctx.from?.id as number)
  const receiver =
    type === 'private'
      ? await ctx.getChatMember(ctx.me.id)
      : await ctx.getChatMember(defaultReceiverId || ctx.me.id)

  return {
    sender,
    receiver,
  }
}
