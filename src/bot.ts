import { Client, Collection, GatewayIntentBits } from "discord.js";
import { connect } from "mongoose";
import * as dotenv from "dotenv";

import { IClient } from "./types";
import { getFiles } from "./utils";

dotenv.config();

// Create Bot Client Interface
const client: IClient = new Client({
  intents: GatewayIntentBits.Guilds,
});

client.commands = new Collection();
client.commandArray = [];

// Get all the function files from the 'functions' folder
const functionFiles = getFiles(`./src/functions`);

for (const file of functionFiles) {
  // Execute the handler function from the file
  require(`./functions/${file}`)(client);
}

// Register events and commands
client?.handleEvents?.();
client?.handleCommands?.();

const { BOT_TOKEN, DATABASE_CONNECTION_STRING = "" } = process.env;

(async () => {
  // Log-in the bot
  client.login(BOT_TOKEN);

  try {
    // Creating connection with database
    await connect(DATABASE_CONNECTION_STRING);

    // When mentioned database is available and successfully connects
    console.log("Connected to database successfully");
  } catch (error) {
    // In case of any error
    console.error("Connection Error: Failed to connect with mongodb.");
    console.error(error);
  }
})().catch((err) => {
  console.log("bot.js > error > Something weth wrong!");
  console.log(err);
});
