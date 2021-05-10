import { AccountI, BioI } from "interfaces/controllers";
import { check_account, create_account } from "../database";
import { db } from "../database";

export async function get_bio(account_id: string, user: any): Promise<string> {
    try {
        if (await check_account(account_id.toString()) == true) {
            const bio: BioI = db()
                .get("accounts")
                .find({ id: account_id })
                .get('bios')
                .find({ id: user.id.toString() })
                .value()
            if (bio !== undefined) {
                return bio.text
            } else {
                return `${user.first_name} no tiene una biografia`
            }
        } else {
            return 'Cuenta no registrada'
        }
    } catch (error) {
        return 'Error en bio.controller.ts'
    }
}
export async function add_or_update_bio(data: AccountI, bioModel: BioI) {
    try {
        if (await check_account(data.account.id.toString()) == true) {
            const bio: BioI = db().get("accounts").find({ id: data.account.id.toString() }).get('bios').find({ id: data.user.id.toString() }).value()
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
    await db()
        .get("accounts")
        .find({ id: data.account.id.toString() })
        .get('bios')
        .push(bio)
        .write();
}
export async function update_bio(data: AccountI, bio: BioI) {
    await db()
        .get('accounts')
        .find({ id: data.account.id.toString() })
        .get('bios').find({ id: data.user.id.toString() })
        .assign(bio)
        .write();
}
export async function delete_bio(account_id: string, bio_id: string) {
    await db().get('accounts').find({ id: account_id }).get('bios').remove({ id: bio_id }).write()
    return 'Biografia eliminada'
}