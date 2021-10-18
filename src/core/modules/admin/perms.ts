import { Cortana } from "../../../context";
import { log } from "../../libs/messages";

export async function perms(ctx: Cortana) {
    try {
        const { perms: _, global } = await ctx.lang();
        if (ctx.chat.type == 'private') {
            return ctx.reply(global.noPrivateChat);
        }
        let text: string
        if (!ctx.message.reply_to_message) {
            let { permissions: p, title }: any = await ctx.getChat();
            text = `${_.title(title, false)}\n\n`;
            text += `${_.can_send_messages(p['can_send_messages'])}\n`;
            text += `${_.can_send_media_messages(p['can_send_media_messages'])}\n`;
            text += `${_.can_send_polls(p['can_send_polls'])}\n`;
            text += `${_.can_send_other_messages(p['can_send_other_messages'])}\n`;
            text += `${_.can_add_web_page_previews(p['can_add_web_page_previews'])}\n`;
            text += `${_.can_change_info(p['can_change_info'])}\n`;
            text += `${_.can_invite_users(p['can_invite_users'])}\n`;
            text += `${_.can_pin_messages(p['can_pin_messages'])}\n`;
        } else {
            let id = ctx.message.reply_to_message.from.id;
            let p = await ctx.getChatMember(id);
            text = `${_.title(p.user.first_name, true)}\n\n`;
            text += `${_.can_be_edited(p['can_send_messages'])}\n`;
            text += `${_.can_change_info(p['can_change_info'])}\n`;
            text += `${_.can_delete_messages(p['can_delete_messages'])}\n`;
            text += `${_.can_invite_users(p['can_invite_users'])}\n`;
            text += `${_.can_manage_chat(p['can_manage_chat'])}\n`;
            text += `${_.can_manage_voice_chats(p['can_manage_voice_chats'])}\n`;
            text += `${_.can_promote_members(p['can_promote_members'])}\n`;
            text += `${_.can_pin_messages(p['can_pin_messages'])}\n`;
            text += `${_.can_restrict_members(p['can_restrict_members'])}\n`;
            text += `${_.is_anonymous(p['is_anonymous'])}\n`;
        }
        return ctx.replyWithMarkdown(text);
    } catch (error) {
        const [l] = error.stack.match(/(d+):(d+)/);
        log({ ctx, error, __filename, l, f: 'permsCmd()' });
    }
}