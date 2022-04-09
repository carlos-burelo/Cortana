import { BOT_IMAGE, BOT_NAME, BOT_REPO, BOT_USERNAME } from '#enviroment'
import { Locale } from 'src/types/locale'

export default {
  _start: {
    message: username =>
      `Hola *${username}*.\nMi nombres es [**${BOT_NAME}**](${BOT_IMAGE}), soy un bot administrador de grupos y gestor ` +
      `de informacion desarrollado en typescript por @CarlosBurelo.\n`,
    buttons: [
      {
        text: '📌 Comandos',
        callback_data: 'back_help',
      },
      {
        text: '🇲🇽 Idiomas',
        callback_data: 'setLanguage',
      },
      {
        text: '➕ Añadir a un grupo',
        url: `http://t.me/${BOT_USERNAME}?startgroup=true`,
      },
      {
        text: '📄 Documentacion',
        url: BOT_REPO,
      },
    ],
  },
} as Locale
