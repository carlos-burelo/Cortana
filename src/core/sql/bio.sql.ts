import { sql } from ".";
import { Cortana } from "../../context";
import { BiosTable } from "../types/sql";

export class BiosSQL {
    private chatId: number;
    private userId: number
    constructor(ctx: Cortana) {
        this.chatId = ctx.chat.id
        this.userId = ctx.msg.reply_to_message.from.id
    }
    async getOneBio(): Promise<BiosTable | undefined> {
        const { data, error } = await sql.from<BiosTable>('bios')
            .select('content, type, format')
            .eq('id', this.chatId)
            .eq('userId', this.userId)
            .single()
        if (error) return undefined; else return data
    }
    async addBio(bio: BiosTable): Promise<BiosTable | undefined> {
        const { data, error } = await sql.from<BiosTable>('bios')
            .insert(bio)
            .eq('id', this.chatId)
            .eq('userId', this.userId)
            .single()
        if (error) return undefined; else return data
    }
    async removeBio(bio: BiosTable) { // unknow result
        const { data, error } = await sql.from<BiosTable>('bios')
            .delete()
            .eq('id', this.chatId)
            .eq('userId', bio.userId)
            .single()
        if (error) return undefined; else return data
    }
    async updateBio(bio: BiosTable) {
        const { data, error } = await sql.from<BiosTable>('bios')
            .update(bio)
            .eq('id', this.chatId)
            .eq('userId', bio.userId)
            .single()
        if (error) return undefined; else return data
    }
}