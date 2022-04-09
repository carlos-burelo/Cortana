declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string
      BOT_REPO: string
      BOT_IMAGE: string
      BOT_NAME: string
      BOT_USERNAME: string
      NODE_ENV: 'development' | 'production'
      OWNER_ID: string
      BOT_ID: string
      LOG_CHANEL: string
    }
  }
}
export {}
