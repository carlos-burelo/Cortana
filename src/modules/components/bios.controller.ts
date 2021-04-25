import axios from "axios";
import { owner } from "../../config";


export async function createOrUpdateBio(res, bioObject, receptor) {
    if (res.data == '') {
        const res = await axios.post(`${owner.db}/bios`, bioObject); //Si no existe
        if (res.status == 200) {
            return 'Biografia Agregada'
        } else {
            return 'Error al crear la biogradfia'
        }
    } else {
        const res = await axios.put(`${owner.db}/bios/${receptor.id}`, bioObject); //Si existe
        if (res.status == 200) {
            return 'Biografia actualizada'
        } else {
            return 'Error al actualizar la biogradfia'
        }
    }
}
export async function deleteBio(id) {
    const res = await axios.delete(`${owner.db}/bios/${id}`);
    if (res.status == 200) {
        return 'Biografia eliminada'
    } else {
        return 'No se pudo eliminar la biografia'
    }
}
export async function getBio(user) {
    const res = await axios.get(`${owner.db}/bios/${user.id}`);

    if (res.data !== '') {
        let { text } = res.data
        return text
    } else {
        return `${user.first_name} no tiene una biografia`
    }
}