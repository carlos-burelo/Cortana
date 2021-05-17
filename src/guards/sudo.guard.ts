import { CommandsType } from "interfaces/guard";
import { db } from "../database";
import { SudoI } from "../interfaces/controllers";

export async function sudo_perms(sudo:SudoI, command:CommandsType):Promise<boolean> {
    const sudos:SudoI[] = await db().get('sudos').value()
    let found:SudoI = sudos.find(s => s.id == sudo.id)
    let r = found.range
    let c = command
    if(found !== undefined){
        if (
            r === 1 && //only range 1
                c == 'sudo' ||
                c == 'eco'  ||
                c == 'send' ||
                c == 'post' 
        ){
            return true
        }
        if(
            r <= 2 && // only range 1 | 2
                c == 'gban' ||
                c == 'title'
        ){

        }
        if( 
            r  <= 3 && // all ganges allowed
            c  == 'promote' || 
            c  == 'mute' || 
            c  == 'demote' || 
            c  == 'pin' ||
            c  == 'unpin' || 
            c  == 'ban' || 
            c  == 'unban' || 
            c  == 'welcome' || 
            c  == 'goodbye' ||
            c  == 'setwellcome' ||
            c  == 'setgoodbye' ||
            c  == 'setrules'
        ){
            return true
        } else {
            false
        }
    }
};