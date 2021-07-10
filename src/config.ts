import { ApisI, BotI, DatabaseI, OwnerI } from "./core/interfaces/index";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

export const mainDir = __dirname;
export const downloadDir = `${resolve(__dirname, "assets", "downloads")}`;
export const databasesDir = `${resolve(__dirname, "databases")}`;

export const _owner: OwnerI = {
	id: parseInt(process.env.OWNERID),
	username: process.env.OWNERUSERNAME,
	first_name: process.env.OWNERNAME
};
export const _bot: BotI = {
	id: parseInt(process.env.BOTID),
	username: process.env.BOTUSERNAME,
	first_name: process.env.BOTNAME,
	repository: process.env.BOTREPO,
};
export const _apis: ApisI = {
	magisk: "https://raw.githubusercontent.com/topjohnwu/magisk_files/master",
	github: "https://api.github.com",
	samsung: "http://fota-cloud-dn.ospserver.net/firmware",
	twrp: "https://eu.dl.twrp.me",
	currency: ({ orig, dest }) =>
		`https://www.alphavantage.co/query` +
		`?function=CURRENCY_EXCHANGE_RATE` +
		`&from_currency=${orig}` +
		`&to_currency=${dest}` +
		`&apikey=${process.env.CURRENCY}`,
};
export function makeDBSchema(a: DatabaseI): DatabaseI {
	if (a.id == "main") {
		const MainSchema: DatabaseI = {
			id: "main",
			lang: "en",
			sudos: [],
			gbanned: [],
		};
		return MainSchema;
	}
	if (a.type == "supergroup" || a.type == "group") {
		const GroupSchema: DatabaseI = {
			id: a.id,
			lang: !a.language_code ? "en" : a.language_code,
			title: a.title,
			username: a.username,
			type: a.type,
			rules: {
				content: "",
				status: true,
			},
			bios: [],
			notes: [],
			warns: [],
			filters: [],
			prefs: {
				welcome: {
					status: true,
					message: {
						text: "Bienvenido {first_name}",
						type: "text",
					},
				},
				goodbye: {
					status: true,
					message: {
						text: "Hasta pronto {first_name}",
						type: "text",
					},
				},
				ban: {
					content: "User banned",
					type: "text",
				},
			},
			blacklist:[],
		};
		return GroupSchema;
	} else {
		const UserSchema: DatabaseI = {
			id: a.id,
			lang: "es",
			first_name: a.first_name,
			username: a.username,
			type: a.type,
			notes: [],
		};
		return UserSchema;
	}
}
export function checkDirs() {
	if (existsSync(downloadDir) == false) {
		mkdirSync(downloadDir, { recursive: true });
	}
	if (existsSync(databasesDir) == false) {
		mkdirSync(databasesDir, { recursive: true });
	}
}
