import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { currencyI } from './core/types';
import { mainConnect } from './database';

/**
 * Retorna una alerta si no existe alguna
 * variable de entorno y detiene el despliegue
 * del bot.
 */
export const noEnv = (env: string): never => {
  const template =
    `==========================================
    \n\t\t${env} is Missing\n` + `==========================================`;
  console.clear();
  console.log(template);
  throw new Error(`${env} variable is missing`);
};
/**
 * Directorio raiz del proyecto
 */
export const rootDir: string = __dirname;
/**
 * Directorio de descargas
 */
export const downloadDir: string = resolve(__dirname, 'downloads');
/**
 * Directorio de base de datos json
 */
export const databasesDir: string = resolve(__dirname, 'databases');
/**
 * Directorio de los archivos de
 * traduccion.
 */
export const localesDir: string = resolve(__dirname, 'core', 'locales');
/**
 * Verifica la existencia de de los
 * directorios principales y en caso
 * de no existir los crea.
 */
export function makeDirs(): void {
  if (existsSync(resolve(downloadDir)) == false) {
    mkdirSync(resolve(downloadDir), { recursive: true });
  }
  if (existsSync(resolve(databasesDir)) == false) {
    mkdirSync(resolve(databasesDir), { recursive: true });
  }
}

/** Token unico generado por @Botfather*/
let BOT_TOKEN: string = process.env.BOT_TOKEN;
/** Id de la cuenta del bot*/
let BOT_ID: number;
/** Alias del bot*/
let BOT_NAME: string;
/** Nombre de usuario del bot*/
let BOT_USERNAME: string;
/** Repositorio del bot*/
let BOT_REPO: string;
/** Id del propietario del bot*/
let OWNER_ID: number;
/** Alias del propietario bot*/
let OWNER_NAME: string;
/** Nombre de usuario del propietario bot*/
let OWNER_USERNAME: string;
/** Token o key generada por [alphavantage.co](https://www.alphavantage.co/documentation/)*/
let CURRENCY_KEY: string;
/** Canal publico o privado para recibir los registros del bot*/
let LOG_CHANEL: string;

/**
 * Funcion que busca las variables
 * de entorno en el archivo .env o
 * en el sistema.
 */
export function enviroment(): void {
  const env = process.env;
  !env.BOT_TOKEN ? noEnv('BOT_TOKEN') : (BOT_TOKEN = env.BOT_TOKEN);
  !env.BOT_ID ? noEnv('BOT_ID') : (BOT_ID = parseInt(env.BOT_ID));
  !env.BOT_NAME ? noEnv('BOT_NAME') : (BOT_NAME = env.BOT_NAME);
  !env.BOT_USERNAME ? noEnv('BOT_USERNAME') : (BOT_USERNAME = env.BOT_USERNAME);
  !env.BOT_REPO ? noEnv('BOT_REPO') : (BOT_REPO = env.BOT_REPO);
  !env.OWNER_ID ? noEnv('OWNER_ID') : (OWNER_ID = parseInt(env.OWNER_ID));
  !env.OWNER_NAME ? noEnv('OWNER_NAME') : (OWNER_NAME = env.OWNER_NAME);
  !env.OWNER_USERNAME ? noEnv('OWNER_USERNAME') : (OWNER_USERNAME = env.OWNER_USERNAME);
  !env.CURRENCY_KEY ? noEnv('CURRENCY_KEY') : (CURRENCY_KEY = env.CURRENCY_KEY);
  !env.LOG_CHANEL ? noEnv('LOG_CHANEL') : (LOG_CHANEL = env.LOG_CHANEL);
  makeDirs();
  mainConnect();
}
/** Url del repositorio de magisk*/
export const MAGISK_API: string = 'https://raw.githubusercontent.com/topjohnwu/magisk_files/master';
/** API publica de github*/
export const GITHUB_API: string = 'https://api.github.com';
/** API publica no oficial de samsumg*/
export const SAMSUNG_API: string = 'http://fota-cloud-dn.ospserver.net/firmware';
/** API publica oficial de TWRP Recovery*/
export const TWRP_API: string = 'https://eu.dl.twrp.me';
/** API oficial de alphavantage.co*/
export const CURRENCY_API = ({ orig, dest }: currencyI): string =>
  `https://www.alphavantage.co/query` +
  `?function=CURRENCY_EXCHANGE_RATE` +
  `&from_currency=${orig}` +
  `&to_currency=${dest}` +
  `&apikey=${CURRENCY_KEY}`;

export const argRegex = /--\w+:?\w+/gi;

// --(\w+):?(\w+)|#(\w+)

export {
  BOT_TOKEN,
  BOT_NAME,
  BOT_USERNAME,
  BOT_REPO,
  BOT_ID,
  OWNER_ID,
  OWNER_NAME,
  OWNER_USERNAME,
  CURRENCY_KEY,
  LOG_CHANEL
};
