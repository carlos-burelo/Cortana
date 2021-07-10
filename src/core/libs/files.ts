import axios from "axios";
import { promises, renameSync } from "fs";
import Jimp from "jimp";
import { resolve } from "path";

export async function downloadFile(url: string, file_dir: string) {
	const res = await axios.get(url, { responseType: "arraybuffer" });
	await promises.writeFile(file_dir, res.data);
}
export function renameFile(dir: string, Old: string, New: string): string {
	let oldRoute = resolve(dir, Old);
	let newRoute = resolve(dir, New);
	renameSync(oldRoute, newRoute);
	return `${newRoute}`;
}
export async function resizeImage(file_dir: string) {
	let imageFile = await Jimp.read(file_dir);
	let { bitmap: image } = imageFile;
	if (image.height < 512 && image.width < 512) {
		let size1 = image.width;
		let size2 = image.height;
		let size1new: number;
		let size2new: number;
		if (image.width > image.height) {
			let scale: number = 512 / size1;
			size1new = 512;
			size2new = size2 * scale;
		} else {
			let scale: number = 512 / size2;
			size1new = size1 * scale;
			size2new = 512;
		}
		size1new = Math.floor(size1new);
		size2new = Math.floor(size2new);
		imageFile.resize(size1new, size2new).quality(100);
	} else {
		imageFile.resize(512, 512).quality(100);
	}
	return imageFile;
}
