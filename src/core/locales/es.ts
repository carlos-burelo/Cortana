import { BOT_NAME } from '../../config';
import { status } from '../libs/messages';
import { LangI } from '../types/locales';

export const LANG: LangI = {
  id: `Español 🇲🇽`,
  utils: {
    id: (a) => `*Id: ${a}*`,
    title: (a) => `*Titulo:* ${a}`,
    lang: (a) => `*Idioma:* ${a}`,
    notes: (a) => `*Notas:* ${a}`,
    type: (a) => `*Tipo:* ${a}`,
    first_name: (a) => `*Primer nombre:* ${a}`,
    last_name: (a) => `*Segundo nombre:* ${a}`,
    username: (a) => `*Nombre de usuario:* ${a} `,
    size: (a) => `*Tamaño:* ${a}`,
    status: (a) => `*Estado:* ${a}`,
    link: (a, b) => `[${a}](${b})`,
    release: (a) => `*Lanzamiento:* ${a}`
  },
  global: {
    preventSudo: (a) => `${a} tiene protection de superusuario`,
    setLangSuccess: (a) => `${a} language set correctly.`,
    sameLang: (a) => `The language is already established in ${a}.`,
    envNotFound: (a) => `La variable de entorno \`${a}\` no esta definida.`,
    joinPending: 'Peticion en espera de aprovacion, porfavor espere...',
    joinApproved: `Solicitud aprobada, ahora ${BOT_NAME} está disponible en el chat.`,
    joinDenied: `Solicitud denegada, lamentablemente no cumple con los requisitos.`,
    noAllow: `Esta cuenta no tiene acceso a ${BOT_NAME}`,
    replyMissing: `Porfavor responda al mensage para continuar.`,
    onlyOwner: 'Este comando solo esta disponible para el propietario del bot.',
    preventBot: 'Comando anulado, integridad del bot en riesgo.',
    preventOwner: 'Comando anulado, mi propietario tiene inmunidad.',
    notHavePerms: 'No cuentas con los permisos necesarios',
    chooseLang: 'Seleccione un lenguage',
    codeLangError: 'Codigo de lenguaje no valido',
    noPrivateChat: 'No puedes usar este comando en un chat privado.',
    argsError: 'Argumento(s) incorrecto(s)',
    argsNotFound: 'Argumento(s) no encontrado(s)',
    formatError: 'Formato incorrecto'
  },
  helpers: {
    youCanNot: () => ``,
    canNot: () => ``,
    memberToAdmin: () => ``,
    adminToAdmin: () => ``,
    anyToCreator: () => ``,
    success: () => ``,
    error: () => ``
  },
  perms: {
    can_send_messages: (p) => `${status(p)} | *Mensajes* `,
    can_send_media_messages: (p) => `${status(p)} | *Multimedia* `,
    can_send_polls: (p) => `${status(p)} | *Encuestas* `,
    can_send_other_messages: (p) => `${status(p)} | *Otros mensajes* `,
    can_add_web_page_previews: (p) => `${status(p)} | *Añadir previsualizacion web* `,
    can_change_info: (p) => `${status(p)} | *Cambiar informacion* `,
    can_invite_users: (p) => `${status(p)} | *Invitar usuarios* `,
    can_pin_messages: (p) => `${status(p)} | *Anclar mensajes* `,
    can_be_edited: (p) => `${status(p)} | *Ser editado:* `,
    can_manage_chat: (p) => `${status(p)} | *Administar el chat:* `,
    can_delete_messages: (p) => `${status(p)} | *Borrar mensages:* `,
    can_restrict_members: (p) => `${status(p)} | *Restringir usuarios:* `,
    can_promote_members: (p) => `${status(p)} | *Promover usuarios:* `,
    can_manage_voice_chats: (p) => `${status(p)} | *Administrar chats de voz:* `,
    is_anonymous: (p) => `${status(p)} | *Ser anomimo:* `
  },
  github: {
    reposTitle: (a) => `*Repositorios: (${a})*\n\n`,
    userNotFound: 'Porfavor ingrese el nombre de usuario',
    profileNotFound: 'Usuario no encontrado',
    repoGetError: 'Ha ocurrido un error al tratar de obtener el repositorio',
    repoNotFound: 'Ingrese el nombre del repositorio',
    cloneTemplate: (a, b, c, d) =>
      `*Repositorio:* \`${a}\`\n` +
      `*Propietario:* \`${b}\`\n` +
      `*Rama:* \`${c}\`\n` +
      `*Descripción:*\n ${d}\n\n`,
    repoTemplate: (a, b, c, d, e, f) =>
      `*Repositorio:*  ${a}\n` +
      `*Propietario:*  ${b}\n` +
      `*Lenguage:*  ${c}\n` +
      `*Bifurcaciones:*  ${d}\n` +
      `*Tipo de cuenta:*  ${e}\n` +
      `*Descripcion:*  ${f}\n`,
    gitTemplate: (a, b, c, d, e, f) =>
      `*Usuario: * ${a}\n` +
      `*Nombre de usuario: * ${b}\n` +
      `*Tipo de cuenta: * ${c}\n` +
      `${d ? `*Biografia:* ${d}\n` : ''}` +
      `*Repositorios: * ${e}\n` +
      `*Ubicación: * ${f}\n`,
    repository: 'Repositorio',
    website: 'Sitio Web',
    owner: 'Propietario',
    viewProfile: 'Ver perfil'
  },
  admin: {}
};

const actions = {
  demote: `degradar`
};
