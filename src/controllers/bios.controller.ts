import { AccountI, BioI } from "interfaces/controllers";
import { db, check_account, create_account, connect } from "../database";

export async function get_bio(account: any, user: any): Promise<string> {
    let user_bio = user.id.toString()
    let account_id = account.id.toString()
    try {
        if (await check_account(account_id) == true) {
            await connect(account)
            const bio: BioI = db(account)
                .get('bios')
                .find({ id: user_bio })
                .value()
                
            if (bio !== undefined) {
                return bio.text
            } else {
                return `${user.first_name} no tiene una biografia`
            }
        } else {
            await create_account(account)
            return `${user.first_name} no tiene una biografia`
        }
    } catch (error) {
        return 'Error en bio.controller.ts'
    }
}
export async function add_or_update_bio(data: AccountI, bioModel: BioI) {
    try {
        if (await check_account(data.account.id.toString()) == true) {
            let account = data.account
            let bio_user = data.user.id.toString() 
            await connect(account)
            const bio: BioI = db(account)
                .get('bios')
                .find({ id: bio_user })
                .value()
            if (bio == undefined) {
                await add_bio(data, bioModel)
                return 'Biografia creada'
            } else {
                await update_bio(data, bioModel)
                return 'Biografia actualizada'
            }
        } else {
            await create_account(data.account)
            await add_bio(data, bioModel)
            return 'Biografia creada'
        }
    } catch (error) {
        return 'Error en bio.controller.ts'
    }
}
export async function add_bio(data: AccountI, bio: BioI) {
    await connect(data.account)
    await db(data.account)
        .get('bios')
        .push(bio)
        .write();
}
export async function update_bio(data: AccountI, bio: BioI) {
    await connect(data.account)
    await db(data.account)
        .get('bios')
        .find({ id: data.user.id.toString() })
        .assign(bio)
        .write();
}
export async function delete_bio(account, bio_id: string) {
    await connect(account)
    await db(account)
    .get('bios')
    .remove({ id: bio_id }).write()
    return 'Biografia eliminada'
}