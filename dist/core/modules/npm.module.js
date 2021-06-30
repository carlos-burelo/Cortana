"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const npm_controller_1 = require("../controllers/npm.controller");
function default_1(bot) {
    bot.command('/npm', async (ctx) => {
        if (ctx.message.text.includes('?')) {
            let query = ctx.message.text.replace('/npm?', '').trim();
            return await npm_controller_1.searchModule(ctx, query);
        }
        else {
            let query = ctx.message.text.replace('/npm', '').trim();
            return await npm_controller_1.getModule(ctx, query);
        }
    });
}
exports.default = default_1;
