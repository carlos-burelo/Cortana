import { ChatMember } from '@grammyjs/types';
import { OWNER_ID } from '@config';
import { HelperTypes } from '@interfaces/locales';

/**
 * Function for delimit admin perms
 */
export function canPromote(A: ChatMember, B: ChatMember): [boolean, HelperTypes?] {
  if (A.status == 'member' && B.status !== 'member') {
    return [false, 'youDontHavePermissions'];
  }
  if (B.status === 'administrator' && (A.status == 'creator' || A.status == 'administrator')) {
    return [false, 'alreadyIsAdmin'];
  }
  if (A.status == 'member' && B.status !== 'administrator') {
    return [false, 'memberToAdmin'];
  }
  if ((A.status == 'member' || A.status == 'administrator') && B.status === 'creator') {
    return [false, 'anyToCreator'];
  }
  if (A.user.id == OWNER_ID || A.status == 'creator') {
    return [true];
  }
  return [true];
}
export function canDemote(A: ChatMember, B: ChatMember): [boolean, HelperTypes] {
  return [true, 'anyToCreator'];
}

export async function isSudo(id: number): Promise<boolean> {
  return false;
}
