"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPerms = exports.getChatPerms = exports.unPinMessage = exports.pinMessage = exports.getAdminList = exports.promoteMe = exports.demoteUser = exports.promoteUser = exports.decideDemote = exports.decidePromote = void 0;
const config_1 = require("../../config");
const lang_1 = require("../../lang");
const validators_1 = require("../libs/validators");
async function decidePromote(ctx, emit, recep) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        if (recep.status == "creator") {
            return ctx.reply(_.helpers.anyActionCreator("promote"));
        }
        if (recep.user.id == config_1._bot.id) {
            await promoteUser(ctx, emit.user, recep.user);
        }
        if (emit.user.id == config_1._owner.id) {
            await promoteUser(ctx, emit.user, recep.user);
        }
        if (emit.user.id == recep.user.id) {
            return ctx.reply(_.helpers.noYourAutoAction("promote"));
        }
        if (emit.status == "member" && recep.status == "administrator") {
            return ctx.reply(_.helpers.memberActionAdmin("promote"));
        }
        if (emit.status == "administrator" && recep.status == "administrator") {
            return ctx.reply(_.helpers.adminActionAdmin("promote"));
        }
        await promoteUser(ctx, emit.user, recep.user);
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.decidePromote = decidePromote;
async function decideDemote(ctx, emit, recep) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        if (recep.user.id == config_1._bot.id) {
            return ctx.reply(_.helpers.noAutoAction("demoteme"));
        }
        if (recep.status == "creator") {
            return ctx.reply(_.helpers.anyActionCreator("demote"));
        }
        if (emit.user.id == config_1._owner.id) {
            await demoteUser(ctx, emit.user, recep.user);
        }
        if (validators_1.isSudo(recep.user.id)) {
            return ctx.reply(_.global.preventSudo(recep.user.first_name));
        }
        if (emit.user.id == emit.user.id) {
            return ctx.reply(_.helpers.noYourAutoAction("demote"));
        }
        if (emit.status == "member" && recep.status == "administrator") {
            return ctx.reply(_.helpers.memberActionAdmin("demote"));
        }
        if (emit.status == "administrator" && recep.status == "administrator") {
            return ctx.reply(_.helpers.adminActionAdmin("demote"));
        }
        await demoteUser(ctx, emit.user, recep.user);
    }
    catch (error) {
        return ctx.reply(error.toString());
    }
}
exports.decideDemote = decideDemote;
async function promoteUser(ctx, A, B) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        await ctx.promoteChatMember(B.id, {
            can_change_info: true,
            can_delete_messages: true,
            can_invite_users: true,
            can_pin_messages: true,
            can_promote_members: true,
            can_restrict_members: true,
            can_manage_chat: true,
        });
        return ctx.reply(_.helpers.anyActionSucces("promoted", A.first_name, B.first_name));
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.promoteUser = promoteUser;
async function demoteUser(ctx, A, B) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        await ctx.promoteChatMember(B.id, {
            can_change_info: false,
            can_post_messages: false,
            can_edit_messages: false,
            can_delete_messages: false,
            can_invite_users: false,
            can_restrict_members: false,
            can_pin_messages: false,
            can_promote_members: false,
            can_manage_chat: false,
        });
        return ctx.reply(_.helpers.anyActionSucces("demote", A.first_name, B.first_name));
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.demoteUser = demoteUser;
async function promoteMe(ctx) {
    try {
        ctx.promoteChatMember(ctx.message.from.id, {
            can_change_info: true,
            can_delete_messages: true,
            can_invite_users: true,
            can_pin_messages: true,
            can_promote_members: true,
            can_restrict_members: true,
            can_manage_chat: true,
        });
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.promoteMe = promoteMe;
// GET ADMIN LIST
async function getAdminList(ctx) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        let admins = await ctx.getChatAdministrators();
        let adminlist = `*${_.adminMoodule.adminList}*\n\n`;
        admins.map((admin, i) => {
            if (admin.status == "administrator") {
                let name = admin.user.first_name.replace(/[\]\[\(\)_*]/g, "^");
                !name ? (name = "Deleted account") : name;
                adminlist += `• [${name}](tg://user?id=${admin.user.id})\n`;
            }
        });
        ctx.replyWithMarkdown(adminlist);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getAdminList = getAdminList;
async function pinMessage(ctx, message_id, arg) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        ctx.pinChatMessage(message_id, {
            disable_notification: arg == "-s" ? true : false,
        });
        ctx.reply(_.adminMoodule.pinSuccess);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.pinMessage = pinMessage;
async function unPinMessage(ctx, message_id) {
    try {
        const _ = lang_1.getLang(ctx.chat);
        if (!message_id) {
            await ctx.unpinAllChatMessages();
            return ctx.reply(_.adminMoodule.unPinAllSuccess);
        }
        else {
            await ctx.unpinChatMessage(message_id);
            return ctx.reply(_.adminMoodule.unPinSuccess);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.unPinMessage = unPinMessage;
async function getChatPerms(ctx, p, title) {
    try {
        const { permissions: _ } = lang_1.getLang(ctx.chat);
        let text = `${_.title(title)}\n\n`;
        text += `${_.can_send_messages(p["can_send_messages"])}\n`;
        text += `${_.can_send_media_messages(p["can_send_media_messages"])}\n`;
        text += `${_.can_send_polls(p["can_send_polls"])}\n`;
        text += `${_.can_send_other_messages(p["can_send_other_messages"])}\n`;
        text += `${_.can_add_web_page_previews(p["can_add_web_page_previews"])}\n`;
        text += `${_.can_change_info(p["can_change_info"])}\n`;
        text += `${_.can_invite_users(p["can_invite_users"])}\n`;
        text += `${_.can_pin_messages(p["can_pin_messages"])}\n`;
        ctx.replyWithMarkdown(text);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getChatPerms = getChatPerms;
async function getUserPerms(ctx, userId) {
    try {
        let p = await ctx.getChatMember(userId);
        const { permissions: _ } = lang_1.getLang(ctx.chat);
        let text = `${_.title(p.user.first_name)}\n\n`;
        text += `${_.can_be_edited(p["can_send_messages"])}\n`;
        text += `${_.can_change_info(p["can_change_info"])}\n`;
        text += `${_.can_delete_messages(p["can_delete_messages"])}\n`;
        text += `${_.can_invite_users(p["can_invite_users"])}\n`;
        text += `${_.can_manage_chat(p["can_manage_chat"])}\n`;
        text += `${_.can_manage_voice_chats(p["can_manage_voice_chats"])}\n`;
        text += `${_.can_promote_members(p["can_promote_members"])}\n`;
        text += `${_.can_pin_messages(p["can_pin_messages"])}\n`;
        text += `${_.can_restrict_members(p["can_restrict_members"])}\n`;
        text += `${_.is_anonymous(p["is_anonymous"])}\n`;
        ctx.replyWithMarkdown(text);
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getUserPerms = getUserPerms;
