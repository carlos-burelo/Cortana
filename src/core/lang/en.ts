import { _bot, _owner } from "../../config";
import { ChatUserI } from "../interfaces";

export const en = {
	id: "English",
	start:
		`Hello, my name is ${_bot.first_name}, a group administrator bot and information ` +
		`manager developed in typescript by @${_owner.username}.\n` +
		`Below I show you a series of options that I currently have available.\n`,
	groupsOnly: `This command is not compatible with private chats.`,
	replyMessage: "Reply to the message to continue",
	onlyOwner: "This command is only available to the bot owner.",
	permissionDenied: "No cuentas con los permisos necesarios",
	preventOwner: "Por su seguridad omitire el comando",
	preventBot: "Por mi seguridad omitire el comando",
	sudoProtect: (name: string) => `${name} tiene protection de superusuario`,
	adminResponses: {
		userPromoted: (a: ChatUserI, b: ChatUserI) =>
			`${b.first_name} has been promoted by ${a.first_name}`,
		userDemoted: (a: ChatUserI, b: ChatUserI) =>
			`${b.first_name} has been degraded by ${a.first_name}`,
		adminList: "Admin list",
		demoteMe: "You can't demote me",
		memberPromoteAdmin: "You can't promote an admin",
		memberDemoteAdmin: "You can't degrade an admin",
		notAutoPromote: "I can't self-promote",
		notYourAutoPromote: "You cannot self-promote",
		memberPromoteCreator: "You can't promote an creator",
		memberDemoteCreator: "You can't degrade an creator",
		adminPromoteAdmin: "You can't promote an other admin",
		adminDemoteAdmin: "You can't degrade an other admin",
		demoteOwner: "You can't demote my owner",
		notAutoDemote: "I can't self-degrade",
		notYourAutoDemote: "You cannot self-degrade",
		pinSuccess: "Message pinned successfully",
		pinError: "The message could not be pinned",
		unPinSuccess: "Message unpinned successfully",
		unPinAllSuccess: "All messages have been unpinned",
		unPinError: "The message could not be unpinned",
		unPinAllError: "Messages could not be unpinned",
		unPinSuggestion:
			"I can't detect any messages, use '--all ' to unpin all messages",
		perms: {
			setPermsSuccess: "Established permissions",
			setPermsError: "There was an error setting permissions",
			title: (title) => `Permissions in ${title}`,
			can_send_messages: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Messages* `,
			can_send_media_messages: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Media* `,
			can_send_polls: (k: boolean) => `${k ? "✅" : "❌"} | *Polls* `,
			can_send_other_messages: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Other messages* `,
			can_add_web_page_previews: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Add web page previews* `,
			can_change_info: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Change Info* `,
			can_invite_users: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Invite users* `,
			can_pin_messages: (k: boolean) =>
				`${k ? "✅" : "❌"} | *Pin messages* `,
		},
	},
	banResponses: {
		banSucces: (A: string) => `${A} ha sido baneado`,
		noAutoBan: "No puedes auto-banearte",
		adminBanOwner: "No puedes banear a mi propietario",
		adminBanAdmin: "No puedes banear a otro administrador",
		memberBanAdmin: "No puedes banear a un administrador",
		anyBanCreator: "No puedes banear al propietario del chat",
		unBanSuccess: "El baneo ha sido removido",
		setBanSuccess: "Mensaje de baneo establecido",
	},
	biosResponses: {
		notFound: (name: string) => `${name} no cuenta con una biografia`,
	},
	userPerms: {
		title: (user: string) => `*${user}* Permissions`,
		can_be_edited: (k: boolean) => `${k ? "✅" : "❌"} | *Be edited*`,
		can_manage_chat: (k: boolean) => `${k ? "✅" : "❌"} | *Manage chat*`,
		can_change_info: (k: boolean) => `${k ? "✅" : "❌"} | *Change info*`,
		can_delete_messages: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Delete messages*`,
		can_invite_users: (k: boolean) => `${k ? "✅" : "❌"} | *Invite users*`,
		can_restrict_members: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Restrict members*`,
		can_pin_messages: (k: boolean) => `${k ? "✅" : "❌"} | *Pin messages*`,
		can_promote_members: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Promote members*`,
		can_manage_voice_chats: (k: boolean) =>
			`${k ? "✅" : "❌"} | *Manage voice chats*`,
		is_anonymous: (k: boolean) => `${k ? "✅" : "❌"} | Anonymus `,
	},
	setLanguageSucces: (lang: string) => `Idioma establecido a ${lang}`,
	setLanguageError: "Invalid language code",
};
