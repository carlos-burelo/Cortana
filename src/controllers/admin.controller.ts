export async function format_message(admins): Promise<string> {
  let adminlist = [];
  admins.forEach((a) => {
    let admin = {
      name: a.user.first_name,
      status: a.status,
    };
    adminlist.push(admin);
  });
  let creator = adminlist.filter((a) => a.status == "creator");
  let onlyAdmin = adminlist.filter((a) => a.status !== "creator");
  let lista_admins: string = "";
  lista_admins += `◼️ Propietario\n`;
  lista_admins += `• ${creator[0].name}\n\n`;
  lista_admins += `◻️ Administradores\n`;
  onlyAdmin.forEach(function (c) {
    lista_admins += `• ${c.name}\n`;
  });
  return lista_admins;
}
