import { botConfig, owner } from "../config";

export const mdhelp_text:string =
`/add md *bold text* _italic text_ [url text](http://www.example.com/)
[mention](tg://user?id=1748193652) {code text}
`
export const mdhelp_string:string =
`
Markdown es un lenguaje de formato de texto
compatible con telegram que fue incluido entre
las funcionalidades de este bot, vea algunos
ejemplos de la sintaxis y comienze a estilizar
sus notas :)

• _text_ : Texto en cursiva
• *text* : Texto en negritas
• {text} : Texto monoespaciado
• [text](tg://user?id=<userid>) : Mencion a un usuario por su id
• [text](url) : Creara un enlace acortado

Copie y pege el siguente ejemplo para ver una demostraicion
`
export const start_msg:string =
  `Hola, soy ${botConfig.name}, un bot administrador de grupos ` +
  `desarrollado en NodeJS y Typescript por @${owner.username}.\n` +
  `Escriba /help ver todos los comandos disponibles`;

export const help_msg:string =
  `Aqui te presento algunos de los modulos que actualmente tengo disponibles.\n` +
  `Puedes acceder a los modulos usando\n\n/help <modulename>`;
