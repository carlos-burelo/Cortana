import { _bot, _owner } from "../../config";
import { ChatUserI, KeyI } from "../interfaces";

const string_base: string = "<b>Comando:</b>";

export const en = {
	global: {
		id: "EN",
		name: "English",
		pleaseReplyMsg: `Reply to the message to continue.`,
		onlyOwner: `This command is only available to the owner of the bot.`,
		preventBot: "Command overridden, can't affect me.",
		preventOwner: `Command overridden, my owner has immunity.`,
		permissionsDenied: "You do not have the necessary permits.",
		preventSudo: (name: string) => `${name} has superuser immunity.`,
		langMenu: "*Escoja un languaje*",
		setLanguageSucces: (lang: string) =>
			`Idioma establecido en ${
				lang == "es" ? "Español 🇲🇽" : "English 🇺🇸"
			}`,
		sameLanguage: (lang: string) =>
			`El lenguaje ya esta en  ${
				lang == "es" ? "Español 🇲🇽" : "English 🇺🇸"
			}`,
		codeLangError: "Incorrect language code.",
		noPrivateChats: "This command is not supported in private chats.",
		argumentError: "Wrong argument.",
		notArguments: "Add some argument.",
		errorInFormat: "Incorrect format.",
	},
	helpers: {
		anyActionSucces: (i: KeyI, A: string, B: string) =>
			`${B} has been ${keys[i]} by ${A}`,
		memberActionAdmin: (i: KeyI) => `You can't ${keys[i]} an admin`,
		adminActionAdmin: (i: KeyI) =>
			`You can't ${keys[i]} to another administrator`,
		anyActionCreator: (i: KeyI) =>
			`You can't ${keys[i]} the creator of the chat.`,
		anyActionOwner: (i: KeyI) => `You can't ${keys[i]} my owner.`,
		noYourAutoAction: (i: KeyI) => `You can't self-${keys[i]}`,
		noAutoAction: (i: KeyI) => `I can'n ${keys[i]} myself`,
	},
	permissions: {
		setPermsSuccess: "Established permissions",
		setPermsError: "There was an error setting permissions",
		title: (title: string) => `Permissions of *${title}*`,
		can_send_messages: (k: boolean) => `${k ? "✅" : "❌"} | *Messages:*`,
		can_send_media_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Media* `,
		can_send_polls: (k: boolean) => `${k ? "✅" : "❌"} | *Polls:* `,
		can_send_other_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Other messages:* `,
		can_add_web_page_previews: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Add web page preview:* `,
		can_change_info: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Change info:* `,
		can_invite_users: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Invitar usuarios* `,
		can_pin_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Pin messages:* `,
		can_be_edited: (k: boolean) => `${k ? "✅" : "❌"} | *Be edited:* `,
		can_manage_chat: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Manage chat:* `,
		can_delete_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Delete messages:* `,
		can_restrict_members: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Restrict users:* `,
		can_promote_members: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Promote users:* `,
		can_manage_voice_chats: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Manage voice chats:* `,
		is_anonymous: (k: boolean) => `${k ? "✅" : "❌"} | *Is anomymus:* `,
	},
	startModule: {
		message:
			`Hello, my name is ${_bot.first_name}, a group administrator and manager bot ` +
			`and information manager developed in typescript by @${_owner.username}.\n` +
			`Below I show you a series of options that I currently have available\n`,
		reportInfo: `Please be specific with the problem or respond to the problem that the bot presents`,
		reportLowLength:
			"Be more specific with the situation in which the bot crashed, use English and Spanish if possible",
	},
	adminMoodule: {
		adminList: `Admin list`, //Admin list
		pinSuccess: "Message pinned successfully",
		pinError: "The message could not be pinned.",
		unPinSuccess: "Message unpinned successfully",
		unPinAllSuccess: "All messages have been unpinned",
		unPinError: "The message could not be unpinned",
		unPinAllError: "Messages could not be unpinned",
		unPinSuggestion: "Use '--all' to unpin all messages",
	},
	androidModule: {
		noModel: "Please place a model",
		noCsc: "Please enter a region",
		titleMagisk: "*Latest versions of magisk*\n\n",
		titleFirm: (model: string, csc: string) =>
			`*Latest firmware for SM-${model} ${csc}*\n\n`,
		words: {
			title1: (device: string) =>
				`<b>TWRP for ${device.toUpperCase()}\n\n</b>`,
			name: (a: string) => `<b>name:</b> ${a}\n`,
			size: (a: string) => `<b>size:</b> ${a}\n`,
			release: (a: string) => `<b>Release:</b> ${a}\n`,
			link: (url: string, name: string) =>
				`<a href="${url}">${name}</a>\n\n`,
		},
	},
	banModule: {
		unBanSuccess: "The ban has been removed",
		setBanSuccess: "Ban message set",
	},
	bioModule: {
		notFound: (name: string) => `${name} does not have a biography`,
		setBioSuccess: "Biography successfully established",
		updateBioSuccess: "Biography updated satisfactorily",
		deleteBioSuccess: "Biography successfully removed",
		emptyBiography: `Empty biography, add at least 2 characters.`,
	},
	notesModule: {
		noteNotFound: "The note does not exist.",
		notesNotFound: "There are no notes in this chat",
		personalNotes: "📋 Personal notes",
		publicNotes: (title: string) => `*📋 Notes in ${title}*`,
		updateNote: (note: string) => `\`#${note}\` has been updated.`,
		noteAdded: (note: string) => `\`#${note}\` has been added to the *notes*`,
		deleteNote: (note: string) =>
			`_#${note}_ has been removed from *notes*`,
		noteSuggest: "\nTo get use: `#name`",
	},
	warnModule: {
		reason: "Reason?...",
		firstWarn: "First warning",
		secondWarn: "Final warning",
		lastWarn: "For now I can't ban, for now ...",
		warnInfo: ({ first_name, id, count, username }) =>
			`<b>User:</b> ${first_name}\n` +
			`<b>Id:</b> <code>${id}</code>\n` +
			`<b>Nickname:</b> @${username}\n` +
			`<b>Warns:</b> ${count}/3\n` +
			`<b>Reasons:</b>\n`,
		warnRemoved: "1 warning removed.",
		allWarnsRemoved: "All warnings were removed",
		noWarns: (name: string) => `${name} has no warnings.`,
	},
	filterModule: {
		noFilterKey: "Set a word for the filter",
		setRespFilter: "Set responses for the filter",
		filterSaved: (id: string) =>
			`\`${id}\` has been added to the *filters*`,
		noFoundFilter: (filter: string) =>
			`Filter: \`${filter}\` does not exist in my database`,
		removedFilter: (filter: string) =>
			`Filter: \`${filter}\` has been removed.`,
		title: (title: string) => `Filters in *${title}*\n\n`,
		noFiltersFound: `There are no filters in this chat.`,
		filterDesc: (filter: string) =>
			`Description of the *filter*: \`${filter}\` \n\n`,
		type: (type: string) => `*Type:*  _${type}_\n`,
		resp: `*Responses:* \n`,
	},
	githubModule: {
		noUserFound: "Place some user.",
		noRepoFound: "Put some repository.",
		reposTitle: (a: number) => `*Repositorys: (${a})*\n\n`,
		profileNotFound: "User not found",
	},
	helpModule: {
		modules: [
			{
				text: "Administrator",
				callback: "help_admin",
				content:
					`${string_base} Admin\n\n` +
					`<b>/adminlist | /admins</b>\n` +
					`Returns the list of administrators\n\n` +
					`<b>/promote (replymessage)</b>\n` +
					`Promote a member to administrator\n\n` +
					`<b>/demote (replymessage)</b>\n` +
					`Degrade a manager\n\n` +
					`<b>/link</b>\n` +
					`Returns the group link if it is available\n\n` +
					`<b>/perms (replymessage)</b>\n` +
					`Returns group permissions\n\n` +
					`<b>/setperms</b>\n` +
					`Establish optimal permissions for the proper functioning of the bot\n\n` +
					`<b>/pin (replymessage) | (message)</b>\n` +
					`Pin a note to chat\n\n` +
					`<b>/unpin (--all)</b>\n` +
					`Unpin the current note or all notes.\n\n`,
			},
			{
				text: "Owner",
				callback: "help_owner",
				content:
					`${string_base} <b>owner</b>\n\n` +
					`<b>/sudolist | /sudos</b>\n` +
					`Returns the list of superusers\n\n` +
					`<b>/groups</b>\n` +
					`Returns the list of linked groups\n\n` +
					`<b>/send (id) (message) | (replymessage)</b>\n` +
					`Send a message or multimedia to a specific account.\n` +
					`❓: <code>/send 1234567890 Hello</code>\n\n` +
					`<b>/sudo (replymessage)</b>\n` +
					`Promote a user to sudo\n\n` +
					`<b>/eco (message)</b>\n` +
					`Send a message to all groups in the database\n`,
			},
			{
				text: "Antiflood",
				callback: "help_antiflood",
				content:
					`${string_base} Antiflood\n\n` +
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
				text: "Antispam",
				callback: "help_antispam",
				content:
					`${string_base} AntiSpam\n\n` +
					`MODULO NO DISPONIBLE POR AHORA \n`,
			},
			{
				text: "Baneos",
				callback: "help_ban",
				content:
					`${string_base} Ban\n\n` +
					`<b>/ban (replymessage)</b>\n` +
					`Ban a user from the group\n\n` +
					`<b>/unban (replymessage)</b>\n` +
					`Remove the ban from the user\n\n` +
					`<b>/setban (replymessage)</b>\n` +
					`Set a message to display during ban\n\n`,
			},
			{
				text: "Bios",
				callback: "help_bios",
				content:
					`${string_base} Bios And Abouts\n\n` +
					`<b>/setbio (replymessage)</b>\n` +
					`Establish a biography for the user\n\n` +
					`<b>/bio (replymessage)</b>\n` +
					`Get the user's bio\n\n` +
					`<b>/bio (replymessage) (--rm)</b>\n` +
					`Remove the user's bio\n\n` 
			},
			{
				text: "Lista negra",
				callback: "help_black_list",
				content:
					`${string_base} BlackList\n\n` +
					`MODULO NO DISPONIBLE POR AHORA \n`,
			},
			{
				text: "Github",
				callback: "help_github",
				content:
					`${string_base} GitHub\n\n` +
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
				content:
					`${string_base} Extras\n\n` +
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
				content:
					`${string_base} Silencio\n\n` +
					`MODULO NO DISPONIBLE POR AHORA \n`,
			},
			{
				text: "Notas",
				callback: "help_notes",
				content:
					`${string_base} Notas\n\n` +
					`<b>/notes</b>\n` +
					`Obtiene todas las notas guardadas.\n\n` +
					`<b>/add | /save  (replymessage) | (message)</b>\n` +
					`Agrega una nota a la base de datos\n\n` +
					`<b>#notename (--rm)</b>\n` +
					`Obtiene una nota en especifico o borra la nota con el atributo "--rm"\n\n`,
			},
			{
				text: "Reglas",
				callback: "help_rules",
				content:
					`${string_base} Reglas\n\n` +
					`MODULO NO DISPONIBLE POR AHORA \n`,
			},
			{
				text: "Stickers",
				callback: "help_stickers",
				content:
					`${string_base} Stickers\n\n` +
					`<b>/stickerid (replymessage)</b>\n` +
					`Retorna el Id del sticker al que se responde\n\n` +
					`<b>/kang (replymessage)</b>\n` +
					`Añade como un sticker la imagen o sticker enviado, a su propio StickerPack\n`,
			},
			{
				text: "Traductor",
				callback: "help_translate",
				content:
					`${string_base} Traductor\n\n` +
					`<b>/tr (lang) (text) | (replymessage)</b>\n` +
					`Retorna la traduccion del texto escrito o el mensage respondido\n` +
					`❓: <code>/tr es Hello World</code>\n`,
			},
			{
				text: "Usuarios",
				callback: "help_users",
				content:
					`${string_base} Usuarios\n\n` +
					`<b>/info (replymessage)</b>\n` +
					`Retorna la informacion del usuario o grupo\n\n` +
					`/id (replymessage)\n` +
					`Retorna solo el id del usuario|grupo\n`,
			},
			{
				text: "Advertencias",
				callback: "help_warns",
				content:
					`${string_base} Advertencias\n\n` +
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
				content:
					`${string_base} Bienvenidas\n\n` +
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
			//<b></b>
			{
				text: "NPM",
				callback: "help_npm",
				content:
					`${string_base} NPM\n\n` +
					`<b>/npm (packagename)</b>\n` +
					`Retorna informacion del paquete solicitado.\n\n` +
					`<b>/npm ? (packagename)</b>\n` +
					`Hace una busqueda y retorna las coincidencias del paquete solicitado.\n`,
			},
			{
				text: "Node",
				callback: "help_node",
				content:
					`${string_base} Node\n\n` +
					`<b>/os</b>\n` +
					`Retorna informacion sobre el entorno donde se ejecuta el bot.\n\n`,
			},
			{
				text: "Texto a voz",
				callback: "help_tts",
				content:
					`${string_base} Text to speach\n\n` +
					`<b>/tss (lang) (text) | (replymessage)</b>\n` +
					`Retorna un audio en el lenguaje solicidato \n`,
			},
			{
				text: "Android",
				callback: "help_android",
				content:
					`${string_base} Android\n\n` +
					`<b>/magisk</b>\n` +
					`Retorna las ultimas versiones de magisk\n\n` +
					`<b>/twrp (device)</b>\n` +
					`Retorna las compilaciones de twrp para el dispositivo solicitado.\n\n` +
					`<b>/fw (model) (csc)</b>\n` +
					`Retorna la ultima compilacion de los firmwares de samsung \n`,
			},
		],
		message:
			`Here I present some of the modules that I currently have available.\n` +
			`You can access the modules using \n\n/help <modulename>`,
	},
	extrasModule: {
		noBaseFound: "Enter a base value",
		baseIsNaN: "The base value must be a number",
		origNotFound: "Place the origin currency",
		destNotFound: "Place the destination currency",
		emptyPoll: "Write your survey content",
		emptyTitlePoll: "Write a title for the survey",
		minResp: "I need at least 2 answers",
		errorFormatPoll: "Wrong survey format",
		kangFormatError: "This format cannot be converted to sticker",
		kangProcess: [
			"`Getting url...`",
			"`Downloading file...`",
			"`Processing img...`",
			"`Adding to pack...`",
		],
		errorCreatePack: "`There was an error creating the package`",
		errorAddPack: "`There was an error adding the sticker to the package`",
		finish: (name: string) =>
			`Sticker successfully added [here](t.me/addstickers/${name})`,
		deleteSticker: "Sticker successfully removed",
		tgsFormatError:
			"At the moment I do not have support for animated stickers.",
	},
	ownerModule: {
		invalidID: "The ID is not valid",
		noSudos: "There are no sudos at the moment.",
		sudoAdd: (sudo: string) => `${sudo} has been added to the sudos.`,
		sudoUpdate: (sudo: string) =>
			`The values ​​of ${sudo} have been updated..`,
		delSudo: (sudo: string) => `${sudo} has been removed from sudos`,
		noSudo: (sudo: string) => `${sudo} it is not a sudo.`,
	},
	npmModule: {
		titleSearch: "Main npm modules found.",
		title: (query: string) => `${query} module information`,
	},
	welcomeModule: {
		ownerProcess: [
			"Welcome owner",
			"Setting permissions...",
			"Failed to set permissions.",
			"Permissions set correctly.",
		],
		prefRepeat: (a: string) => `The value is already set in  ${a}`,
		prefSuccess: (a: string) =>
			`${a == "welcome" ? "bienvenida" : "despedida"
			} preferences set!.`,
	},
	trasnlatorModule: {
		limit: "The message exceeds the allowed character limit (200)",
	},
};

const keys = {
	ban: "ban",
	demote: "demote",
	promote: "promote",
	mute: 'mute',
	banned: "banned",
	unbanned: "unbannned",
	demoted: "demoted",
	promoted: "promoted",
	warn: "warn",
};
