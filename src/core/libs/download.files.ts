import axios from "axios";
import { renameSync, promises } from "fs";
import { resolve } from "path";

export async function downloadFile(url, file_dir) {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  await promises.writeFile(file_dir, res.data);
}

export async function renameFile(
  file_dir: string,
  oldName,
  newName: string
): Promise<string> {
  let oldRoute = resolve(file_dir, oldName);
  let newRoute = resolve(file_dir, newName);
  renameSync(oldRoute, newRoute);
  return `${newRoute}`;
}
