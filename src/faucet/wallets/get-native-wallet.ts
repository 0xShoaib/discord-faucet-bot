import { ethers, Wallet } from "ethers";

import dotenv from "dotenv";
import { Networks } from "../../enum";

dotenv.config();

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY!;
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY!;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

export const getNativeWallet = (chainId: number, network: Networks) => {
  // 📌 Reference - https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider
  const provider = new ethers.providers.AlchemyProvider(
    chainId,
    ALCHEMY_API_KEY
  );

  const PRIVATE_KEY =
    network === Networks.Polygon_Mumbai
      ? MUMBAI_PRIVATE_KEY
      : GOERLI_PRIVATE_KEY;

  // 📌 Reference - https://docs.ethers.io/v5/api/signer/#Wallet
  return new Wallet(PRIVATE_KEY, provider);
};
