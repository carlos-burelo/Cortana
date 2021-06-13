import { ChatMember } from "telegraf/typings/core/types/typegram";

export async function getAdminList(admins: ChatMember[]): Promise<string> {
  interface adminI {
    name: string;
    status: string;
  }
  let adminlist: adminI[] = [];
  admins.forEach((a) => {
    let admin = {
      name: a.user.first_name,
      status: a.status,
    };
    adminlist.push(admin);
  });
  let creator: adminI[] = adminlist.filter(
    (a: adminI) => a.status === "creator"
  );
  let onlyAdmin: adminI[] = adminlist.filter(
    (a: adminI) => a.status !== "creator"
  );
  let lista_admins: string = "";
  lista_admins += `◼️ Propietario\n`;
  lista_admins += `• ${creator[0].name}\n\n`;
  lista_admins += `◻️ Administradores\n`;
  onlyAdmin.forEach((c) => {
    lista_admins += `• ${c.name}\n`;
  });
  return lista_admins;
}
