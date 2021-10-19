import { BOT_NAME, BOT_USERNAME, OWNER_USERNAME } from '../../config';
import { ButtonI } from '../types';
// import { LanguageI } from '../types/temp';

const id: string = 'Español 🇲🇽';
const startButtons = [
  {
    text: '📌 Commandos',
    callback: 'help',
  },
  {
    text: '🇲🇽 Idiomas',
    callback: 'setLanguage',
  },
  {
    text: '➕ Añadir a un grupo',
    url: `http://t.me/${BOT_USERNAME}?startgroup=true`,
  },
  {
    text: '📄 Documentacion',
    url: 'http://github.com/carlos-burelo/CortanaTS',
  },
];
export const modules = [
  {
    text: 'Administrador',
    callback: 'help_admin',
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
    callback: 'help_owner',
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
    callback: 'help_antiflood',
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
    callback: 'help_antispam',
    content:
      `Comandos en el modulo: AntiSpam\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: 'Baneos',
    callback: 'help_ban',
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
    callback: 'help_bios',
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
    callback: 'help_black_list',
    content:
      `Comandos en el modulo: BlackList\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: 'Github',
    callback: 'help_github',
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
    callback: 'help_extras',
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
    callback: 'help_mute',
    content:
      `Comandos en el modulo: Silencio\n\n` +
      `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: 'Notas',
    callback: 'help_notes',
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
    callback: 'help_rules',
    content:
      `Comandos en el modulo: Reglas\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
  },
  {
    text: 'Stickers',
    callback: 'help_stickers',
    content:
      `Comandos en el modulo: Stickers\n\n` +
      `<b>/stickerid (replymessage)</b>\n` +
      `Retorna el Id del sticker al que se responde\n\n` +
      `<b>/kang (replymessage)</b>\n` +
      `Añade como un sticker la imagen o sticker enviado, a su propio StickerPack\n`,
  },
  {
    text: 'Traductor',
    callback: 'help_translate',
    content:
      `Comandos en el modulo: Traductor\n\n` +
      `<b>/tr (lang) (text) | (replymessage)</b>\n` +
      `Retorna la traduccion del texto escrito o el mensage respondido\n` +
      `❓: <code>/tr es Hello World</code>\n`,
  },
  {
    text: 'Usuarios',
    callback: 'help_users',
    content:
      `Comandos en el modulo: Usuarios\n\n` +
      `<b>/info (replymessage)</b>\n` +
      `Retorna la informacion del usuario o grupo\n\n` +
      `/id (replymessage)\n` +
      `Retorna solo el id del usuario|grupo\n`,
  },
  {
    text: 'Advertencias',
    callback: 'help_warns',
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
    callback: 'help_welcomes',
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
    callback: 'help_npm',
    content:
      `Comandos en el modulo: NPM\n\n` +
      `<b>/npm (packagename)</b>\n` +
      `Retorna informacion del paquete solicitado.\n\n` +
      `<b>/npm ? (packagename)</b>\n` +
      `Hace una busqueda y retorna las coincidencias del paquete solicitado.\n`,
  },
  {
    text: 'Node',
    callback: 'help_node',
    content:
      `Comandos en el modulo: Node\n\n` +
      `<b>/os</b>\n` +
      `Retorna informacion sobre el entorno donde se ejecuta el bot.\n\n`,
  },
  {
    text: 'Texto a voz',
    callback: 'help_tts',
    content:
      `Comandos en el modulo: Text to speach\n\n` +
      `<b>/tss (lang) (text) | (replymessage)</b>\n` +
      `Retorna un audio en el lenguaje solicidato \n`,
  },
  {
    text: 'Android',
    callback: 'help_android',
    content:
      `Comandos en el modulo: Android\n\n` +
      `<b>/magisk</b>\n` +
      `Retorna las ultimas versiones de magisk\n\n` +
      `<b>/twrp (device)</b>\n` +
      `Retorna las compilaciones de twrp para el dispositivo solicitado.\n\n` +
      `<b>/fw (model) (csc)</b>\n` +
      `Retorna la ultima compilacion de los firmwares de samsung \n`,
  },
];
const lang = {
  global: {
    requestApproved: 'Request approved, now Cortana is available un your chat.',
    requestDenied:
      'Request denied, unfortunately the terms of use are not met.',
    pendingRequest:
      'Your request will be personally reviewed by my owner, please wait until it is online.',
    noUsePerms:
      'This account does not have access to ' +
      BOT_NAME +
      ' you can request access using the /join command',
    noReplyMessage: 'Responda al mensaje para continuar.',
    onlyOwner: 'Este comando solo esta disponible para el propietario del bot.',
    preventBot: 'Comando anulado, integridad del bot en riesgo.',
    preventOwner: 'Comando anulado, mi propietario tiene inmunidad.',
    permissionsDenied: 'No cuentas con los permisos necesarios',
    chooseLang: 'Selecciona un lenguaje',
    codeLangError: 'Codigo de lenguaje no valido',
    noPrivateChat: 'No puedes usar este comando en un chat privado.',
    argsError: 'Argumento(s) incorrecto(s)',
    argsNotFound: 'Argumento(s) no encontrado(s)',
    formatError: 'Formato incorrecto',
    preventSudo: (N) => `${N} tiene protection de superusuario`,
    setLanguageSucces: (L) =>
      `Language set to  ${L == 'es' ? id : 'English 🇺🇸'}`,
    sameLanguage: (L) =>
      `El lenguaje ya esta en  ${L == 'es' ? id : 'English 🇺🇸'}`,
    envNotFound: (env) => `Variable de entorno ${env} no definida`,
  },
  helpers: {
    anyActionSuccess: (i, A, B) => `${B} ha sido ${w[i]} por ${A}`,
    memberActionAdmin: (i) => `No puedes ${w[i]} a un administrador`,
    adminActionAdmin: (i) => `No puedes ${w[i]} a otro administrador`,
    anyActionCreator: (i) => `No puedes ${w[i]} al propietario del chat`,
    anyActionOwner: (i) => `No puedes ${w[i]} a mi propietario`,
    noYourAutoAction: (i) => `No te puedes auto${w[i]}`,
    noAutoAction: (i) => `No puedo auto${w[i]}me`,
    actionError: (i) => `Ha ocurrido un error al intentar ${w[i]} al usuario`,
  },
  permissions: {
    setPermsSuccess: 'Permisos establecidos',
    setPermsError: 'Hubo un error al estableces los permisos',
    title: (title) => `Permisos de *${title}*`,
    can_send_messages: (p) => `${p ? '✅' : '❌'} | *Mensajes* `,
    can_send_media_messages: (p) => `${p ? '✅' : '❌'} | *Multimedia* `,
    can_send_polls: (p) => `${p ? '✅' : '❌'} | *Encuestas* `,
    can_send_other_messages: (p) => `${p ? '✅' : '❌'} | *Otros mensajes* `,
    can_add_web_page_previews: (p) =>
      `${p ? '✅' : '❌'} | *Añadir previsualizacion web* `,
    can_change_info: (p) => `${p ? '✅' : '❌'} | *Cambiar informacion* `,
    can_invite_users: (p) => `${p ? '✅' : '❌'} | *Invitar usuarios* `,
    can_pin_messages: (p) => `${p ? '✅' : '❌'} | *Anclar mensajes* `,
    can_be_edited: (p) => `${p ? '✅' : '❌'} | *Ser editado:* `,
    can_manage_chat: (p) => `${p ? '✅' : '❌'} | *Administar el chat:* `,
    can_delete_messages: (p) => `${p ? '✅' : '❌'} | *Borrar mensages:* `,
    can_restrict_members: (p) => `${p ? '✅' : '❌'} | *Restringir usuarios:* `,
    can_promote_members: (p) => `${p ? '✅' : '❌'} | *Promover usuarios:* `,
    can_manage_voice_chats: (p) =>
      `${p ? '✅' : '❌'} | *Administrar chats de voz:* `,
    is_anonymous: (p) => `${p ? '✅' : '❌'} | *Ser anomimo:* `,
  },
  startModule: {
    message: (name) =>
      `Hola *${name}*, mi nombres es ${BOT_NAME}, soy un bot administrador de grupos y gestor ` +
      `de informacion desarrollado en typescript por @${OWNER_USERNAME}.\n` +
      `A continuacion le muestro una serie de opciones que actualmente tengo disponibles.\n`,
    buttons: startButtons,
  },
  adminModule: {
    adminList: `Lista de adminstradores`,
    pinSuccess: 'Mensaje anclado satisfactoriamente',
    pinError: 'No se ha podido anclar el mensaje',
    unPinSuccess: 'Mensaje desanclado satisfactoriamente',
    unPinAllSuccess: 'Todos los mensajes an sido deshanclados',
    unPinError: 'El mensaje no ha podido ser desanclado',
    unPinAllError: 'Los mensajes no han podido ser desanclados',
    unPinSuggestion: 'Use `$all` para desanclar todos los mensajes',
    prefTitle: (pref) => `\nPreferences in ${pref}`,
    stat: (s) => `*Status:* \`${s}\`\t\t|\t\t`,
    type: (t) => `*Type:* \`${t}\`\n`,
    sanction: (s) => `*Sanction:* \`${s}\`\n`,
  },
  androidModule: {
    noModel: 'Porfavor coloque algun modelo',
    noCsc: 'Porfavor coloque alguna region',
    titleMagisk: '*Ultimas versiones de magisk*\n\n',
    titleFirm: (model, csc) => `*Ultimo firmware para SM-${model} ${csc}*\n\n`,
    titleTwrp: (device) => `*TWRP for ${device.toUpperCase()}\n\n*`,
    name: (a) => `*Nombre:* ${a}\n`,
    size: (a) => `*Tamaño:* ${a}\n`,
    release: (a) => `*Lanzamiento:* ${a}\n`,
    link: (url, name) => `[${name}](${url})\n\n`,
  },
  banModule: {
    unBanSuccess: 'El baneo ha sido removido',
    setBanSuccess: 'Mensaje de baneo establecido',
  },
  nodeModule: {
    cmdError: 'Porfavor escriba un comando para proseguir',
    cmdDenied: 'El comando incluye acciones no permitidas',
    limitResponse: 'La respuesta supera el limite de caracteres permitidos.',
    invalidUrl: 'La url proporcionada no es valida.',
    noUrl: 'Escriba alguna Url.',
  },
  bioModule: {
    notFound: (name) => `${name} no cuenta con una biografia`,
    setBioSuccess: 'Biografia establecida satisfactoriamente',
    updateBioSuccess: 'Biografia actualizada satisfactoriamente',
    deleteBioSuccess: 'Biografia eliminada satisfactoriamente',
    emptyBiography: `Biografía vacía, agregue al menos 2 caracteres.`,
  },
  helpModule: {
    modules: modules,
    message:
      `Aqui te presento algunos de los modulos que actualmente tengo disponibles.\n` +
      `Puedes acceder a los modulos usando\n\n/help <modulename>`,
  },
  herokuModule: {
    title: 'Uso de Dynos este mes',
    usageText: (name) => `Uso de dynos por ${name}:`,
    remainigText: `Horas dyno restantes este mes:`,
    time: (h, m, p) => `•\t${h} Horas, ${m} minutos\t-\t${p}%`,
    process: [
      '`Obteniendo informacion de la cuenta...`',
      '`Conectando a heroku...`',
      '`Obteniendo infomacion del projecto...`',
    ],
  },
  notesModule: {
    noteNotFound: 'La nota no existe.',
    notesNotFound: 'No hay notas en este chat',
    personalNotes: '📋 Notas personales',
    publicNotes: (title) => `*📋 Notas en ${title}*`,
    updateNote: (note) => `\`#${note}\` se ha actualizado.`,
    noteAdded: (note) => `\`#${note}\` se ha añadido a las *notas*`,
    deleteNote: (note) => `_#${note}_ se ha eliminado de las *notas*`,
    noteSuggest: '\nPara obtener use: `#name`',
  },
  warnModule: {
    reason: 'Razon?...',
    firstWarn: 'Primera advertencia',
    secondWarn: 'Ultima advertencia',
    lastWarn: 'Por ahora no puedo banear, por ahora...',
    warnInfo: ({ first_name, id, count, username }) =>
      `*Usuario:* ${first_name}\n` +
      `*Id:* \`${id}\`\n` +
      `*Nickname:* @${username}\n` +
      `*Advertencias:* ${count}/3\n` +
      `*Razones:*\n`,
    warnRemoved: '1 advertencia removida.',
    allWarnsRemoved: 'Todas las advertencias fueron removidas',
    noWarns: (name) => `${name} no cuenta con advertencias.`,
  },
  filterModule: {
    noFilterKey: 'Establezca una palabra para el filtro',
    setRespFilter: 'Establezca respuestas para el filtro',
    filterSaved: (id) => `\`${id}\` ha sido añadido a los *filtros*`,
    noFoundFilter: (filter) =>
      `El filtro \`${filter}\` no existe en mi base de datos`,
    removedFilter: (filter) => `El filtro: \`${filter}\` fue removido`,
    title: (title) => `Filtros en *${title}*\n\n`,
    noFiltersFound: `No ahy filtros en este chat`,
    filterDesc: (filter) => `Descripcion del *filtro*: \`${filter}\` \n\n`,
    type: (type) => `*Tipo:*  _${type}_\n`,
    resp: `*Respuestas:* \n`,
  },
  githubModule: {
    noUserFound: 'Ingrese el nombre del usuario',
    noRepoFound: 'Ingrese el nombre del repositorio',
    reposTitle: (a) => `*Repositorios: (${a})*\n\n`,
    profileNotFound: 'Usuario no encontrado',
    repoGetError: 'Ha ocurrido un error al tratar de obtener el repositorio',
  },
  extrasModule: {
    noBaseFound: 'Escriba un valor base',
    baseIsNaN: 'EL valor base debe ser un numero',
    origNotFound: 'Escriba un valor de origen',
    destNotFound: 'Escriba un valor de destino',
    emptyPoll: 'Escriba el contenido de la encuesta',
    emptyTitlePoll: 'Escriba un titulo para la encuesta',
    minResp: 'Necesito al menos 2 respuestas',
    errorFormatPoll: 'Formato de encuesta erroneo',
    kangFormatError: 'Este formato no puede convertirse a sticker',
    kangProcess: [
      '`Obteniendo url...`',
      '`Descargando archivo...`',
      '`Procesando imagen...`',
      '`Agregando al paquete...`',
    ],
    errorCreatePack: '`Hubo un error al crear el paquete`',
    errorAddPack: '`Hubo un error al añadir el sticker al paquete`',
    finish: (name) =>
      `Sticker añadido satisfactoriamente [aqui](t.me/addstickers/${name})`,
    deleteSticker: 'Sticker eliminado satisfactoriamente',
    tgsFormatError:
      'Por el momento no tengo compatibilidad con stickers animados.',
  },
  ownerModule: {
    invalidID: 'El ID no es valido',
    noSudos: 'No hay sudos por el momento.',
    sudoAdd: (sudo) => `${sudo} ha sido añadido a los sudos.`,
    sudoUpdate: (sudo) => `Se han actualizado loa valores de ${sudo}.`,
    delSudo: (sudo) => `${sudo} ha sido eliminado de los sudos`,
    noSudo: (sudo) => `${sudo} no es un sudo.`,
  },
  npmModule: {
    titleSearch: 'Principales modulos npm encontrados',
    title: (query) => `Informacion del modulo ${query}`,
  },
  welcomeModule: {
    ownerProcess: [
      'Bienvenido propietario',
      'Estableciedndo permisos...',
      'Error al establecer permisos.',
      'Permisos establecidos correctamente.',
    ],
    prefRepeat: (a) => `El valor ya esta establecido en ${a}`,
    prefSuccess: (a) =>
      `Preferencias de ${a == 'welcome' ? 'bienvenida' : 'despedida'
      } establecidas.`,
  },
  trasnlatorModule: {
    limit: 'El mensaje sobrepasa el limite de caracteres permitido (200)',
  },
  usersModule: {
    youId: (id) => `Tu ID es: \`${id}\``,
    yourId: (name, id) => `El ID de ${name} es: \`${id}\``,
    myId: (id) => `Mi ID es: \`${id}\``,
    groupId: (id) => `El ID del grupo es: \`${id}\``,
    id: (id) => `<b>Id:</b> <code>${id}</code>\n`,
    name: (name) => `<b>Nombre:</b> <i>${name}</i>\n`,
    lastName: (lastName) => `<b>Apellido:</b> <i>${lastName}</i>\n`,
    acount: (username) => `<b>Cuenta:</b> <i>@${username}</i>\n`,
    range: (range) => `<b>Rango:</b> <i>${range}</i>\n`,
    customTitle: (title) => `<b>Titulo personalizado:</b> <i>${title}</i>\n`,
    isBot: (v) => `<b>Tipo:</b> ${v ? ' <i>Bot</i>' : '<i>Usuario</i>'}\n`,
    type: (type) => `<b>Tipo:</b> <i>${type}</i>\n`,
    groupInfo: '<b>Informacion de grupo</b>\n\n',
    userInfo: '<b>Informacion de usuario</b>\n\n',
    title: (title) => `<b>Titulo:</b> <i>${title}</i>\n`,
    inviteLink: (link, name) =>
      `<b>Link de invitacion:</b> <a href="${link}">@${name}</a>\n`,
  },
  muteModule: {
    unMuted: (u) => `${u} ahora puede volver a hablar`,
    noUnMuted: (u) => `No se ha podido remover el silencio de ${u}`,
  },
};
const w = {
  ban: 'ban',
  demote: 'demote',
  promote: 'promote',
  mute: 'mute',
  banned: 'banned',
  unbanned: 'unbannned',
  demoted: 'demoted',
  promoted: 'promoted',
  warn: 'warn',
};
export default lang;
