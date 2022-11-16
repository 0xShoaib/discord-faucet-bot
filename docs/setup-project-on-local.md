[← Go Back](../README.md)

## Setup Project On Local

1.  Run `npm install` to download all the dependencies.

2.  Create .env file with the following parameters and update all the values.

    ```typescript
    #  Faucet Configuration
    GOERLI_PRIVATE_KEY = "<GOERLI_PRIVATE_KEY>";
    MUMBAI_PRIVATE_KEY = "<MUMBAI_PRIVATE_KEY>";
    ALFAJORES_PRIVATE_KEY = "<ALFAJORES_PRIVATE_KEY>";
    ALCHEMY_API_KEY = "<ALCHEMY_API_KEY>";

    # Discord Bot
    // Check the docs on 'How to Create a Discord Bot on Discord Developer Portal'
    BOT_TOKEN = "<BOT_TOKEN>";

    // Note - To get the below ids, make sure you have enabled the developer mode for your profile

    // Right click on your bot and copy its id for the menu.
    BOT_ID = "<BOT_ID>";

    // Right click on your server and copy its id for the menu.
    GUILD_ID = "<GUILD_ID>";

    # MongoDB Database
    DATABASE_CONNECTION_STRING = "<DATABASE_CONNECTION_STRING>";
    ```

3.  Update the `getUserWalletAddress` function in file the `src/api/get-user-wallet-address.ts` to connect to the LearnWeb3 backend and fetch the real associated Ethereum address based on the `userId`.

    ```typescript
    export const getUserWalletAddress = async (
      userId: string // discord user id
    ): Promise<string> => {
      return Promise.resolve(""); // return the user wallet address
    };
    ```

4.  Run `npm run start:dev` to start the bot in watch mode

5.  Run `npx run start` to start the bot in production mode

---

📄 The End
