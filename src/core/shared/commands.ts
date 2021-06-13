import { BotCommand } from "typegram";

export const commandsUnSort: BotCommand[] = [
  {
    command: "adminlist",
    description: "Muestra a los administradores del grupo",
  },
  {
    command: "promote",
    description: "Promueve a administrador",
  },
  {
    command: "demote",
    description: "Degrada a un administrador",
  },
  {
    command: "pin",
    description: "Ancla un mensaje al chat del grupo",
  },
  {
    command: "unpin",
    description: "Desancla todos los mensajes del grupo",
  },
  {
    command: "link",
    description: "Obtiene el link del grupo",
  },
  {
    command: "perms",
    description: "Obtiene los permisos del grupo",
  },
  {
    command: "magisk",
    description: "Obtiene la ultima version de magisk",
  },
  {
    command: "fw",
    description: "Obtiene informacion del ultimo firm solicitado",
  },
  {
    command: "ban",
    description: "Banea a un usuario",
  },
  {
    command: "unban",
    description: "Remueve el ban al usuario",
  },
  {
    command: "git",
    description: "Obtiene el perfil de gitbub del usuario",
  },
  {
    command: "repos",
    description: "Obtiene todos los repos del usuario",
  },
  {
    command: "repo",
    description: "Obtiene un unico repo y su descripcion",
  },
  {
    command: "getid",
    description: "Obtiene el id y tipo del documento | sticker | foto | audio",
  },
  {
    command: "cc",
    description: "Obtiene el estado de la moneda actual",
  },
  {
    command: "loli",
    description: "Obtiene una loli",
  },
  {
    command: "poll",
    description: "Crea una encuesta",
  },
  {
    command: "notes",
    description: "Obtiene todas las notas del chat",
  },
  {
    command: "add",
    description: "Añade una nota el chat",
  },
  {
    command: "save",
    description: "Añade una nota el chat",
  },
  {
    command: "del",
    description: "Borra una nota del chat",
  },
  {
    command: "get",
    description: "Obtiene una nota del chat",
  },
  {
    command: "id",
    description: "Extrae el id del usuario | grupo",
  },
  {
    command: "info",
    description: "Extrae informacion del usuario | grupo",
  },
  {
    command: "start",
    description: "Inicia el bot",
  },
  {
    command: "sudos",
    description: "Obtiene a todos los sudo users",
  },
  {
    command: "sudolist",
    description: "Obtiene a todos los sudo users",
  },
  {
    command: "sudo",
    description: "Agrega a un usuario a los sudos",
  },
  {
    command: "tr",
    description: "Traduce un text al idioma selecionado",
  },
  {
    command: "welcome",
    description: "Apaga o enciende las bienvenidas",
  },
  {
    command: "goodbye",
    description: "Apaga o enciende las despedidas",
  },
  {
    command: "setwelcome",
    description: "Establece bienvenida personalizada",
  },
  {
    command: "setgoodbye",
    description: "Establece despedida personalizada",
  },
  {
    command: "eco",
    description: "Envia un mensaje a todas las cuentas ligadas al bot",
  },
  {
    command: "bio",
    description: "Obtiene la biografia del usuario",
  },
  {
    command: "setbio",
    description: "Establece una biografia al usuario",
  },
  {
    command: "delbio",
    description: "Borra la biografia del usuario",
  },
];

export let commands = commandsUnSort.sort((a, b) =>
  a.command < b.command ? -1 : 1
);
