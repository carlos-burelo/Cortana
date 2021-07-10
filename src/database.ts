import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import Lowdb, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { resolve } from "path";
import { mainDir, makeDBSchema } from "./config";
import { DatabaseI } from "./core/interfaces";

let data: LowdbSync<DatabaseI>;
const dir = resolve(__dirname, "databases");

export const connect = (database?: any) => {
	!database ? (database = { id: "main" }) : database;
	if (existsSync(dir) == false) {
		mkdirSync(dir);
	}
	const dbPath: string = resolve(dir, `${database.id}.json`);
	let schema: DatabaseI;
	if (existsSync(dbPath) == false) {
		schema = makeDBSchema(database);
	}

	const adapter = new FileSync<DatabaseI>(dbPath);
	data = Lowdb(adapter);
	data.defaults(schema).write();
};
export const db = (database?: any) => {
	connect(database);
	let schema = makeDBSchema(database);
	return data;
};

export function getDatabases(): DatabaseI[] {
	try {
		let dbPath: string[] = readdirSync(resolve(mainDir, "databases"), {
			encoding: "utf-8",
		});
		let groups: string[] = dbPath.filter((a) => a.includes("-"));
		let databases: DatabaseI[] = groups.map((a) => {
			return JSON.parse(
				readFileSync(`${resolve(mainDir, "databases")}/${a}`, {
					encoding: "utf-8",
				}),
			);
		});
		return databases;
	} catch (error) {}
}
