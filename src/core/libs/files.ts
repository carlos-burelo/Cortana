import axios from "axios";
import { renameSync, promises } from "fs";
import { resolve } from "path";

export async function downloadFile(url, file_dir) {
	const res = await axios.get(url, { responseType: "arraybuffer" });
	await promises.writeFile(file_dir, res.data);
}

export function renameFile(dir: string, Old: string, New: string): string {
	let oldRoute = resolve(dir, Old);
	let newRoute = resolve(dir, New);
	renameSync(oldRoute, newRoute);
	return `${newRoute}`;
}
