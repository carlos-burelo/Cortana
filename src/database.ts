import { existsSync, mkdirSync } from "fs";
import Lowdb, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { resolve } from "path";
import { makeDBSchema } from "./config";
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
	return data;
};
