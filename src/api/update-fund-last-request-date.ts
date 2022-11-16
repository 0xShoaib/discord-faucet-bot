import { IWallet } from "../types";

const Wallet = require("../schemas/wallet");

export const updateFundsLastRequestDate = async (
  address: string,
  combination: string
) => {
  const userWallet: IWallet | null = await Wallet.findOne({ address });

  if (!userWallet) {
    const wallet: IWallet = await new Wallet({
      address,
      networks_and_tokens: [
        {
          combination,
          timestamp: new Date(),
        },
      ],
    });

    await wallet.save().catch((err) => {
      console.error("Failed to add user to the database.");
      console.error(err);
    });

    return;
  }

  const isCombinationExist = userWallet.networks_and_tokens.find(
    (item) => item.combination === combination
  );

  if (isCombinationExist) {
    userWallet.networks_and_tokens = userWallet.networks_and_tokens.map(
      (item) => {
        if (item.combination === combination) {
          return {
            ...item,
            timestamp: new Date(),
          };
        }

        return item;
      }
    );
  } else {
    userWallet.networks_and_tokens.push({
      combination,
      timestamp: new Date(),
    });
  }

  userWallet.save().catch((err) => {
    console.error("Failed to add the combination to the database.");
    console.error(err);
    return "error";
  });
};
