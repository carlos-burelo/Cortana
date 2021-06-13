export async function getInfo(res): Promise<string> {
  let Info: string = "<b>Informacion de usuario</b>\n\n";
  if (res.id || res.id !== undefined) {
    Info += `<b>Id:</b> <code>${res.id}</code>\n`;
  }
  if (res.first_name || res.first_name !== undefined) {
    Info += `<b>Nombre:</b> <i>${res.first_name}</i>\n`;
  }
  if (res.title || res.title !== undefined) {
    Info += `<b>Nombre:</b> <i>${res.title}</i>\n`;
  }
  if (res.last_name || res.last_name !== undefined) {
    Info += `<b>Apellido:</b> <i>${res.last_name}</i>\n`;
  }
  if (res.username || res.username !== undefined) {
    Info += `<b>Cuenta:</b> <i>@${res.username}</i>\n`;
  }
  if (res.status) {
    Info += `<b>Rango:</b> <i>${res.status}</i>\n`;
  }
  if (res.custom_title) {
    Info += `<b>Titulo personalizado:</b> <i>${res.custom_title}</i>\n`;
  }
  if (res.is_bot == true) {
    Info += `<b>Tipo:</b> <i>Bot</i>\n`;
  } else {
    Info += `<b>Tipo:</b> <i>Usuario</i>\n`;
  }
  return Info;
}

export async function getGroupInfo(chat: any): Promise<string> {
  let chatinfo: string =
    `<b>Informacion de grupo</b>\n\n` +
    `<b>Id:</b> <code>${chat.id}</code>\n` +
    `<b>Titulo:</b> <i>${chat.title}</i>\n` +
    `<b>Cuenta:</b> <i>@${chat.username}</i>\n` +
    `<b>Tipo:</b> <i>${chat.type}</i>\n` +
    `<b>Link de invitacion:</b> <a href="${chat.invite_link}">@${chat.username}</a>\n` +
    ``;
  return chatinfo;
}
