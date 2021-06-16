import { FilterI } from "core/interfaces";
import { Context } from "telegraf";
import { connect, db } from "../../database";

export async function setFilter(ctx:Context,newFilter:FilterI) {
    await connect(ctx.chat)
    if(db(ctx.chat).get('filters').value() == undefined){
        db(ctx.chat).assign({filters:[]}).write()
    }
    let data = db(ctx.chat).get('filters').find({id: newFilter.id}).value();
    if(data == undefined){
        await connect(ctx.chat)
        db(ctx.chat).get('filters').push(newFilter).write()
        ctx.replyWithMarkdown('Se ha añadido el filto: '+`\`${newFilter.id}\``)
    }
};
export async function stopFilter(ctx:Context, filter:string) {
    await connect(ctx.chat)
    if(db(ctx.chat).get('filters').value() == undefined){
        db(ctx.chat).assign({filters:[]}).write()
    }
    let data = db(ctx.chat).get('filters').find({id: filter}).value();
    if(data == undefined){
        ctx.replyWithMarkdown(`El filtro \`${filter}\` no existe en mi base de datos`)
    } else {
        db(ctx.chat).get('filters').remove({id: filter}).write()
        ctx.replyWithMarkdown(`El filtro: \`${filter}\` fue removido`)
    }
};