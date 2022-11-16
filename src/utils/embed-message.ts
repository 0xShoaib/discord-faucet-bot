import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Networks, Tokens } from "../enum";
import { capitalize } from "./capitalize-string";
import { faucetConfigurations } from "./faucet-configurations";

const getStatusColor = (status: string): number => {
  if (status === "success") return 0x24a148;
  if (status === "error") return 0xfa4d56;
  if (status === "info") return 0xff832b;
  return 0x18e1ee;
};

const getBlockExplorerLink = (network: Networks, txHash: string): string =>
  `${faucetConfigurations[network].blockExplorerURL}${txHash}`;

const getFormattedCooldownTime = (
  cooldownDurationHours: number,
  cooldownDurationMins: number
): string => {
  let cooldown = "";
  if (cooldownDurationHours <= 1) {
    cooldown = cooldown.concat(`${cooldownDurationHours} hour, `);
  } else {
    cooldown = cooldown.concat(`${cooldownDurationHours} hours, `);
  }

  if (cooldownDurationMins <= 1) {
    cooldown = cooldown.concat(`${cooldownDurationMins} minute `);
  } else {
    cooldown = cooldown.concat(`${cooldownDurationMins} minutes `);
  }
  return cooldown;
};

export const createEmbedMessage = (
  network: Networks,
  token: Tokens,
  amount: string,
  txHash: string,
  status: string,
  interaction: CommandInteraction,
  isCooldownEmbed = false,
  cooldownDurationHours = 0,
  cooldownDurationMins = 0
) =>
  new EmbedBuilder()
    .setTitle("Token Request On Testnet")
    .setDescription(
      `This is an auto-generated message for your request of ${token.toUpperCase()} token on the ${capitalize(
        network
      )} network.`
    )
    // Note - Color code is in hex. Add `0x` prefix instead of `#` in hex code.
    .setColor(getStatusColor(status))
    .setTimestamp(Date.now())
    .setFooter({
      text: interaction.guild?.name!,
      iconURL: interaction.guild?.iconURL()!,
    })
    .addFields([
      {
        name: `🔗 Network - ${capitalize(network)}`,
        value: "---------------------------",
      },
      {
        name: `🪙 Token - ${token.toUpperCase()}`,
        value: "---------------------------",
      },
      ...(!isCooldownEmbed
        ? [
            {
              name: `💰 Amount - ${amount}`,
              value: "---------------------------",
            },
            {
              name: `⏳ Status - ${capitalize(status)}`,
              value: "---------------------------",
            },
            {
              name: "#️⃣ Transaction Hash - ",
              value: `[${txHash}](${getBlockExplorerLink(network, txHash)})`,
            },
          ]
        : [
            {
              name: `⏳ Cooldown Duration Remaining - ${getFormattedCooldownTime(
                cooldownDurationHours,
                cooldownDurationMins
              )}`,
              value:
                "--------------------------- \n Please send the request once the cooldown time is over. Thank you!",
            },
          ]),
    ]);
