import { _bot, _owner } from "../../config";
import { ChatUserI, KeyI } from "../interfaces";
export const es = {
	global: {
		id: "ES",
		name: "Español",
		pleaseReplyMsg: `Responda al mensaje para continuar.`,
		onlyOwner: `Este comando solo esta disponible para el propietario del bot.`,
		preventBot: "Comando anulado, no puedes afectarme",
		preventOwner: `Comando anulado, mi propietario tiene inmunidad.`,
		permissionsDenied: "No cuentas con los permisos necesarios",
		preventSudo: (name: string) =>
			`${name} tiene protection de superusuario`,
		setLanguageSucces: (lang: string) => `Language set to  ${lang}`,
		codeLangError: "Codigo de lenguaje incorrecto",
		noPrivateChats: "Este comando es compatible con chats privados",
		argumentError: "Argumento incorrecto",
	},
	helpers: {
		anyActionSucces: (i: KeyI, A: string, B: string) =>
			`${B} ha sido ${keys[i]} por ${A}`,
		memberActionAdmin: (i: KeyI) =>
			`No puedes ${keys[i]} a un administrador`,
		adminActionAdmin: (i: KeyI) =>
			`No puedes ${keys[i]} a otro administrador`,
		anyActionCreator: (i: KeyI) =>
			`No puedes ${keys[i]} al propietario del chat`,
		anyActionOwner: (i: KeyI) => `No puedes ${keys[i]} a mi propietario`,
		noYourAutoAction: (i: KeyI) => `No te puedes auto${keys[i]}`,
		noAutoAction: (i: KeyI) => `No puedo ${keys[i]}`,
	},
	permissions: {
		setPermsSuccess: "Permisos establecidos",
		setPermsError: "Hubo un error al estableces los permisos",
		title: (title: string) => `Permisos de *${title}*`,
		can_send_messages: (k: boolean) => `${k ? "✅" : "❌"} | *Mensajes* `,
		can_send_media_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Multimedia* `,
		can_send_polls: (k: boolean) => `${k ? "✅" : "❌"} | *Encuestas* `,
		can_send_other_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Otros mensajes* `,
		can_add_web_page_previews: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Añadir previsualizacion web* `,
		can_change_info: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Cambiar informacion* `,
		can_invite_users: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Invitar usuarios* `,
		can_pin_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Anclar mensajes* `,
		can_be_edited: (k: boolean) => `${k ? "✅" : "❌"} | *Ser editado:* `,
		can_manage_chat: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Administar el chat:* `,
		can_delete_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Borrar mensages:* `,
		can_restrict_members: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Restringir usuarios:* `,
		can_promote_members: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Promover usuarios:* `,
		can_manage_voice_chats: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Administrar chats de voz:* `,
		is_anonymous: (k: boolean) => `${k ? "✅" : "❌"} | *Ser anomimo:* `,
	},
	startModule: {
		message:
			`Hola mi nombres es ${_bot.first_name}, un bot administrador de grupos y gestor ` +
			`de informacion desarrollado en typescript por @${_owner.username}.\n` +
			`A continuacion le muestro una serie de opciones que actualmente tengo disponibles.\n`,
		reportInfo: `Porfavor sea especifico con el problema o responda al problema que el bot presenta`,
		reportLowLength:
			"Sea mas especifico con la situacion en la que el bot fallo, use Ingles y español de ser posible",
	},
	adminMoodule: {
		userPromoted: (A: ChatUserI, B: ChatUserI) =>
			`${B.first_name} ha sido promovido por ${A.first_name}`,
		userDemoted: (A: ChatUserI, B: ChatUserI) =>
			`${B.first_name} ha sido degradado por ${A.first_name}`,
		adminList: `Lista de adminstradores`, //Admin list
		autoPromote: `La autopromoción no está permitida`, // Self-promotion is not allowed
		demoteMe: `No puedes degradarme`, //You can't demote me
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
		titleFirm: (model: string, csc: string) =>
			`*Ultimo firmware para SM-${model} ${csc}*\n\n`,
		words: {
			title1: (device: string) =>
				`<b>TWRP for ${device.toUpperCase()}\n\n</b>`,
			name: (a: string) => `<b>Nombre:</b> ${a}\n`,
			size: (a: string) => `<b>Tamaño:</b> ${a}\n`,
			release: (a: string) => `<b>Lanzamiento:</b> ${a}\n`,
			link: (url: string, name: string) =>
				`<a href="${url}">${name}</a>\n\n`,
		},
	},
	banModule: {
		unBanSuccess: "El baneo ha sido removido",
		setBanSuccess: "Mensaje de baneo establecido",
	},
	bioModule: {
		notFound: (name: string) => `${name} no cuenta con una biografia`,
		setBioSuccess: "Biografia establecida satisfactoriamente",
		updateBioSuccess: "Biografia actualizada satisfactoriamente",
		deleteBioSuccess: "Biografia eliminada satisfactoriamente",
		emptyBiography: `Biografía vacía, agregue al menos 2 caracteres.`,
	},
	notesModule: {
		noteNotFound: "La nota no existe.",
		notesNotFound: "No hay notas en este chat",
		personalNotes: "📋 Notas personales",
		publicNotes: (title: string) => `*📋 Notas en ${title}*`,
		updateNote: (note: string) => `\`#${note}\` se ha actualizado.`,
		noteAdded: (note: string) => `\`#${note}\` se ha añadido a las *notas*`,
		deleteNote: (note: string) =>
			`_#${note}_ se ha eliminado de las *notas*`,
		noteSuggest: "\nPara obtener use: `#name`",
	},
	warnModule: {
		reason: "Razon?...",
		firstWarn: "Primera advertencia",
		secondWarn: "Ultima advertencia",
		lastWarn: "Por ahora no puedo banear, por ahora...",
		warnInfo: ({ first_name, id, count, username }) =>
			`<b>Usuario:</b> ${first_name}\n` +
			`<b>Id:</b> <code>${id}</code>\n` +
			`<b>Nickname:</b> @${username}\n` +
			`<b>Advertencias:</b> ${count}/3\n` +
			`<b>Razones:</b>\n`,
		warnRemoved: "1 advertencia removida.",
		allWarnsRemoved: "Todas las advertencias fueron removidas",
		noWarns: (name: string) => `${name} no cuenta con advertencias.`,
	},
	filterModule: {
		noFilterKey: "Establezca una palabra para el filtro",
		setRespFilter: "Establezca respuestas para el filtro",
		filterSaved: (id: string) =>
			`\`${id}\` ha sido añadido a los *filtros*`,
		noFoundFilter: (filter: string) =>
			`El filtro \`${filter}\` no existe en mi base de datos`,
		removedFilter: (filter: string) =>
			`El filtro: \`${filter}\` fue removido`,
		title: (title: string) => `Filtros en *${title}*\n\n`,
		noFiltersFound: `No ahy filtros en este chat`,
		filterDesc: (filter: string) =>
			`Descripcion del *filtro*: \`${filter}\` \n\n`,
		type: (type: string) => `*Tipo:*  _${type}_\n`,
		resp: `*Respuestas:* \n`,
	},
	githubModule: {
		noUserFound: "Escriba algun usuario",
		noRepoFound: "Escriba algun repositorio",
		reposTitle: (a: number) => `*Repositorios: (${a})*\n\n`,
		profileNotFound: "Usuario no encontrado",
	},
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
