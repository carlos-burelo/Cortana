![logo](./banner.jpg)

# Hi, I'm Cortana a bot

Modular telegram bot written in typescript and running on NodeJs created with the purpose of managing groups and providing useful functions for users such as image manipulation and integration with API's of interest to developers or common users.

![Language](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/github/license/carlos-burelo/CortanaTs?style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/carlos-burelo/cortanats?style=for-the-badge)
![last commit](https://img.shields.io/github/last-commit/carlos-burelo/cortanats?style=for-the-badge)
![Code size](https://img.shields.io/github/languages/code-size/carlos-burelo/cortanats?style=for-the-badge)

## Deploy to Heroku

> At the moment the bot is still in integrity tests, which makes the compatibility with the deployment in Heroku lag, also take into account that I am only a person in charge of all the development, I appreciate your understanding.

<p align="left"><a href="https://heroku.com/deploy?template=https://github.com/carlos-burelo/CortanaTs/tree/master"> <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" /></a></p>

## `Clone repo`

```bash
 git clone https://github.com/carlos-burelo/CortanaTS
```

## `Install dependencies`

```bash
# using yarn
cd CortanaTS && yarn

# using npm
cd CortanaTS && npm install
```

## `Generating modules and commands using CLI`

`Basic method`

```bash
node cli --module modulename --command commnandname
```

`Short method`

```bash
node cli -m modulename -c commandname
```

`Example`

```bash
node cli -m admin -c promote
# CortanaTS\src\core\modules\admin\index.ts --> Main module
# CortanaTS\src\core\modules\admin\promote.ts --> Command
```
