"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.renameFile = exports.downloadFile = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const jimp_1 = __importDefault(require("jimp"));
const path_1 = require("path");
async function downloadFile(url, file_dir) {
    const res = await axios_1.default.get(url, { responseType: "arraybuffer" });
    await fs_1.promises.writeFile(file_dir, res.data);
}
exports.downloadFile = downloadFile;
;
function renameFile(dir, Old, New) {
    let oldRoute = path_1.resolve(dir, Old);
    let newRoute = path_1.resolve(dir, New);
    fs_1.renameSync(oldRoute, newRoute);
    return `${newRoute}`;
}
exports.renameFile = renameFile;
;
async function resizeImage(file_dir) {
    let imageFile = await jimp_1.default.read(file_dir);
    let { bitmap: image } = imageFile;
    if (image.height < 512 && image.width < 512) {
        let size1 = image.width;
        let size2 = image.height;
        let size1new;
        let size2new;
        if (image.width > image.height) {
            let scale = 512 / size1;
            size1new = 512;
            size2new = size2 * scale;
        }
        else {
            let scale = 512 / size2;
            size1new = size1 * scale;
            size2new = 512;
        }
        size1new = Math.floor(size1new);
        size2new = Math.floor(size2new);
        imageFile.resize(size1new, size2new).quality(100);
    }
    else {
        imageFile.resize(512, 512).quality(100);
    }
    return imageFile;
}
exports.resizeImage = resizeImage;
;
