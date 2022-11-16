import { IWallet } from "../types";

const Wallet = require("../schemas/wallet");

export const getFundsLastRequestDate = async (
  address: string,
  combination: string
) => {
  let userWallet: IWallet | null = await Wallet.findOne({ address });

  if (!userWallet) return 0;

  const fundLastRequestDate = userWallet.networks_and_tokens?.find(
    (item) => item.combination === combination
  );

  if (!fundLastRequestDate) return 0;

  return fundLastRequestDate.timestamp;
};
