import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import * as dotenv from "dotenv";

import { IClient } from "../types";
import { getFiles } from "../utils";

dotenv.config();

module.exports = (client: IClient) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;

    // Get all the commands files from the 'commands' folder
    const commandFiles = getFiles(`./src/commands`);

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      // Adding the command in client commands collection
      commands?.set(command.data.name, command);
      commandArray?.push(command.data.toJSON());
    }

    const { BOT_TOKEN, BOT_ID, GUILD_ID } = process.env;

    if (BOT_TOKEN && BOT_ID && GUILD_ID) {
      const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {
          body: commandArray,
        });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    }
  };
};
