import { stickers } from "../shared/stickers";
import { Telegraf } from "telegraf";
import { owner, _bot } from "../config";
import { format_message } from "../controllers/admin.controller";
import { get_access } from "../guards/admin.guard";

export default function (bot: Telegraf) {
    bot.command("/adminlist", async (ctx) => {
        if (ctx.update.message.chat.type == "supergroup") {
            let admins = await ctx.getChatAdministrators();
            const res = await format_message(admins)
            ctx.reply(res);
        } else {
            ctx.reply("No estas en un grupo");
        }
    });
    bot.command('/promote', async (ctx) => {
        if (ctx.chat.type == 'private') {
            ctx.reply('Este comando solo funciona en grupos');
            return;
        } else {
            if (!ctx.message.reply_to_message) {
                ctx.reply('No detecto al usuario para promover');
                return
            } else {
                const emisor = await ctx.getChatMember(ctx.update.message.from.id);
                const receptor = await ctx.getChatMember(ctx.update.message.reply_to_message.from.id);
                let operation: string[] = ['promover', 'promovido']
                let { message, status } = await get_access(emisor, receptor, operation)
                if (status == true) {
                    try {
                        await ctx.promoteChatMember(
                            ctx.update.message.reply_to_message.from.id,
                            {
                                can_change_info: true,
                                can_delete_messages: true,
                                can_invite_users: true,
                                can_pin_messages: true,
                                can_promote_members: true,
                                can_restrict_members: true,
                                can_manage_chat: true
                            }
                        );
                        ctx.reply(message)
                    } catch (err) {
                        ctx.reply(err.toString())
                    }

                } else {
                    ctx.reply(message);
                    return
                }
            }
        }
    });
    bot.command('/demote', async (ctx) => {
        if (ctx.chat.type == 'private') {
            ctx.reply('Este comando solo funciona en grupos');
            return;
        } else {
            if (!ctx.message.reply_to_message) {
                ctx.reply('No detecto al usuario para degradar');
                return
            } else {
                const emisor = await ctx.getChatMember(ctx.update.message.from.id);
                const receptor = await ctx.getChatMember(ctx.update.message.reply_to_message.from.id);
                let operation: string[] = ['degradar', 'degradado']
                let { message, status } = await get_access(emisor, receptor, operation)
                if (status == true) {
                    try {
                        await ctx.promoteChatMember(
                            ctx.update.message.reply_to_message.from.id,
                            {
                                can_change_info: false,
                                can_post_messages: false,
                                can_edit_messages: false,
                                can_delete_messages: false,
                                can_invite_users: false,
                                can_restrict_members: false,
                                can_pin_messages: false,
                                can_promote_members: false,
                                can_manage_chat: false
                            }
                        );
                        ctx.reply(message);
                    } catch (err) {
                        ctx.reply(err.toString())
                        return;
                    }
                } else {
                    ctx.reply(message);
                    return
                }
            }
        }
    });
    bot.command("/pin", async (ctx) => {
        if (ctx.update.message.chat.type == "supergroup") {
            if (ctx.message.reply_to_message) {
                ctx.pinChatMessage(ctx.message.reply_to_message.message_id);
                ctx.reply("📌 Mensage anclado");
            } else {
                let ctx_text = ctx.update.message.text.replace('/add', '').replace(' ', '');
                if (ctx_text == '') {
                    ctx.reply('Agrege un nombre para la nota');
                    return;
                }
                let pin_name = ctx_text.split(' ');
                let nombre = pin_name[0];
                if (pin_name[1] == undefined) {
                    const { message_id } = ctx.update.message.reply_to_message
                    ctx.reply('Agrege contenido a la nota', { reply_to_message_id: message_id });
                    return;
                }
                let contenido = ctx_text.replace(`${nombre}`, '').replace(' ', '')
                let { message_id } = await ctx.reply(contenido);
                ctx.pinChatMessage(message_id)
            }
        } else {
            ctx.reply("No puedo anclar mensages aqui");
        }
    });
    bot.command("/unpin", async (ctx) => {
        try {
            await ctx.unpinAllChatMessages()
            ctx.reply("Mensages desanclados");
        } catch (error) {
            ctx.reply("No nay nada anclado");
        }
    });
    bot.command("/link", async (ctx) => {
        if (ctx.update.message.chat.type == "supergroup") {
            const { invite_link, title }: any = await ctx.getChat()
            ctx.replyWithMarkdown(`[${title}](${invite_link})`)
        } else {
            ctx.reply("Solo puedo obtener enlaces en grupos");
        }
    });
    bot.command('/perms', async (ctx) => {
        let {permissions:perms, title}:any = await ctx.getChat()
        ctx.replyWithMarkdown(
            `*Permisos en ${title}*\n\n`+
            `*can_send_messages:*  ${perms.can_send_messages}\n`+
            `*can_send_media_messages:*  ${perms.can_send_media_messages}\n`+
            `*can_send_polls:*  ${perms.can_send_polls}\n`+
            `*can_send_other_messages:*  ${perms.can_send_other_messages}\n`+
            `*can_add_web_page_previews:*  ${perms.can_add_web_page_previews}\n`+
            `*can_change_info:*  ${perms.can_change_info}\n`+
            `*can_invite_users:*  ${perms.can_invite_users}\n`+
            `*can_pin_messages:*  ${perms.can_pin_messages}\n`
        )
    });
}