"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const android_controller_1 = require("../controllers/android.controller");
const lang_1 = require("../../lang");
function default_1(bot) {
    bot.command("/magisk", async (ctx) => {
        await android_controller_1.getMagisk(ctx);
    });
    bot.command("/fw", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let msg = ctx.update.message.text.split(" ");
        let model = msg[1];
        if (!model) {
            return ctx.reply(_.androidModule.noModel);
        }
        model.match(/SM-/i) ? (model = model.replace(/SM-/i, "")) : model;
        model = model.toUpperCase();
        let csc = msg[2];
        if (!csc) {
            return ctx.reply(_.androidModule.noCsc);
        }
        csc = csc.toUpperCase();
        await android_controller_1.getFirmware(ctx, model, csc);
    });
    bot.command("/twrp", async (ctx) => {
        const _ = lang_1.getLang(ctx.chat);
        let device = ctx.message.text.split(" ")[1];
        if (!device) {
            return ctx.reply(_.androidModule.noModel);
        }
        await android_controller_1.getTWRP(ctx, device);
    });
}
exports.default = default_1;
