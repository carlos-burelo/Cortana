import { BotI, OwnerI } from './core/interfaces/index';
import { resolve } from 'path';

export const rootDir = __dirname;
export const downloadDir = resolve(__dirname, 'downloads');
export const databasesDir = resolve(__dirname, 'databases');

export const _owner: OwnerI = {
  id: parseInt(process.env.OWNERID),
  username: process.env.OWNERUSERNAME,
  first_name: process.env.OWNERNAME
};
export const _bot: BotI = {
  id: parseInt(process.env.BOTID),
  username: process.env.BOTUSERNAME,
  first_name: process.env.BOTNAME,
  repository: process.env.BOTREPO
};
export const _apis = {
  magisk: 'https://raw.githubusercontent.com/topjohnwu/magisk_files/master',
  github: 'https://api.github.com',
  samsung: 'http://fota-cloud-dn.ospserver.net/firmware',
  twrp: 'https://eu.dl.twrp.me',
  currency: ({ orig, dest }) =>
    `https://www.alphavantage.co/query` +
    `?function=CURRENCY_EXCHANGE_RATE` +
    `&from_currency=${orig}` +
    `&to_currency=${dest}` +
    `&apikey=${process.env.CURRENCY}`
};
