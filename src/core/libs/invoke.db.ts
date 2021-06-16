import { FilterI } from "../interfaces";
import { Context } from "telegraf";
import { connect, db } from "../../database";

export async function getFiltersFromDB(ctx:Context):Promise<string[]> {
    await connect(ctx.chat);
    let filters:FilterI[] = db({id:'main'}).get('filters').value();
    let filter_list:string[] = [];
    filters.forEach((a:FilterI)=>{
        filter_list.push(a.id);
    })
    return filter_list  
};