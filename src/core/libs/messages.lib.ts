import { Context } from "telegraf";

export async function editMessage(ctx: Context, message_id: number, text: string) {
    ctx.telegram.editMessageText(
        ctx.chat.id,
        message_id,
        `${ctx.chat.id}`,
        text,
        {parse_mode:'Markdown'}
    )
};