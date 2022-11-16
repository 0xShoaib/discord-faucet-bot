import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper";

import dotenv from "dotenv";

dotenv.config();

const ALFAJORES_PRIVATE_KEY = process.env.ALFAJORES_PRIVATE_KEY!;

// 📌 Reference - https://github.com/celo-tools/celo-ethers-wrapper#readme
export const getCeloWallet = async () => {
  // Connecting to Alfajores testnet
  const provider = new CeloProvider("https://alfajores-forno.celo-testnet.org");
  await provider.ready;

  return new CeloWallet(ALFAJORES_PRIVATE_KEY, provider);
};
