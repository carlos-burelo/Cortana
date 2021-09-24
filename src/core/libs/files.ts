import axios from 'axios';
import { promises, renameSync } from 'fs';
// import Jimp from 'jimp';
import sharp from 'sharp';
import { resolve, basename } from 'path';
import { downloadDir } from '../../config';

/**
 * Function taking a RAW` type URL and a directory
 * existing and download it
 * @param {string} url URL of the file to be downloaded.
 * @param {string} fileDir Directory where the archive was kept.
 */
export async function downloadFile(url: string, fileDir: string) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  await promises.writeFile(fileDir, res.data);
  return fileDir;
}
/**
 * Function that takes a base directory and 2 names of
 * the files and rename the file.
 *
 * @param {string} dir Base directory of the file to rename
 * @param {string} Old Original file name
 * @param {string} New New file name
 */
export function renameFile(dir: string, Old: string, New: string): string {
  let oldRoute = resolve(dir, Old);
  let newRoute = resolve(dir, New);
  renameSync(oldRoute, newRoute);
  return `${newRoute}`;
}
/**
 * Function that receives the address of the image and scale
 * to an optimum measure for a sticker
 * @param {string} fileDir Directory of the image to be modified
 */
export async function resizeImage(fileDir: string): Promise<string> {
  let fileName: string = basename(fileDir).replace(/\.(jpg|png|jpeg)/, '');
  let imgScaled: string = resolve(downloadDir, `new-${fileName}.png`);
  await sharp(resolve(fileDir))
    .resize(512, 512, {
      kernel: sharp.kernel.nearest,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toFile(imgScaled);
  return imgScaled;
}
export async function scaleImage(fileDir: string): Promise<string> {
  let fileName: string = basename(fileDir).replace(/\.(jpg|png|jpeg)/, '');
  let imgScaled: string = resolve(downloadDir, `new-${fileName}.png`);
  const image = await sharp(fileDir).metadata();
  let { height, width } = image;
  let scale: number, newWidth: number, newHeigth: number;
  if ((height && width) < 512) {
    if (width > height) {
      scale = 512 / width;
      newWidth = 512;
      newHeigth = height * scale;
    } else {
      scale = 512 / height;
      newHeigth = 512;
      newWidth = width * scale;
    }
  } else {
    newWidth = 512;
    newHeigth = 512;
  }
  newWidth = Math.floor(newWidth);
  newHeigth = Math.floor(newHeigth);

  console.log(`Alto:${newHeigth}\nAncho:${newWidth}`);
  await sharp(resolve(fileDir))
    .resize(newWidth, newHeigth, {
      kernel: sharp.kernel.nearest,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toFile(imgScaled);
  return imgScaled;
}
