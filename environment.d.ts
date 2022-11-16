declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOERLI_PRIVATE_KEY: string;
      MUMBAI_PRIVATE_KEY: string;
      ALFAJORES_PRIVATE_KEY: string;
      ALCHEMY_API_KEY: string;
      BOT_TOKEN: string;
      BOT_ID: string;
      GUILD_ID: string;
      DATABASE_CONNECTION_STRING: string;
    }
  }
}

export {};
