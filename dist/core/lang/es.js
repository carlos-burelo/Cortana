"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.es = void 0;
const config_1 = require("../../config");
const string_base = "<b>Aqui esta la ayuda para el modulo:</b>";
exports.es = {
    global: {
        id: "ES",
        name: "Español",
        pleaseReplyMsg: `Responda al mensaje para continuar.`,
        onlyOwner: `Este comando solo esta disponible para el propietario del bot.`,
        preventBot: "Comando anulado, no puedes afectarme",
        preventOwner: `Comando anulado, mi propietario tiene inmunidad.`,
        permissionsDenied: "No cuentas con los permisos necesarios",
        preventSudo: (name) => `${name} tiene protection de superusuario`,
        setLanguageSucces: (lang) => `Language set to  ${lang}`,
        codeLangError: "Codigo de lenguaje incorrecto",
        noPrivateChats: "Este comando no es compatible en chats privados",
        argumentError: "Argumento incorrecto",
        notArguments: "Argumento incorrecto",
        errorInFormat: 'Fotmato incorrecto'
    },
    helpers: {
        anyActionSucces: (i, A, B) => `${B} ha sido ${keys[i]} por ${A}`,
        memberActionAdmin: (i) => `No puedes ${keys[i]} a un administrador`,
        adminActionAdmin: (i) => `No puedes ${keys[i]} a otro administrador`,
        anyActionCreator: (i) => `No puedes ${keys[i]} al propietario del chat`,
        anyActionOwner: (i) => `No puedes ${keys[i]} a mi propietario`,
        noYourAutoAction: (i) => `No te puedes auto${keys[i]}`,
        noAutoAction: (i) => `No puedo ${keys[i]}`,
    },
    permissions: {
        setPermsSuccess: "Permisos establecidos",
        setPermsError: "Hubo un error al estableces los permisos",
        title: (title) => `Permisos de *${title}*`,
        can_send_messages: (k) => `${k ? "✅" : "❌"} | *Mensajes* `,
        can_send_media_messages: (k) => `${k ? "✅" : "❌"} | *Multimedia* `,
        can_send_polls: (k) => `${k ? "✅" : "❌"} | *Encuestas* `,
        can_send_other_messages: (k) => `${k ? "✅" : "❌"} | *Otros mensajes* `,
        can_add_web_page_previews: (k) => `${k ? "✅" : "❌"} | *Añadir previsualizacion web* `,
        can_change_info: (k) => `${k ? "✅" : "❌"} | *Cambiar informacion* `,
        can_invite_users: (k) => `${k ? "✅" : "❌"} | *Invitar usuarios* `,
        can_pin_messages: (k) => `${k ? "✅" : "❌"} | *Anclar mensajes* `,
        can_be_edited: (k) => `${k ? "✅" : "❌"} | *Ser editado:* `,
        can_manage_chat: (k) => `${k ? "✅" : "❌"} | *Administar el chat:* `,
        can_delete_messages: (k) => `${k ? "✅" : "❌"} | *Borrar mensages:* `,
        can_restrict_members: (k) => `${k ? "✅" : "❌"} | *Restringir usuarios:* `,
        can_promote_members: (k) => `${k ? "✅" : "❌"} | *Promover usuarios:* `,
        can_manage_voice_chats: (k) => `${k ? "✅" : "❌"} | *Administrar chats de voz:* `,
        is_anonymous: (k) => `${k ? "✅" : "❌"} | *Ser anomimo:* `,
    },
    startModule: {
        message: `Hola mi nombres es ${config_1._bot.first_name}, un bot administrador de grupos y gestor ` +
            `de informacion desarrollado en typescript por @${config_1._owner.username}.\n` +
            `A continuacion le muestro una serie de opciones que actualmente tengo disponibles.\n`,
        reportInfo: `Porfavor sea especifico con el problema o responda al problema que el bot presenta`,
        reportLowLength: "Sea mas especifico con la situacion en la que el bot fallo, use Ingles y español de ser posible",
    },
    adminMoodule: {
        userPromoted: (A, B) => `${B.first_name} ha sido promovido por ${A.first_name}`,
        userDemoted: (A, B) => `${B.first_name} ha sido degradado por ${A.first_name}`,
        adminList: `Lista de adminstradores`,
        autoPromote: `La autopromoción no está permitida`,
        demoteMe: `No puedes degradarme`,
        pinSuccess: "Mensaje anclado satisfactoriamente",
        pinError: "No se ha podido anclar el mensaje",
        unPinSuccess: "Mensaje desanclado satisfactoriamente",
        unPinAllSuccess: "Todos los mensajes an sido deshanclados",
        unPinError: "El mensaje no ha podido ser desanclado",
        unPinAllError: "Los mensajes no han podido ser desanclados",
        unPinSuggestion: "Use '--all' para desanclar todos los mensajes",
    },
    androidModule: {
        noModel: "Porfavor coloque algun modelo",
        noCsc: "Porfavor coloque alguna region",
        titleMagisk: "*Ultimas versiones de magisk*\n\n",
        titleFirm: (model, csc) => `*Ultimo firmware para SM-${model} ${csc}*\n\n`,
        words: {
            title1: (device) => `<b>TWRP for ${device.toUpperCase()}\n\n</b>`,
            name: (a) => `<b>Nombre:</b> ${a}\n`,
            size: (a) => `<b>Tamaño:</b> ${a}\n`,
            release: (a) => `<b>Lanzamiento:</b> ${a}\n`,
            link: (url, name) => `<a href="${url}">${name}</a>\n\n`,
        },
    },
    banModule: {
        unBanSuccess: "El baneo ha sido removido",
        setBanSuccess: "Mensaje de baneo establecido",
    },
    bioModule: {
        notFound: (name) => `${name} no cuenta con una biografia`,
        setBioSuccess: "Biografia establecida satisfactoriamente",
        updateBioSuccess: "Biografia actualizada satisfactoriamente",
        deleteBioSuccess: "Biografia eliminada satisfactoriamente",
        emptyBiography: `Biografía vacía, agregue al menos 2 caracteres.`,
    },
    notesModule: {
        noteNotFound: "La nota no existe.",
        notesNotFound: "No hay notas en este chat",
        personalNotes: "📋 Notas personales",
        publicNotes: (title) => `*📋 Notas en ${title}*`,
        updateNote: (note) => `\`#${note}\` se ha actualizado.`,
        noteAdded: (note) => `\`#${note}\` se ha añadido a las *notas*`,
        deleteNote: (note) => `_#${note}_ se ha eliminado de las *notas*`,
        noteSuggest: "\nPara obtener use: `#name`",
    },
    warnModule: {
        reason: "Razon?...",
        firstWarn: "Primera advertencia",
        secondWarn: "Ultima advertencia",
        lastWarn: "Por ahora no puedo banear, por ahora...",
        warnInfo: ({ first_name, id, count, username }) => `<b>Usuario:</b> ${first_name}\n` +
            `<b>Id:</b> <code>${id}</code>\n` +
            `<b>Nickname:</b> @${username}\n` +
            `<b>Advertencias:</b> ${count}/3\n` +
            `<b>Razones:</b>\n`,
        warnRemoved: "1 advertencia removida.",
        allWarnsRemoved: "Todas las advertencias fueron removidas",
        noWarns: (name) => `${name} no cuenta con advertencias.`,
    },
    filterModule: {
        noFilterKey: "Establezca una palabra para el filtro",
        setRespFilter: "Establezca respuestas para el filtro",
        filterSaved: (id) => `\`${id}\` ha sido añadido a los *filtros*`,
        noFoundFilter: (filter) => `El filtro \`${filter}\` no existe en mi base de datos`,
        removedFilter: (filter) => `El filtro: \`${filter}\` fue removido`,
        title: (title) => `Filtros en *${title}*\n\n`,
        noFiltersFound: `No ahy filtros en este chat`,
        filterDesc: (filter) => `Descripcion del *filtro*: \`${filter}\` \n\n`,
        type: (type) => `*Tipo:*  _${type}_\n`,
        resp: `*Respuestas:* \n`,
    },
    githubModule: {
        noUserFound: "Escriba algun usuario",
        noRepoFound: "Escriba algun repositorio",
        reposTitle: (a) => `*Repositorios: (${a})*\n\n`,
        profileNotFound: "Usuario no encontrado",
    },
    helpModule: {
        modules: [
            {
                text: "Administrador",
                callback: "help_admin",
                content: `${string_base} Admin\n\n` +
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
                    `<b>/unpin (--all)</b>\n` +
                    `Desancla la nota actual o todas las notas.\n\n`,
            },
            {
                text: "Propietario",
                callback: "help_owner",
                content: `${string_base} <b>owner</b>\n\n` +
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
                text: "Anime",
                callback: "help_anime",
                content: `${string_base} Anime\n\n` +
                    `<b>/emision</b> : retorna retorna una lista de los animes en emision\n` +
                    `<b>/lastest</b> : retorna una lista de los ultimos capitulos\n` +
                    `<b>/anime</b> <i>anime</i> : busca todas las coincidencias de un anime\n` +
                    `<b>/getanime</b> <i>animeid</i> : obtiene informacion de un solo anime\n`,
            },
            {
                text: "Antiflood",
                callback: "help_antiflood",
                content: `${string_base} Antiflood\n\n` + `<b>bold</b>, <strong>bold</strong>
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
                text: "Antispam",
                callback: "help_antispam",
                content: `${string_base} AntiSpam\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
            },
            {
                text: "Baneos",
                callback: "help_ban",
                content: `${string_base} Ban\n\n` +
                    `<b>/ban (replymessage)</b>\n` +
                    `Banea a un usuario del grupo\n\n` +
                    `<b>/unban (replymessage)</b>\n` +
                    `Remueve el ban al usuario\n\n` +
                    `<b>/setban (replymessage)</b>\n` +
                    `Establece un mansage para mostrar durante el baneo\n\n`,
            },
            {
                text: "Bios",
                callback: "help_bios",
                content: `${string_base} Bios And Abouts\n\n` +
                    `<b>/setbio (replymessage)</b>\n` +
                    `Establece una biografia al usuario\n\n` +
                    `<b>/bio (replymessage)</b>\n` +
                    `Obtiene la biografia del usuario\n\n` +
                    `<b>/bio (replymessage) (--rm)</b>\n` +
                    `Elimina la biogradia del usuario\n\n` +
                    `<b>/info (replymessage)</b>\n` +
                    `Obtiene la informacion de un usuario\n\n`,
            },
            {
                text: "Lista negra",
                callback: "help_black_list",
                content: `${string_base} BlackList\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
            },
            {
                text: "Github",
                callback: "help_github",
                content: `${string_base} GitHub\n\n` +
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
                text: "Extras",
                callback: "help_extras",
                content: `${string_base} Extras\n\n` +
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
                text: "Silencio",
                callback: "help_mute",
                content: `${string_base} Silencio\n\n` + `MODULO NO DISPONIBLE POR AHORA \n`,
            },
            {
                text: "Notas",
                callback: "help_notes",
                content: `${string_base} Notas\n\n` +
                    `<b>/notes</b>\n` +
                    `Obtiene todas las notas guardadas.\n\n` +
                    `<b>/add | /save  (replymessage) | (message)</b>\n` +
                    `Agrega una nota a la base de datos\n\n` +
                    `<b>#notename (--rm)</b>\n` +
                    `Obtiene una nota en especifico o borra la nota con el atributo "--rm"\n\n`
            },
            {
                text: "Reglas",
                callback: "help_rules",
                content: `${string_base} Reglas\n\n` +
                    `MODULO NO DISPONIBLE POR AHORA \n`,
            },
            {
                text: "Stickers",
                callback: "help_stickers",
                content: `${string_base} Stickers\n\n` +
                    `<b>/stickerid (replymessage)</b>\n` +
                    `Retorna el Id del sticker al que se responde\n\n` +
                    `<b>/kang (replymessage)</b>\n` +
                    `Añade como un sticker la imagen o sticker enviado, a su propio StickerPack\n`,
            },
            {
                text: "Traductor",
                callback: "help_translate",
                content: `${string_base} Traductor\n\n` +
                    `<b>/tr (lang) (text) | (replymessage)</b>\n` +
                    `Retorna la traduccion del texto escrito o el mensage respondido\n` +
                    `❓: <code>/tr es Hello World</code>\n`,
            },
            {
                text: "Usuarios",
                callback: "help_users",
                content: `${string_base} Usuarios\n\n` +
                    `<b>/info (replymessage)</b>\n` +
                    `Retorna la informacion del usuario o grupo\n\n` +
                    `/id (replymessage)\n` +
                    `Retorna solo el id del usuario|grupo\n`,
            },
            {
                text: "Advertencias",
                callback: "help_warns",
                content: `${string_base} Advertencias\n\n` +
                    `<b>/warn</b>\n` +
                    `Añade una advertencia al contador del usuario,
					si el contador llega a (3) el usuario sera baneado\n\n` +
                    `<b>/warn --info</b>\n` +
                    `Retorna los detalles del contador de advertencias del usuario\n\n` +
                    `<b>/warn --rm</b>\n` +
                    `Borra una advertencia del contador del usuario\n`,
            },
            {
                text: "Bienvenidas",
                callback: "help_welcomes",
                content: `${string_base} Bienvenidas\n\n` +
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
                    `Establece una despedida personalizada \n`
            },
            //<b></b>
            {
                text: "NPM",
                callback: "help_npm",
                content: `${string_base} NPM\n\n` +
                    `<b>/npm (packagename)</b>\n` +
                    `Retorna informacion del paquete solicitado.\n\n` +
                    `<b>/npm ? (packagename)</b>\n` +
                    `Hace una busqueda y retorna las coincidencias del paquete solicitado.\n`,
            },
            {
                text: "Node",
                callback: "help_node",
                content: `${string_base} Node\n\n` +
                    `<b>/os</b>\n` +
                    `Retorna informacion sobre el entorno donde se ejecuta el bot.\n\n`,
            },
            {
                text: "Texto a voz",
                callback: "help_tts",
                content: `${string_base} Text to speach\n\n` +
                    `<b>/tss (lang) (text) | (replymessage)</b>\n` +
                    `Retorna un audio en el lenguaje solicidato \n`,
            },
            {
                text: "Android",
                callback: "help_android",
                content: `${string_base} Android\n\n` +
                    `<b>/magisk</b>\n` +
                    `Retorna las ultimas versiones de magisk\n\n` +
                    `<b>/twrp (device)</b>\n` +
                    `Retorna las compilaciones de twrp para el dispositivo solicitado.\n\n` +
                    `<b>/fw (model) (csc)</b>\n` +
                    `Retorna la ultima compilacion de los firmwares de samsung \n`,
            },
        ],
        message: `Aqui te presento algunos de los modulos que actualmente tengo disponibles.\n` +
            `Puedes acceder a los modulos usando\n\n/help <modulename>`
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
            '\`Obteniendo url...\`',
            '\`Descargando archivo...\`',
            '\`Procesando imagen...\`',
            '\`Agregando al paquete...\`',
        ],
        errorCreatePack: '\`Hubo un error al crear el paquete\`',
        errorAddPack: '\`Hubo un error al añadir el sticker al paquete\`',
        finish: (name) => `Sticker añadido satisfactoriamente [aqui](t.me/addstickers/${name})`,
        deleteSticker: 'Sticker eliminado satisfactoriamente',
        tgsFormatError: 'Por el momento tengo compatibilidad con stickers animados.'
    },
    ownerModule: {
        invalidID: 'El id proposionado es invalido',
        noSudos: 'No hay sudos por el momento.',
        sudoAdd: (sudo) => `${sudo} ha sido añadido a los sudos.`,
        sudoUpdate: (sudo) => `Se han actualizado loa valores de ${sudo}.`,
        delSudo: (sudo) => `${sudo} ha sido eliminado de los sudos`,
        noSudo: (sudo) => `${sudo} no es un sudo.`
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
            'Permisos establecidos correctamente.'
        ],
        prefRepeat: (a) => `El valor ya esta establecido el ${a}`,
        prefSuccess: (a) => `Preferencias de ${a == 'welcome' ? 'bienvenida' : 'despedida'} establecidas.`
    },
    trasnlatorModule: {
        limit: 'El mensaje sobrepasa el limite de caracteres permitido (200)'
    }
};
const keys = {
    ban: "banear",
    banme: "banearme",
    demote: "degradar",
    demoteme: "degradar",
    promote: "promover",
    promoteme: "promoverme",
    banned: "baneado(a)",
    unbanned: "desbaneado",
    demoted: "degradado(a)",
    promoted: "promovido(a)",
    promotion: "promocion",
    demotion: "degradación",
    warn: "advertir",
    warning: "advertencia",
    warnned: "advertido(a)",
};
