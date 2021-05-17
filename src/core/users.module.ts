// import axios from "axios";
// import { owner } from "../config";
// import { Telegraf } from "telegraf";
// import { getGroupInfo, getInfo } from "../controllers/users.controller";

// export default function(bot:Telegraf) {
//     bot.command("/info", async (ctx) => {
//         let reply_message = ctx.message.reply_to_message
//         if(ctx.chat.type == 'private'){
//             if (!reply_message) {
//                 try {
//                     const user = await ctx.getChatMember(ctx.message.from.id);
//                     const res = await getInfo(user)
//                     ctx.replyWithHTML(res, { disable_web_page_preview: true})
//                 } catch (error) {
//                     ctx.reply('Error')
//                 }
//             } else {
//                 try {
//                     const user = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
//                     const res = await getInfo(user)
//                     ctx.replyWithHTML(res, { disable_web_page_preview: true})
//                 } catch (error) {
//                     ctx.reply('error', {reply_to_message_id: ctx.message.message_id})
//                 }
//             }
//         } else {
//             if (!reply_message) {
//                 try {
//                     const chat = await ctx.getChat()
//                     const res = await getGroupInfo(chat)
//                     ctx.replyWithHTML(res,{  disable_web_page_preview: true} )
//                 } catch (error) {
//                     ctx.reply('Error')
//                 }
//             } else {
//                 try {
//                     const user = await ctx.getChatMember(ctx.message.reply_to_message.from.id);
//                     const res = await getInfo(user)
//                     ctx.replyWithHTML(res, { disable_web_page_preview: true})
//                 } catch (error) {
//                     ctx.reply('error', {reply_to_message_id: ctx.message.message_id})
//                 }
//             } 
//         }
//     });
//     bot.command("/id", (ctx) => {
//     if (ctx.update.message.reply_to_message) {
//         const id = ctx.update.message.reply_to_message.from.id;
//         const USER = ctx.update.message.reply_to_message.from.first_name;
//         ctx.replyWithHTML(`El Id de ${USER} es : <code>${id}</code>`);
//     } else {
//         const id = ctx.message.chat.id;
//         if (ctx.message.chat.type == "supergroup") {
//         ctx.replyWithHTML(`El Id del grupo es: ${id}`);
//         }
//         if (ctx.message.chat.type == "private") {
//         ctx.replyWithHTML(`Tu id es: ${id}`);
//         }
//     }
//     });
//     bot.command('/me', async(ctx) => {
//         try {
//           const id = ctx.update.message.from.id;
//           let res = await axios.get(`${owner.db}/bios/${id}`);
//           if (res.data == '') {
//             ctx.reply('Biografia vacia');
//             return
//           }
//           const { message_id } = ctx.message;
//           ctx.reply(res.data.text, { reply_to_message_id: message_id })
//           return;
//         } catch (error) {
//           ctx.reply('No cuentas con una biografia')
//         }
//     });
// }; 