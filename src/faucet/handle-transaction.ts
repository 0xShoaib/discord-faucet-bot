import { CommandInteraction } from "discord.js";
import { updateFundsLastRequestDate } from "../api";
import { Networks, Tokens } from "../enum";
import { Token } from "../types";
import { createEmbedMessage, getErrorMessage } from "../utils";
import { sendTokensOnNetwork } from "./send-tokens-on-network";

export const handleTransaction = async (
  address: string,
  network: Networks,
  token: Tokens,
  userRequestedToken: Token,
  combination: string,
  interaction: CommandInteraction
) => {
  // Send the requested `token` to the `address` on `network`.
  const { txHash, provider, error } = await sendTokensOnNetwork(
    address,
    network,
    userRequestedToken
  );

  if (!txHash || error) {
    interaction.editReply({
      content: getErrorMessage(token, network),
    });
    return;
  }

  // 📌 Reference - https://docs.ethers.io/v5/api/providers/provider/#Provider-getTransaction
  const tx = await provider?.getTransaction(txHash);

  interaction.editReply({
    embeds: [
      createEmbedMessage(
        network,
        token,
        userRequestedToken.amount,
        txHash,
        "pending",
        interaction
      ),
    ],
  });

  await tx?.wait().then(async (response) => {
    let status = "error";

    if (response.status === 1) {
      status = "success";
      // Update the database record for the `combination` for `address`
      await updateFundsLastRequestDate(address, combination);
    }

    interaction.editReply({
      embeds: [
        createEmbedMessage(
          network,
          token,
          userRequestedToken.amount,
          txHash,
          status,
          interaction
        ),
      ],
    });
  });
};
