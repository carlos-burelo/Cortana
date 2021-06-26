import { db } from "../../database";
import { SudoI } from "../interfaces";

export function isSudo(id: number): boolean {
	let sudos: SudoI[] = db().get("sudos").value();
	if (sudos == undefined || sudos.length == 0) {
		return false;
	}
	let found = sudos.find((sudo) => sudo.id == id);
	if (found == undefined) {
		return false;
	}
	return true;
}
