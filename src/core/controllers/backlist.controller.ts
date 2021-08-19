import { Context } from 'telegraf';
import { log } from '../libs/messages';
// import DB from '../db/backlist.db'

export async function getBlackList(ctx: Context) {
  try {
    // const db = new DB(ctx);
    // db.get()
  } catch (error) {
    const [l] = error.stack.match(/(\d+):(\d+)/);
    log({ ctx, error, __filename, f: 'getBlackList()', l });
  }
}
