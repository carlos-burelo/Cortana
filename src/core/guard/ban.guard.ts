import { BOT_ID, OWNER_ID } from '@config';
import { Cortana } from '@context';
import { ChatMember } from '@grammyjs/types';
import { isSudo } from '.';

export async function canBan(ctx: Cortana, A: ChatMember, B: ChatMember) {
  const _ = await ctx.lang();
  if (B.user.id == BOT_ID) {
    console.log('Condition 1 stop');
    ctx.reply(_.global.preventBot);
    return false;
  }
  if (B.user.id == OWNER_ID && A.user.id == OWNER_ID) {
    console.log('Condition 2 stop');
    ctx.reply(_.global.preventOwner);
    return false;
  }
  if (B.user.id == OWNER_ID) {
    console.log('Condition 3 stop');
    ctx.reply(_.global.notHavePerms);
    return false;
  }
  if (A.status !== 'creator' && B.status == 'creator') {
    console.log('Condition 4 stop');
    ctx.reply(_.global.notHavePerms);
    return false;
  }
  if (A.user.id !== OWNER_ID && B.user.id == BOT_ID) {
    console.log('Condition 5 stop');
    ctx.reply(_.global.notHavePerms);
    return false;
  }
  if (A.user.id == OWNER_ID) {
    console.log('Condition 6 stop');
    return true;
  }
  if (isSudo(B.user.id)) {
    console.log('Condition 7 stop');
    ctx.reply(_.global.preventSudo(B.user.first_name));
    return false;
  }
  if (A.user.id == B.user.id) {
    console.log('Condition 8 stop');
    ctx.reply(_.helpers.youCanNot('ban'));
    return false;
  }
  if (A.status == 'member' && B.status == 'administrator') {
    console.log('Condition 9 stop');
    ctx.reply(_.helpers.memberToAdmin('ban'));
    return false;
  }
  if (A.status == 'administrator' && B.status == 'administrator') {
    console.log('Condition 10 stop');
    ctx.reply(_.helpers.adminToAdmin('ban'));
    return false;
  }
  if (A.status == 'administrator' && B.status == 'creator') {
    console.log('Condition 11 stop');
    ctx.reply(_.helpers.anyToCreator('ban'));
    return false;
  }
  if (A.status == 'member' && B.status == 'creator') {
    console.log('Condition 12 stop');
    ctx.reply(_.helpers.anyToCreator('ban'));
    return false;
  }
  return true;
}
