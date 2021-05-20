import { HelpI } from "../interfaces/components";

const string_base: string = "Aqui esta la ayuda para el modulo: ";
export let help_array: HelpI[] = [
  {
    text: "Administrador",
    callback: "help_admin",
    content:
      `${string_base} Admin\n\n` +
      `/adminlist : retorna la lista de los administradores\n` +
      `/promote <replymessage> : Promueve a administrador\n` +
      `/demote <replymessage> : Degrada a un administrador\n` +
      `/pin <replymessage> or <text> : ancla una nota\n` +
      `/unpin : desancla la nota actual\n`,
  },
  {
    text: "Propietario",
    callback: "help_owner",
    content:
      `${string_base} owner\n\n` +
      `/sudolist | /sudos : retorna la lista de los superusuarios\n` +
      `/sudo <replymessage> : Promueve a superusuario\n` +
      `/eco <message> : Envia un mensage a todos los grupos en la base de datos\n`,
  },
  {
    text: "Anime",
    callback: "help_anime",
    content:
      `${string_base} Anime\n\n` +
      `/emision : retorna retorna una lista de los animes en emision\n` +
      `/lastest : retorna una lista de los ultimos capitulos\n` +
      `/anime <anime>: busca todas las coincidencias de un anime\n` +
      `/getanime <anime-id>: obtiene informacion de un solo anime\n`,
  },
  {
    text: "Antiflood",
    callback: "help_antiflood",
    content:
      `${string_base} Antiflood\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Antispam",
    callback: "help_antispam",
    content:
      `${string_base} AntiSpam\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Baneos",
    callback: "help_ban",
    content:
      `${string_base} Ban\n\n` +
      `/ban <replymessage>: Banea a un usuario del grupo\n` +
      `/unban <replymessage>: Remueve el ban al usuario\n`,
  },
  {
    text: "Bios",
    callback: "help_bios",
    content:
      `${string_base} Bios And Abouts\n\n` +
      `/setbio <replymessage>: Establece una biografia al usuario\n` +
      `/bio <replymessage> : Obtiene la biografia del usuario\n` +
      `/info <replymessage> : Obtiene la informacion de un usuario\n` +
      `/me : Obtiene la biografia del propio usuario\n` +
      `/id <replymessage>[optional]: Obtine el Id del usuario/grupo/canal\n`,
  },
  {
    text: "Lista negra",
    callback: "help_black_list",
    content:
      `${string_base} BlackList\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Github",
    callback: "help_github",
    content:
      `${string_base} GitHub\n\n` +
      `/git <username> : Retorna la informacion del usuario \n` +
      `/repos <username> : Obtiene los repositosios del usuario\n` +
      `/repo <username> <repo> : Obtiene un repositorio en especifico \n`,
  },
  {
    text: "Extras",
    callback: "help_extras",
    content: `${string_base} Extras\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Silencio",
    callback: "help_mute",
    content:
      `${string_base} Silencio\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Notas",
    callback: "help_notes",
    content:
      `${string_base} Notas\n\n` +
      `/notes : Obtiene todas las notas guardadas\n` +
      `/add <name> <conten> : Agrega una nota a la base de datos\n` +
      `/g <notename> : Obtiene una nota en especifico \n` +
      `/del <notename> : Borra la nota de la base de datos \n`,
  },
  {
    text: "Reglas",
    callback: "help_rules",
    content: `${string_base} Reglas\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Stickers",
    callback: "help_stickers",
    content: `${string_base} Stickers\n\n` + `/stickerid <username>\n`,
  },
  {
    text: "Traductor",
    callback: "help_translate",
    content:
      `${string_base} Traductor\n\n` +
      `/tr <lang> <text> | <replymessage> : Retorna la traduccion del mensaje\n`,
  },
  {
    text: "Usuarios",
    callback: "help_users",
    content:
      `${string_base} Usuarios\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Advertencias",
    callback: "help_warns",
    content:
      `${string_base} Advertencias\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Bienvenidas",
    callback: "help_welcomes",
    content:
      `${string_base} Bienvenidas\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Wikipedia",
    callback: "help_wikipedia",
    content:
      `${string_base} Wikipedia\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Youtube",
    callback: "help_youtube",
    content: `${string_base} Youtube\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: "Android",
    callback: "help_android",
    content:
      `${string_base} Android\n\n` +
      `/magisk : Retorna las ultimas versiones de magisk\n` +
      `/twrp <username> : [No disponible\n` +
      `/sm <model> <csc> : Retorna la ultima compilacion de los firmwares de samsung \n`,
  },
];
