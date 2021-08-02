import axios from 'axios';
import { promises, renameSync } from 'fs';
import Jimp from 'jimp';
import { resolve } from 'path';

export async function downloadFile(url: string, file_dir: string) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
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
  let maxsize = 512;
  if ((image.width && image.height) < 512) {
    let size1: number = image.width;
    let size1new: number;
    let size2: number = image.height;
    let size2new: number;
    let scale: number;
    if (image.width > image.height) {
      scale = 512 / size1;
      size1new = 512;
      size2new = size2 * scale;
    } else {
      scale = 512 / size2;
      size1new = size1 * scale;
      size2new = 512;
    }
    size1new = Math.floor(size1new);
    size2new = Math.floor(size2new);
    imageFile.resize(size1new, size2new).quality(100);
  } else {
    imageFile.resize(maxsize, maxsize).quality(100);
  }
  return imageFile;
}
