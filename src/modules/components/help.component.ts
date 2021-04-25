const string_base = "Aqui esta la ayuda para el modulo: ";
export const help_array: Array<any> = [{
    name: "admin",
    content: `${string_base} [Admin]\n\n` +
      `/adminlist : retorna la lista de los administradores\n` +
      `/promote <replymessage> : Promueve a administrador\n` +
      `/demote <replymessage> : Degrada a un administrador\n` +
      `/pin <replymessage> or <text> : ancla una nota\n` +
      `/unpin : desancla la nota actual\n`,
  },
  {
    name: "android",
    content: `${string_base} [Android]\n\n` +
      `/magisk : Retorna las ultimas versiones de magisk\n` +
      `/twrp <username> : [No disponible]\n` +
      `/sm <model> <csc> : Retorna la ultima compilacion de los firmwares de samsung \n`,
  },
  {
    name: "anime",
    content: `${string_base} [Anime]\n\n` +
      `/emision : retorna retorna una lista de los animes en emision\n` +
      `/lastest : retorna una lista de los ultimos capitulos\n` +
      `/anime <anime>: busca todas las coincidencias de un anime\n` +
      `/getanime <anime-id>: obtiene informacion de un solo anime\n`,
  },
  {
    name: "antiflood",
    content: `${string_base} [Antiflood]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "antispam",
    content: `${string_base} [AntiSpam]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "ban",
    content: `${string_base} [Ban]\n\n` +
      `/ban <replymessage>: Banea a un usuario del grupo\n` +
      `/unban <replymessage>: Remueve el ban al usuario\n`
  },
  {
    name: "bios",
    content: `${string_base} [Bios And Abouts]\n\n` +
      `/setbio <replymessage>: Establece una biografia al usuario\n` +
      `/bio <replymessage> : Obtiene la biografia del usuario\n` +
      `/info <replymessage> : Obtiene la informacion de un usuario\n` +
      `/me : Obtiene la biografia del propio usuario\n` +
      `/id <replymessage>[optional]: Obtine el Id del usuario/grupo/canal\n`,
  },
  {
    name: "blacklist",
    content: `${string_base} [BlackList]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "github",
    content: `${string_base} [GitHub]\n\n` +
      `/git <username> : Retorna la informacion del usuario \n` +
      `/repos <username> : Obtiene los repositosios del usuario\n` +
      `/repo <username> <repo> : Obtiene un repositorio en especifico \n`,
  },
  {
    name: "extras",
    content: `${string_base} [Extras]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "mute",
    content: `${string_base} [Silencio]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "notes",
    content: `${string_base} [Notas]\n\n` +
      `/notes : Obtiene todas las notas guardadas\n` +
      `/add <name> <conten> : Agrega una nota a la base de datos\n` +
      `/get <notename> : Obtiene una nota en especifico \n` +
      `/del <notename> : Borra la nota de la base de datos \n`,
  },
  {
    name: "rules",
    content: `${string_base} [Reglas]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "stickers",
    content: `${string_base} [Stickers]\n\n` +
      `/stickerid <username>\n`
  },
  {
    name: "translate",
    content: `${string_base} [Traductor]\n\n` +
      `/tr <lang> <text> | <replymessage> : Retorna la traduccion del mensaje\n`
  },
  {
    name: "users",
    content: `${string_base} [Usuarios]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "warns",
    content: `${string_base} [Advertencias]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "wellcome",
    content: `${string_base} [Bienvenidas]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "wikipedia",
    content: `${string_base} [Wikipedia]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
  {
    name: "youtube",
    content: `${string_base} [Youtube]\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`
  },
];