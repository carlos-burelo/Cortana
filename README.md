![logo](./docs/banner.jpg)

# Hi, I'm Cortana a bot

Modular telegram bot written in typescript and running on NodeJs created with the purpose of managing groups and providing useful functions for users such as image manipulation and integration with apis of interest to developers or common users.

![Language](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/github/license/carlos-burelo/CortanaTs?style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/carlos-burelo/cortanats?style=for-the-badge)
![last commit](https://img.shields.io/github/last-commit/carlos-burelo/cortanats?style=for-the-badge)
![Code size](https://img.shields.io/github/languages/code-size/carlos-burelo/cortanats?style=for-the-badge)

## Deploy to Heroku

> At the moment the bot is still in integrity tests, which makes the compatibility with the deployment in Heroku lag, also take into account that I am only a person in charge of all the development, I appreciate your understanding.

<p align="left"><a href="https://heroku.com/deploy?template=https://github.com/carlos-burelo/CortanaTs/tree/master"> <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" /></a></p>

## Documentadion (soon)

```ts
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { BOT_TOKEN, enviroment } from './config';
import { modules } from './bot';

async function init() {
  enviroment();
  const bot = new Telegraf(BOT_TOKEN);
  modules(bot);
  if (process.env.NODE_ENV === 'production') {
    console.clear();
    await bot.launch({
      webhook: {
        domain: process.env.URL,
        port: parseInt(process.env.PORT || '3000')
      }
    });
  } else {
    console.clear();
    await bot.launch();
  }
  console.clear();
  console.log(
    '[Bot is running]----------------------------------------------------------------------------------'
  );
}
init();
```
