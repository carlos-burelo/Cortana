import { owner } from "../../config";
import { db } from "../../database";
/**
 * @param  {number} id
 */
export async function sudoPerms(id: number): Promise<boolean> {
  try {
    if (id == owner.id) {
      return true;
    }
    if (id) {
      let sudos: any[] = db().get("sudos").value();
      let found = sudos.find((sudo) => sudo.id == id);
      if (found == undefined) {
        return false;
      } else {
        if (found.range == 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  } catch (error) {
    return false;
  }
}
