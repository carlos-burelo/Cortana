import { ChatMember } from '@grammyjs/types';
import { BOT_ID, OWNER_ID } from '../../config';

/**
 * Function for delimit admin perms
 */
export function canPromote(A: ChatMember, B: ChatMember) {
  if (B.status == 'creator') return 'anyActionCreator';
  if (A.status == 'creator' && B.user.id == BOT_ID) return true;
  if (A.user.id == OWNER_ID) return true;
  if (A.user.id == B.user.id) false;
  if (A.status == 'member' && B.status == 'administrator') return 'youCanNot';
  if (A.status == 'administrator' && B.status == 'administrator') return false;
}
