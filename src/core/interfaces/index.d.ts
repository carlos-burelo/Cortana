// ACOUNT DATABASE INTERFACES

export interface DatabaseI {
	id?: any | string;
	lang?: LangI;
	sudos?: SudoI[];
	language_code?: LangI;
	gbanned?: GbannedI[];
	title?: string;
	first_name?: string;
	username?: string;
	rules?: RulesI;
	type?: "group" | "supergroup" | "private";
	notes?: NoteI[];
	warns?: WarnI[];
	bios?: BioI[];
	blacklist?:BlackListI[]
	filters?: FilterI[];
	prefs?: PrefsI;
}
export interface BlackListI{
	word: string,

}
export type CollectionsI =
	| "id"
	| "sudos"
	| "gbanned"
	| "title"
	| "first_name"
	| "username"
	| "rules"
	| "type"
	| "notes"
	| "warns"
	| "bios"
	| "filters"
	| "prefs";

export type KeyI =
	| "ban"
	| "demote"
	| "promote"
	| "mute"
	| "banned"
	| "unbanned"
	| "demoted"
	| "promoted"
	| "warn";
export interface RulesI {
	status: boolean;
	content: string;
}
export interface PrefsI {
	welcome?: WelcomeI;
	goodbye?: WelcomeI;
	ban?: NoteI;
}
export interface WelcomeI {
	status?: boolean;
	message?: any;
}
export interface FilterI {
	id: string;
	strings?: string[];
	type: string;
	content?: string;
}
export interface BioI {
	id: number;
	first_name: string;
	bio: string;
}
export interface WarnI {
	id: number;
	first_name: string;
	username: string;
	count: number;
	reasons: string[];
}
export interface NoteI {
	is_animated?: boolean;
	id?: string;
	type?:
		| "text"
		| "document"
		| "sticker"
		| "photo"
		| "video"
		| "voice"
		| "audio"
		| string;
	photo?: any;
	args?:any;
	poll?:any;
	options?:string[];
	sticker?: any;
	voice?: any;
	video?: any;
	audio?: any;
	document?: any;
	text?: any;
	reply_markup?: any;
	caption_entities?: any;
	content?: any;
	caption?: any;
	thumb?: any;
	entities?: any;
}
// LANG INTERFACES

export type LangI = "es" | "en";

// MAIN DATABASE INTERFACES

export interface MainDBI {
	id: string;
	sudos: SudoI[];
	gbanned: GbannedI[];
}
interface GbannedI {
	id?: number;
	username?: string;
	first_name?: string;
	reason?: string;
}
interface SudoI {
	id?: number;
	role?: string;
	first_name?: string;
	username?: string;
}

// CONFIG INTERFACES

export interface BotI {
	id: number;
	username: string;
	first_name: string;
	repository: string;
}
export interface OwnerI {
	id: number;
	username: string;
	first_name:string;
}
export interface ApisI {
	magisk: string;
	github: string;
	samsung: string;
	twrp: string;
	currency: ({ orig, dest }) => string;
}
export interface HelpI {
	text: string;
	callback: string;
	content: string;
}

// GLOBAL INTERFACES

export interface ChatUserI {
	id: number;
	first_name: string;
	username?: string;
	last_name?: string;
	is_bot?: boolean;
	language_code?: string;
	user?: any;
}

export interface ButtonI {
	text: string;
	url?: string;
	callback?: string;
}
export interface FileI {
	caption?: any;
	chat?: any;
	text?: any;
	video?: any;
	document?: any;
	sticker?: any;
	photo?: any;
	audio?: any;
	voice?: any;
}

// MESSAGE INTERFACES

export interface ReplyI {
	message_id: number;
	from?: FromI;
	chat?: {
		id: number;
		title: string;
		type: string;
	};
	date: number;
	caption?: any;
	photo?: any;
	sticker?: any;
	voice?: any;
	video?: any;
	audio?: any;
	document?: any;
	text?: any;
	reply_markup?: any;
}

export interface FromI {
	id: number;
	is_bot: boolean;
	firts_name: string;
	username: string;
}
