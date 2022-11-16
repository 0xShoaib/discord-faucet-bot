import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { IClient } from "../types";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns my ping"),
  async execute(interaction: CommandInteraction, client: IClient) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;
    await interaction.editReply({
      content: newMessage,
    });
    console.log(`Ready!!! ${client?.user?.tag} is logged in and online.`);
  },
};
