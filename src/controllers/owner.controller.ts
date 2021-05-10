import { db } from "../database";
import { owner } from "../config";
import { SudoI, UserI } from "../interfaces/controllers";

export async function get_perms(account_id): Promise<boolean> {
    if (account_id == owner.id) {
        return true
    } else {
        return false
    }
};

export async function get_sudos(): Promise<string> {
    const res = await db().get('sudos').value()
    if (res.length == 0) {
        return 'Aun no hay Sudo Users'
    } else {

    }
};
export async function add_sudos(ctx, user: UserI, range: number) {
    let sudo: SudoI = {
        id: user.id,
        first_name: user.first_name,
        username: user.username,
        range: range,
        role: `${await decide_rol(range)}`
    }
    await ctx.setChatAdministratorCustomTitle(user.id, await decide_rol(range))
    await db().get('sudos').push(sudo).write()
    return `${user.first_name} ha sido promovido a ${sudo.role}`
};



//Extra functions

export async function decide_rol(range): Promise<string> {
    let role;
    range == 1 ? role = 'Sudo' :
        range == 2 ? role = 'Manager' :
            range == 3 ? role = 'Moderador' :
                role = 'Null'
    return role
};