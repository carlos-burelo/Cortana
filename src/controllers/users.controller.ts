export async function getInfo(res) {
    let Info:string = '<b>Informacion de usuario</b>\n\n'
    if(res.user.id || res.user.id !== undefined){
        Info += `<b>Id:</b> <code>${res.user.id}</code>\n`
    }
    if(res.user.first_name || res.user.first_name !== undefined){
        Info += `<b>Nombre:</b> <i>${res.user.first_name}</i>\n`
    }
    if(res.user.title || res.user.title !== undefined){
        Info += `<b>Nombre:</b> <i>${res.user.title}</i>\n`
    }
    if(res.user.last_name || res.user.last_name !== undefined){
        Info += `<b>Apellido:</b> <i>${res.user.last_name}</i>\n`
    }
    if(res.user.username || res.user.username !== undefined){
        Info += `<b>Cuenta:</b> <i>@${res.user.username}</i>\n`
    }
    if(res.status !== '' || res.status !== undefined){
        Info += `<b>Rango:</b> <i>${res.status}</i>\n`
    }
    if (res.custom_title) {
        Info += `<b>Titulo personalizado:</b> <i>${res.custom_title}</i>\n`
    }
    if(res.user.is_bot == true){
        Info += `<b>Tipo:</b> <i>Bot</i>\n`
    } else {
        Info += `<b>Tipo:</b> <i>Usuario</i>\n`
    }
    return Info
}

export async function getGroupInfo(chat:any) {
    let chatinfo = 
    `<b>Informacion de grupo</b>\n\n`+
    `<b>Id:</b> <code>${chat.id}</code>\n`+
    `<b>Titulo:</b> <i>${chat.title}</i>\n`+
    `<b>Cuenta:</b> <i>@${chat.username}</i>\n`+
    `<b>Tipo:</b> <i>${chat.type}</i>\n`+
    `<b>Link de invitacion:</b> <a href="${chat.invite_link}">@${chat.username}</a>\n`+
    ``
    return chatinfo
} 