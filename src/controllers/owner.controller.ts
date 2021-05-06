import { owner } from "../config";

export async function get_perms(account_id):Promise<boolean> {
    if(account_id == owner.id){
        return true
    } else {
        
    }
};