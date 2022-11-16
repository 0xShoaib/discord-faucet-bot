import { CommandInteraction } from "discord.js";
import { IClient } from "../types";

module.exports = {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction, client: IClient) {
    if (interaction.isCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands?.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this command.`,
          ephemeral: true,
        });
      }
    }
  },
};
