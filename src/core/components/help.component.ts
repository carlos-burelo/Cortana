import { HelpI } from "../interfaces/index";

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
      `/groups : retorna la lista de los grupos vinculados\n` +
      `/send <id> <message> | <replymessage> : Envia un mensaje directo o multimedia a una cuenta especifica.\n` +
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
      `/info <replymessage> : Obtiene la informacion de un usuario\n`,
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
      `/clone <user> <repo> | <github_url>: Descarga el repositorio\n` +
      `/repo <username> <repo> : Obtiene un repositorio en especifico \n`,
  },
  {
    text: "Extras",
    callback: "help_extras",
    content:
      `${string_base} Extras\n\n` +
      `/cc <conincode> <codeorig> <codedest>: Retorna la equvalencia actual de las monedas en solicidatas \n` +
      `Por ejemplo /cc 1 USD MXO \n` +
      `/loli : Retorna una loli \n` +
      `/poll (question) ["1", "2"]: Retorna una encuesta publica \n`,
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
      `#<notename> : Obtiene una nota en especifico \n` +
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
    content:
      `${string_base} Stickers\n\n` +
      `/stickerid <username>\n` +
      `/kang <sticker> | <photo> : Añade como sticker la imagen/sticker a su propio StickerPack\n`,
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
      `${string_base} Usuarios\n\n` +
      `/info <replymessage[optional]>: retorna la informacion del usuario\n` +
      `/id <replymessage[optional]>: retorna solo el id del usuario/grupo\n`,
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
      `${string_base} Bienvenidas\n\n` +
      `/welcome: Muestra las configuraciones actuales de las bienvenidas \n` +
      `/setwelcome: Establece una bienvenida personalizada \n` +
      `/welcome off/on: Activa/desactiva las bienvenidas en el chat \n` +
      `/goodbye: Muestra las configuraciones actuales de las despedidas \n` +
      `/setgoodbye: Establece una despedida personalizada \n` +
      `/goodbye off/on: Activa/desactiva las despedidas en el chat \n`,
  },
  {
    text: "NPM",
    callback: "help_npm",
    content:
      `${string_base} NPM\n\n` +
      `/npm <packagename>: Retorna informacion del paquete solicitado \n` +
      `/npm ? <packagename>: Hace una busqueda de las coincidencias del paquete solicitado \n`,
  },
  {
    text: "Node",
    callback: "help_node",
    content:
      `${string_base} Node\n\n` +
      `/os : Retorna informacion sobre el entorno donde se ejecuta el bot \n`,
  },
  {
    text: "Texto a voz",
    callback: "help_tts",
    content:
      `${string_base} Text to speach\n\n` +
      `/tss <lang> <text> | <replymessage> : Retorna un audio en el lenguaje solicidato \n`,
  },
  {
    text: "Android",
    callback: "help_android",
    content:
      `${string_base} Android\n\n` +
      `/magisk : Retorna las ultimas versiones de magisk\n` +
      `/twrp <username> : [No disponible\n` +
      `/fw <model> <csc> : Retorna la ultima compilacion de los firmwares de samsung \n`,
  },
];
