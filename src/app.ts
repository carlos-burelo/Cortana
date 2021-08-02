import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { mainConnect } from './database';

/**
 * Describe your function
 * @return {boolean}
 */
export function enviromentConfig() {
  if(process.env.NODE_ENV == 'development'){
    if (process.env['TOKEN'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['NODE_ENV'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['CURRENCY'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['CHANELID'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['CRYPTO'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['OWNERID'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['OWNERUSERNAME'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['OWNERNAME'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['BOTID'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['BOTUSERNAME'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['BOTNAME'] == undefined) {
      throw new Error('Bot token is missing');
    }
    if (process.env['BOTREPO'] == undefined) {
      throw new Error('Bot token is missing');
    }
  }
  if (existsSync(resolve(__dirname, 'downloads')) == false) {
    mkdirSync(resolve(__dirname, 'downloads'), { recursive: true });
  }
  if (existsSync(resolve(__dirname, 'databases')) == false) {
    mkdirSync(resolve(__dirname, 'databases'), { recursive: true });
  }
  mainConnect();
}
