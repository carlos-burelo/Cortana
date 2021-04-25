import axios, { AxiosResponse } from "axios";
import { Iuser } from "../../interfaces/user.interface";
import { IbioModel } from "interfaces/bios.interface";
import { owner } from "../../config";



export async function createOrUpdateBio(res:AxiosResponse, bioObject:IbioModel, receptor:Iuser) {
    if (res.data == '') {
        const res = await axios.post(`${owner.db}/bios`, bioObject);
        if (res.status == 200) {
            return 'Biografia Agregada'
        } else {
            return 'Error al crear la biogradfia'
        }
    } else {
        const res = await axios.put(`${owner.db}/bios/${receptor.id}`, bioObject);
        if (res.status == 200) {
            return 'Biografia actualizada'
        } else {
            return 'Error al actualizar la biogradfia'
        }
    }
};
export async function deleteBio(id:string) {
    const res = await axios.delete(`${owner.db}/bios/${id}`);
    if (res.status == 200) {
        return 'Biografia eliminada'
    } else {
        return 'No se pudo eliminar la biografia'
    }
};
export async function getBio(user:Iuser) {
    const res = await axios.get(`${owner.db}/bios/${user.id}`);
    if (res.data !== '') {
        let { text } = res.data
        return text
    } else {
        return `${user.first_name} no tiene una biografia`
    }
};