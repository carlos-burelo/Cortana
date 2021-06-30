
import { Telegraf } from "telegraf";
import { getModule, searchModule } from "../controllers/npm.controller";

export default function (bot: Telegraf) {
    bot.command('/npm', async (ctx) => {
        if(ctx.message.text.includes('?')){
            let query:string = ctx.message.text.replace('/npm?', '').trim()
            return await searchModule(ctx, query)
        } else {
            let query =ctx.message.text.replace('/npm', '').trim()
            return await getModule(ctx, query)
        }
    });
}
