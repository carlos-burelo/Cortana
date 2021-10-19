import { Cortana } from '../../../context';
import { log } from '../../libs/messages';
import { BiosSQL } from '../../sql/bio.sql';

export async function bioCmd(ctx: Cortana) {
    try {
        const sql = new BiosSQL(ctx);
        const data = await sql.getOneBio();
        // if (data == undefined) 
    } catch (error) {
        const [l] = error.stack.match(/(d+):(d+)/);
        log({ ctx, error, __filename, l, f: 'bioCmd()' });
    }
}