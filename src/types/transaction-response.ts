import { ethers } from "ethers";

export type TransactionResponse = {
  txHash?: string;
  provider?: ethers.providers.Provider;
  error?: boolean;
};
