"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilter = exports.getFilters = exports.stopFilter = exports.setFilter = void 0;
const database_1 = require("../../database");
const lang_1 = require("../../lang");
async function setFilter(ctx, newFilter) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let data = database_1.db(ctx.chat)
            .get("filters")
            .find({ id: newFilter.id })
            .value();
        if (data == undefined) {
            database_1.db(ctx.chat).get("filters").push(newFilter).write();
            ctx.replyWithMarkdown(_.filterModule.filterSaved(newFilter.id));
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.setFilter = setFilter;
async function stopFilter(ctx, filter) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let data = database_1.db(ctx.chat).get("filters").find({ id: filter }).value();
        if (data == undefined) {
            return ctx.replyWithMarkdown(_.filterModule.noFoundFilter(filter));
        }
        else {
            database_1.db(ctx.chat).get("filters").remove({ id: filter }).write();
            ctx.replyWithMarkdown(_.filterModule.removedFilter(filter));
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.stopFilter = stopFilter;
async function getFilters(ctx) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let filters = database_1.db(ctx.chat).get("filters").value();
        let { title } = await ctx.getChat();
        if (filters.length !== 0) {
            let text = _.filterModule.title(title);
            filters.forEach((a, i) => {
                text += `${i}  \`${a.id}\`\n`;
            });
            ctx.replyWithMarkdown(text);
        }
        else {
            ctx.replyWithMarkdown(_.filterModule.noFiltersFound);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getFilters = getFilters;
async function getFilter(ctx, filter) {
    const _ = lang_1.getLang(ctx.chat);
    try {
        let filters = database_1.db(ctx.chat).get("filters").value();
        let search = filters.find((a) => a.id.toLowerCase() === filter.toLowerCase());
        if (search == undefined) {
            return ctx.replyWithMarkdown(`El *filtro* \`${filter}\` no existe en mi base de datos`);
        }
        else {
            let text = _.filterModule.filterDesc(filter);
            text += _.filterModule.type(search.type);
            if (search.strings) {
                text += _.filterModule.resp;
                search.strings.map((a, i) => {
                    text += `${i + 1} - ${a}`;
                });
            }
            else {
                text += `*Id:*  \`${search.content}\``;
            }
            return ctx.replyWithMarkdown(text);
        }
    }
    catch (error) {
        ctx.reply(error.toString());
    }
}
exports.getFilter = getFilter;
