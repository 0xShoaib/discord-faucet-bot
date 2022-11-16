import { SlashCommandBuilder } from "discord.js";
import { IClient } from "../types";
import { Networks, Tokens } from "../enum";
import { checkIsCombinationValid, capitalize } from "../utils";
import { handleFaucetRequest } from "../faucet/handle-faucet-request";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faucet")
    .setDescription("Receive testnet funds on your linked wallet address.")
    .addStringOption((option) =>
      option
        .setName("network")
        .setDescription("Select a network name on which you want the funds.")
        .setRequired(true)
        .addChoices(
          {
            name: capitalize(Networks.Ethereum_Goerli),
            value: Networks.Ethereum_Goerli,
          },
          {
            name: capitalize(Networks.Polygon_Mumbai),
            value: Networks.Polygon_Mumbai,
          },
          {
            name: capitalize(Networks.Celo_Alfajores),
            value: Networks.Celo_Alfajores,
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("token")
        .setDescription(
          "Select a token that you want to receive for the selected network."
        )
        .setRequired(true)
        .addChoices(
          {
            name: Tokens.ETH.toUpperCase(),
            value: Tokens.ETH,
          },
          {
            name: Tokens.LINK.toUpperCase(),
            value: Tokens.LINK,
          },
          {
            name: Tokens.MATIC.toUpperCase(),
            value: Tokens.MATIC,
          },
          {
            name: Tokens.CELO.toUpperCase(),
            value: Tokens.CELO,
          }
        )
    ),
  async execute(interaction: any, client: IClient) {
    await interaction.deferReply({
      fetchReply: true,
    });

    const network = interaction.options.getString("network") as Networks;
    const token = interaction.options.getString("token") as Tokens;

    const isValid = checkIsCombinationValid(network, token);

    if (!isValid) {
      interaction.editReply({
        content: `Ops! We do not supply ${token.toUpperCase()} token on ${capitalize(
          network
        )} network at the moment.`,
      });
      return;
    }

    await handleFaucetRequest(network, token, interaction);
  },
};
