import { BOT_NAME, BOT_REPO, BOT_USERNAME, OWNER_USERNAME } from '@config';
import { status } from '@libs/messages';
import { LangI } from '@interfaces/locales';

export const LANG: LangI = {
  id: `Español 🇲🇽`,
  utils: {
    backBtn: [{ text: '◀️ Volver al menu', callback_data: 'back_help' }],
    id: (a) => `*Id: ${a}*\n`,
    name: (a) => `*Nombre: ${a}*\n`,
    title: (a) => `*Titulo:* ${a}\n`,
    lang: (a) => `*Idioma:* ${a}\n`,
    notes: (a) => `*Notas:* ${a}\n`,
    type: (a) => `*Tipo:* ${a}\n`,
    first_name: (a) => `*Primer nombre:* ${a}\n`,
    last_name: (a) => `*Segundo nombre:* ${a}\n`,
    username: (a) => `*Nombre de usuario:* ${a}\n`,
    size: (a) => `*Tamaño:* ${a}\n`,
    status: (a) => `*Estado:* ${a}\n`,
    link: (a, b) => `[${a}](${b})\n`,
    release: (a) => `*Lanzamiento:* ${a}\n`,
  },
  global: {
    preventSudo: (a) => `${a} tiene protection de superusuario`,
    setLangSuccess: (a) => `${a} language set correctly.`,
    sameLang: (a) => `The language is already established in ${a}.`,
    envNotFound: (a) => `La variable de entorno \`${a}\` no esta definida.`,
    joinPending: 'Peticion en espera de aprovacion, porfavor espere...',
    joinApproved: `Solicitud aprobada, ahora ${BOT_NAME} está disponible en el chat.`,
    joinDenied: `Solicitud denegada, lamentablemente no cumple con los requisitos.`,
    noAllow: `Esta cuenta no tiene acceso a ${BOT_NAME}`,
    replyMissing: `Porfavor responda al mensage para continuar.`,
    onlyOwner: 'Este comando solo esta disponible para el propietario del bot.',
    preventBot: 'Comando anulado, integridad del bot en riesgo.',
    preventOwner: 'Comando anulado, mi propietario tiene inmunidad.',
    notHavePerms: 'No cuentas con los permisos necesarios',
    chooseLang: 'Seleccione un lenguage',
    codeLangError: 'Codigo de lenguaje no valido',
    noPrivateChat: 'No puedes usar este comando en un chat privado.',
    argsError: 'Argumento(s) incorrecto(s)',
    argsNotFound: 'Argumento(s) no encontrado(s)',
    formatError: 'Formato incorrecto',
  },
  helpers: {
    youDontHavePermissions: (a) => ``,
    youCanNot: (a) => `No puedes auto${actions[a]}te`,
    canNot: (a) => ``,
    memberToAdmin: (a) => ``,
    adminToAdmin: (a) => ``,
    anyToCreator: (a) => `No puedes ${actions[a]} al propietario del chat.`,
    youCantAffectMe: (a) => `No puedes ${actions[a]}me`,
    success: (a, b, c) => `${a} ha sido ${actions[b]} por ${c}`,
    alreadyIsAdmin: (a: string) => `${a} ya es administrador`,
    error: (a) => `A ocurrido un error al tratar de ${actions[a]} al usuario`,
  },
  perms: {
    title: (a, i) => `Permisos ${!i ? 'en' : 'de'} ${a}`,
    can_send_messages: (p) => `${status(p)} | *Mensajes* `,
    can_send_media_messages: (p) => `${status(p)} | *Multimedia* `,
    can_send_polls: (p) => `${status(p)} | *Encuestas* `,
    can_send_other_messages: (p) => `${status(p)} | *Otros mensajes* `,
    can_add_web_page_previews: (p) => `${status(p)} | *Añadir previsualizacion web* `,
    can_change_info: (p) => `${status(p)} | *Cambiar informacion* `,
    can_invite_users: (p) => `${status(p)} | *Invitar usuarios* `,
    can_pin_messages: (p) => `${status(p)} | *Anclar mensajes* `,
    can_be_edited: (p) => `${status(p)} | *Ser editado:* `,
    can_manage_chat: (p) => `${status(p)} | *Administar el chat:* `,
    can_delete_messages: (p) => `${status(p)} | *Borrar mensages:* `,
    can_restrict_members: (p) => `${status(p)} | *Restringir usuarios:* `,
    can_promote_members: (p) => `${status(p)} | *Promover usuarios:* `,
    can_manage_voice_chats: (p) => `${status(p)} | *Administrar chats de voz:* `,
    is_anonymous: (p) => `${status(p)} | *Ser anomimo:* `,
  },
  github: {
    userNotFound: 'Porfavor ingrese el nombre de usuario',
    profileNotFound: 'Usuario no encontrado',
    repoGetError: 'Ha ocurrido un error al tratar de obtener el repositorio',
    repoNotFound: 'Ingrese el nombre del repositorio',
    reposTitle: (a) => `*Repositorios: (${a})*\n\n`,
    cloneTemplate: (a, b, c, d) =>
      `*Repositorio:* \`${a}\`\n` +
      `*Propietario:* \`${b}\`\n` +
      `*Rama:* \`${c}\`\n` +
      `*Descripción:*\n ${d}\n\n`,
    repoTemplate: (a, b, c, d, e, f) =>
      `*Repositorio:*  ${a}\n` +
      `*Propietario:*  ${b}\n` +
      `*Lenguage:*  ${c}\n` +
      `*Bifurcaciones:*  ${d}\n` +
      `*Tipo de cuenta:*  ${e}\n` +
      `*Descripcion:*  ${f}\n`,
    gitTemplate: (a, b, c, d, e, f) =>
      `*Usuario: * ${a}\n` +
      `*Nombre de usuario: * ${b}\n` +
      `*Tipo de cuenta: * ${c}\n` +
      `${d ? `*Biografia:* ${d}\n` : ''}` +
      `*Repositorios: * ${e}\n` +
      `*Ubicación: * ${f}\n`,
    repository: 'Repositorio',
    website: 'Sitio Web',
    owner: 'Propietario',
    viewProfile: 'Ver perfil',
  },
  admin: {
    adminList: `Lista de adminstradores`,
  },
  android: {
    noModel: 'Porfavor coloque algun modelo',
    noCsc: 'Porfavor coloque alguna region',
    noDeviceFound: 'Dispositivo no encontrado, revise los datos ingresados.',
    fwTemplate: (model, csc, pda, phone, build, mask) =>
      `*Ultimo firmware para SM-${model} ${csc}*\n\n` +
      `*PDA:*  \`${pda}\`\n` +
      `*CSC:*  \`${csc}\`\n` +
      `*Phone:*  \`${phone}\`\n` +
      `*Android:*  _${build} / ${mask}_\n\n`,
    magiskTemplate: (stable, canary) =>
      `_Stable_\n` +
      `*• Version:* _${stable.version}_(${stable.versionCode})\n` +
      `*• Apk:* [app-release.apk](${stable.link})\n` +
      `*• Notas:* [magisk-${stable.versionCode}.md](${stable.note})\n\n` +
      `_Canary_\n` +
      `*• Version:* _${canary.version}_(${canary.versionCode})\n` +
      `*• Apk:* [app-release.apk](${canary.link})\n` +
      `*• Notas:* [magisk-${canary.versionCode}.md](${canary.note})\n\n`,
  },
  start: {
    msg: (a) =>
      `Hola *${a}*, mi nombres es ${BOT_NAME}, soy un bot administrador de grupos y gestor ` +
      `de informacion desarrollado en typescript por @${OWNER_USERNAME}.\n` +
      `A continuacion le muestro una serie de opciones que actualmente tengo disponibles.\n`,
    btns: [
      {
        text: '📌 Comandos',
        callback_data: 'back_help',
      },
      {
        text: '🇲🇽 Idiomas',
        callback_data: 'setLanguage',
      },
      {
        text: '➕ Añadir a un grupo',
        url: `http://t.me/${BOT_USERNAME}?startgroup=true`,
      },
      {
        text: '📄 Documentacion',
        url: BOT_REPO,
      },
    ],
  },
  help: {
    msg:
      `Aqui te presento algunos de los modulos que actualmente tengo disponibles.\n` +
      `Puedes acceder a los modulos usando\n\n*/help modulename*`,
  },
  modules: [
    {
      text: 'Administrador',
      callback_data: 'help_admin',
      content:
        `Comandos en el modulo: <b>Admin</b>\n\n` +
        `<b>/adminlist | /admins</b>\n` +
        `Retorna la lista de los administradores\n\n` +
        `<b>/promote (replymessage)</b>\n` +
        `Promueve a un miembro o administrador\n\n` +
        `<b>/demote (replymessage)</b>\n` +
        `Degrada a un miembro o administrador\n\n` +
        `<b>/link</b>\n` +
        `Retorna el link del grupo si este esta disponible\n\n` +
        `<b>/perms (replymessage)</b>\n` +
        `Retorna los permisos del grupo\n\n` +
        `<b>/setperms</b>\n` +
        `Establece permisos optimios para el buen funcionamiento del bot\n\n` +
        `<b>/pin (replymessage) | (message)</b>\n` +
        `Ancla una nota al chat\n\n` +
        `<b>/unpin -all</b>\n` +
        `Desancla la nota actual o todas las notas.\n\n`,
    },
    {
      text: 'Propietario',
      callback_data: 'help_owner',
      content:
        `Comandos en el modulo: <b>owner</b>\n\n` +
        `<b>/sudolist | /sudos</b>\n` +
        `Retorna la lista de los superusuarios\n\n` +
        `<b>/groups</b>\n` +
        `Retorna la lista de los grupos vinculados\n\n` +
        `<b>/send (id) (message) | (replymessage)</b>\n` +
        `Envia un mensaje o multimedia a una cuenta especifica.\n` +
        `❓: <code>/send 1234567890 Hola</code>\n\n` +
        `<b>/sudo (replymessage)</b>\n` +
        `Promueve a un usuario a sudo\n\n` +
        `<b>/eco (message)</b>\n` +
        `Envia un mensage a todos los grupos en la base de datos\n`,
    },
    {
      text: 'Antiflood',
      callback_data: 'help_antiflood',
      content:
        `Comandos en el modulo: Antiflood\n\n` +
        `<b>bold</b>, <strong>bold</strong>
					<i>italic</i>, <em>italic</em>
					<u>underline</u>, <ins>underline</ins>
					<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
					<b>bold <i>italic bold <s>italic bold strikethrough</s> <u>underline italic bold</u></i> bold</b>
					<a href="http://www.example.com/">inline URL</a>
					<a href="tg://user?id=123456789">inline mention of a user</a>
					<code>inline fixed-width code</code>
					<pre>pre-formatted fixed-width code block</pre>
					<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>\n`,
    },
    {
      text: 'Antispam',
      callback_data: 'help_antispam',
      content: `Comandos en el modulo: AntiSpam\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
    },
    {
      text: 'Baneos',
      callback_data: 'help_ban',
      content:
        `Comandos en el modulo: Ban\n\n` +
        `<b>/ban (replymessage)</b>\n` +
        `Banea a un usuario del grupo\n\n` +
        `<b>/unban (replymessage)</b>\n` +
        `Remueve el ban al usuario\n\n` +
        `<b>/setban (replymessage)</b>\n` +
        `Establece un mensaje para mostrar durante el baneo\n\n`,
    },
    {
      text: 'Bios',
      callback_data: 'help_bios',
      content:
        `Comandos en el modulo: Bios And Abouts\n\n` +
        `<b>/setbio (replymessage)</b>\n` +
        `Establece una biografia al usuario\n\n` +
        `<b>/bio (replymessage)</b>\n` +
        `Obtiene la biografia del usuario\n\n` +
        `<b>/bio (replymessage) -rm</b>\n` +
        `Elimina la biogradia del usuario\n\n` +
        `<b>/info (replymessage)</b>\n` +
        `Obtiene la informacion de un usuario\n\n`,
    },
    {
      text: 'Lista negra',
      callback_data: 'help_black_list',
      content: `Comandos en el modulo: BlackList\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
    },
    {
      text: 'Github',
      callback_data: 'help_github',
      content:
        `Comandos en el modulo: GitHub\n\n` +
        `<b>/git (user)</b>\n` +
        `Retorna la informacion del usuario.\n\n` +
        `<b>/repos (user)</b>\n` +
        `Obtiene los repositosios del usuario\n\n` +
        `<b>/clone (user) (repo) | (url)</b>\n` +
        `Descarga el repositorio con parametros o una url valida\n\n` +
        `<b>/repo (user) (repo)</b>\n` +
        `Obtiene un repositorio en especifico\n\n`,
    },
    {
      text: 'Extras',
      callback_data: 'help_extras',
      content:
        `Comandos en el modulo: Extras\n\n` +
        `<b>/cc cant code code</b>\n` +
        `Retorna la equvalencia actual de las monedas en solicidatas.\n` +
        `❓: <code>/cc 1 USD MXO</code>\n\n` +
        `<b>/loli</b>\n` +
        `Retorna una loli\n\n` +
        `<b>/poll (question) "1", "2"</b>\n` +
        `❓: <code>/poll (are you ok?) "yes" "no"</code>\n` +
        `Retorna una encuesta publica de respuestas multiples.\n\n`,
    },
    {
      text: 'Silencio',
      callback_data: 'help_mute',
      content: `Comandos en el modulo: Silencio\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
    },
    {
      text: 'Notas',
      callback_data: 'help_notes',
      content:
        `Comandos en el modulo: Notas\n\n` +
        `<b>/notes</b>\n` +
        `Obtiene todas las notas guardadas.\n\n` +
        `<b>/add | /save  (replymessage) | (message)</b>\n` +
        `Agrega una nota a la base de datos\n\n` +
        `<b>#notename -rm</b>\n` +
        `Obtiene una nota en especifico o borra la nota con el atributo "-rm"\n\n`,
    },
    {
      text: 'Reglas',
      callback_data: 'help_rules',
      content: `Comandos en el modulo: Reglas\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
    },
    {
      text: 'Stickers',
      callback_data: 'help_stickers',
      content:
        `Comandos en el modulo: Stickers\n\n` +
        `<b>/stickerid (replymessage)</b>\n` +
        `Retorna el Id del sticker al que se responde\n\n` +
        `<b>/kang (replymessage)</b>\n` +
        `Añade como un sticker la imagen o sticker enviado, a su propio StickerPack\n`,
    },
    {
      text: 'Traductor',
      callback_data: 'help_translate',
      content:
        `Comandos en el modulo: Traductor\n\n` +
        `<b>/tr (lang) (text) | (replymessage)</b>\n` +
        `Retorna la traduccion del texto escrito o el mensage respondido\n` +
        `❓: <code>/tr es Hello World</code>\n`,
    },
    {
      text: 'Usuarios',
      callback_data: 'help_users',
      content:
        `Comandos en el modulo: Usuarios\n\n` +
        `<b>/info (replymessage)</b>\n` +
        `Retorna la informacion del usuario o grupo\n\n` +
        `/id (replymessage)\n` +
        `Retorna solo el id del usuario|grupo\n`,
    },
    {
      text: 'Advertencias',
      callback_data: 'help_warns',
      content:
        `Comandos en el modulo: Advertencias\n\n` +
        `<b>/warn</b>\n` +
        `Añade una advertencia al contador del usuario,\n` +
        `si el contador llega a (3) el usuario sera baneado\n\n` +
        `<b>/warn -info</b>\n` +
        `Retorna los detalles del contador de advertencias del usuario\n\n` +
        `<b>/warn -rm</b>\n` +
        `Borra una advertencia del contador del usuario\n`,
    },
    {
      text: 'Bienvenidas',
      callback_data: 'help_welcomes',
      content:
        `Comandos en el modulo: Bienvenidas\n\n` +
        `<b>/welcome</b>\n` +
        `Muestra las configuraciones actuales de las bienvenidas.\n\n` +
        `<b>/welcome off | on</b>\n` +
        `Activa/desactiva las bienvenidas en el chat.\n\n` +
        `<b>/setwelcome</b>\n` +
        `Establece una bienvenida personalizada.\n\n` +
        `<b>/goodbye</b>\n` +
        `Muestra las configuraciones actuales de las despedidas.\n\n` +
        `<b>/goodbye off | on</b>\n` +
        `Activa/desactiva las despedidas en el chat \n\n` +
        `<b>/setgoodbye</b>\n` +
        `Establece una despedida personalizada \n`,
    },
    {
      text: 'NPM',
      callback_data: 'help_npm',
      content:
        `Comandos en el modulo: NPM\n\n` +
        `<b>/npm (packagename)</b>\n` +
        `Retorna informacion del paquete solicitado.\n\n` +
        `<b>/npm ? (packagename)</b>\n` +
        `Hace una busqueda y retorna las coincidencias del paquete solicitado.\n`,
    },
    {
      text: 'Node',
      callback_data: 'help_node',
      content:
        `Comandos en el modulo: Node\n\n` +
        `<b>/os</b>\n` +
        `Retorna informacion sobre el entorno donde se ejecuta el bot.\n\n`,
    },
    {
      text: 'Texto a voz',
      callback_data: 'help_tts',
      content:
        `Comandos en el modulo: Text to speach\n\n` +
        `<b>/tss (lang) (text) | (replymessage)</b>\n` +
        `Retorna un audio en el lenguaje solicidato \n`,
    },
    {
      text: 'Android',
      callback_data: 'help_android',
      content:
        `Comandos en el modulo: Android\n\n` +
        `<b>/magisk</b>\n` +
        `Retorna las ultimas versiones de magisk\n\n` +
        `<b>/twrp (device)</b>\n` +
        `Retorna las compilaciones de twrp para el dispositivo solicitado.\n\n` +
        `<b>/fw (model) (csc)</b>\n` +
        `Retorna la ultima compilacion de los firmwares de samsung \n`,
    },
  ],
};

const actions = {
  ban: 'expulsar',
  demote: 'degradar',
  promote: 'promover',
  mute: 'silenciar',
  muted: 'silenciado',
  banned: 'expulsado',
  unbanned: 'desbaneado',
  demoted: 'degradado',
  promoted: 'promovido',
  warn: 'advertir',
  warned: 'advertido',
};
