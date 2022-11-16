import { CommandInteraction } from "discord.js";
import moment from "moment";
import { Networks, Tokens } from "../enum";
import { getFundsLastRequestDate, getUserWalletAddress } from "../api";
import { handleTransaction } from "./handle-transaction";
import {
  checkTimeRestrictionForFaucet,
  createEmbedMessage,
  faucetConfigurations,
} from "../utils";

export const handleFaucetRequest = async (
  network: Networks,
  token: Tokens,
  interaction: CommandInteraction
) => {
  const address = await getUserWalletAddress(interaction.user.id);

  // Get the user requested token details on the network from the faucet configuration
  const userRequestedToken = faucetConfigurations[network].tokens[token];

  const combination = `${network}_${token}`;

  // Get the last request date from database for `combination` on `address`
  const fundLastRequestDate = await getFundsLastRequestDate(
    address,
    combination
  );

  if (userRequestedToken) {
    if (!fundLastRequestDate) {
      // Case 1: Their is no record in database with the following wallet `address`.
      // Case 2: Their is no record in database with the following `combination` of network and token.

      await handleTransaction(
        address,
        network,
        token,
        userRequestedToken,
        combination,
        interaction
      );
    } else {
      // Case: Their is a record in database for the following wallet `address`
      // with the `combination` of network and token

      // Check is time restriction/cooldown active on address for the token request with the `combination`
      const { isTimeRestrictionForFaucet, duration } =
        await checkTimeRestrictionForFaucet(
          fundLastRequestDate,
          userRequestedToken.cooldown
        );

      if (!isTimeRestrictionForFaucet) {
        // Case 1: Their is no active time restriction/cooldown on the `address` for the `combination` of network and token.

        await handleTransaction(
          address,
          network,
          token,
          userRequestedToken,
          combination,
          interaction
        );
      } else {
        interaction.editReply({
          embeds: [
            createEmbedMessage(
              network,
              token,
              userRequestedToken.amount,
              "",
              "info",
              interaction,
              true,
              duration.hours(),
              duration.minutes()
            ),
          ],
        });
        return;
      }
    }
  }
};
